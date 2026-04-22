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
  <title>Demande d'intervention ESEND</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333;'>
  <h2>Demande de Devis - ESEND</h2>
  <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 100%; max-width: 600px;'>
    <tr><td style='background-color: #f8f9fa; font-weight: bold; width: 35%;'>Nom / Contact</td><td>" . htmlspecialchars($nom) . "</td></tr>
    <tr><td style='background-color: #f8f9fa; font-weight: bold;'>Téléphone</td><td><a href='tel:" . htmlspecialchars($tel) . "'>" . htmlspecialchars($tel) . "</a></td></tr>
    <tr><td style='background-color: #f8f9fa; font-weight: bold;'>Email Client</td><td><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></td></tr>
    <tr><td style='background-color: #f8f9fa; font-weight: bold;'>Type de Client</td><td>" . htmlspecialchars($type_client) . "</td></tr>
    <tr><td style='background-color: #f8f9fa; font-weight: bold;'>Problème visé</td><td>" . htmlspecialchars($nuisible) . "</td></tr>
    <tr><td style='background-color: #f8f9fa; font-weight: bold;'>Localisation</td><td>" . htmlspecialchars($cp . " " . $ville) . "</td></tr>
    <tr><td style='background-color: #f8f9fa; font-weight: bold;'>Détails</td><td>" . nl2br(htmlspecialchars($problem)) . "</td></tr>
  </table>
  <br/>
  <p>Cet email a été envoyé automatiquement depuis le formulaire en ligne ESEND. Les photos (si fournies) se trouvent en pièces jointes à ce message.</p>
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
