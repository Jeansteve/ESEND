<?php
/**
 * API Devis - ESEND avec PHPMailer (SMTP Hostinger Authentifié)
 * Gestion de l'envoi des formulaires de demande de devis avec pièces jointes.
 */

// Permettre les requêtes cross-origin si on est en dév
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once 'config.php';

// Import de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Récupération de l'email cible depuis la BDD (Settings)
$stmt = $pdo->query("SELECT setting_value FROM esend_settings WHERE setting_key = 'contact_email'");
$row = $stmt->fetch();
$to = $row ? $row['setting_value'] : 'contact@esendnuisibles.fr';

$subject = isset($_POST['_subject']) ? $_POST['_subject'] : 'Nouveau Devis ESEND';

// Récupération des données métiers du formulaire
$problem = isset($_POST['Précision_Problème']) ? $_POST['Précision_Problème'] : '';
$nom = isset($_POST['Nom']) ? $_POST['Nom'] : '';
$tel = isset($_POST['Téléphone']) ? $_POST['Téléphone'] : '';
$email = isset($_POST['Email']) ? $_POST['Email'] : '';
$nuisible = isset($_POST['Nuisible']) ? $_POST['Nuisible'] : '';
$type_client = isset($_POST['Type_Client']) ? $_POST['Type_Client'] : '';
$cp = isset($_POST['Code_Postal']) ? $_POST['Code_Postal'] : '';
$ville = isset($_POST['Ville']) ? $_POST['Ville'] : '';

if(empty($nom) || empty($tel)) {
    echo json_encode(['success' => false, 'message' => 'Des champs obligatoires sont manquants']);
    exit;
}

// Construction du corps du message HTML
$htmlMessage = "
<html>
<head>
  <title>Nouvelle demande ESEND</title>
</head>
<body style='margin: 0; padding: 20px; background-color: #f4f7f6;'>
  <div style=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);\">
      <h2 style=\"color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-top: 0;\">Nouvelle demande d'intervention ⚡️</h2>
      
      <p style=\"font-size: 16px; color: #4a5568; line-height: 1.5;\">Bonjour l'équipe ESEND,</p>
      <p style=\"font-size: 15px; color: #4a5568; line-height: 1.5;\">Une nouvelle demande de devis vient d'être soumise de manière autonome sur votre site web. Voici les informations complètes :</p>

      <div style=\"background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #3182ce;\">
          <h3 style=\"margin-top: 0; color: #2d3748; font-size: 18px;\">👤 Informations du contact</h3>
          <p style=\"margin-bottom: 8px; color: #4a5568;\"><strong>Nom :</strong> " . htmlspecialchars($nom) . "</p>
          <p style=\"margin-bottom: 8px; color: #4a5568;\"><strong>Téléphone :</strong> <a href='tel:" . htmlspecialchars($tel) . "' style='color: #3182ce; text-decoration: none; font-weight: bold;'>" . htmlspecialchars($tel) . "</a></p>
          <p style=\"margin-bottom: 8px; color: #4a5568;\"><strong>Email :</strong> <a href='mailto:" . htmlspecialchars($email) . "' style='color: #3182ce; text-decoration: none;'>" . htmlspecialchars($email) . "</a></p>
          <p style=\"margin-bottom: 8px; color: #4a5568;\"><strong>Type de client :</strong> " . htmlspecialchars($type_client) . "</p>
          <p style=\"margin-bottom: 0; color: #4a5568;\"><strong>Localisation :</strong> " . htmlspecialchars($cp . " " . $ville) . "</p>
      </div>

      <div style=\"background-color: #fffaf0; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #dd6b20;\">
          <h3 style=\"margin-top: 0; color: #9c4221; font-size: 18px;\">🐛 Le Problème</h3>
          <p style=\"margin-bottom: 12px; color: #4a5568;\"><strong>Nuisible suspecté ou identifié :</strong> " . htmlspecialchars($nuisible) . "</p>
          <p style=\"margin-bottom: 5px; color: #4a5568;\"><strong>Détails laissés par le client :</strong></p>
          <div style=\"background-color: #ffffff; padding: 15px; border-radius: 4px; border: 1px dashed #cbd5e0; color: #2d3748; font-style: italic;\">
            " . (empty($problem) ? "Aucune description supplémentaire fournie." : nl2br(htmlspecialchars($problem))) . "
          </div>
      </div>

      <p style=\"font-size: 13px; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; margin-bottom: 0;\">
          Cet email a été généré automatiquement par l'assistant virtuel ESEND.<br>
          <strong>Note :</strong> Si le client a ajouté des photos, vous les trouverez en pièces jointes.
      </p>
  </div>
</body>
</html>
";

$mail = new PHPMailer(true);

try {
    // Configuration (utilisation de la fonction mail native de PHP, très fiable si l'expéditeur existe)
    $mail->CharSet = 'UTF-8';

    // Paramètres de l'expéditeur (doit être l'adresse existante)
    $mail->setFrom('contact@esendnuisibles.fr', 'ESEND Website');
    if (!empty($email)) {
        $mail->addReplyTo($email, $nom);
    }
    
    // Le destinataire récupéré des paramètres
    $mail->addAddress($to);

    // Ajout des pièces jointes dynamiques (photos)
    if (!empty($_FILES)) {
        foreach ($_FILES as $key => $file) {
            if ($file['error'] == UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
                // PHPMailer gère la pièce jointe de façon sécurisée
                $mail->addAttachment($file['tmp_name'], basename($file['name']));
            }
        }
    }

    // Contenu de l'e-mail
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $htmlMessage;
    
    // Version brute (Fallback) - facultatif mais recommandé
    $mail->AltBody = "Nouveau Devis\nNom: $nom\nTéléphone: $tel\nEmail: $email\nProblème: $nuisible\nLieu: $cp $ville\nDétails: $problem";

    // Envoi
    $mail->send();
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    // En cas d'erreur de PHPMailer
    echo json_encode([
        'success' => false, 
        'message' => 'L\'envoi du message a échoué. Erreur SMTP.',
        'error_details' => $mail->ErrorInfo 
    ]);
}
