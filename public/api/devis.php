<?php
/**
 * API Devis - ESEND
 * Gestion de l'envoi des formulaires de demande de devis avec pièces jointes.
 */

// Permettre les requêtes cross-origin si on est en dév
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once 'config.php';

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
    <tr><td style='background-color: #f8f9fa; font-weight: bold;'>Email</td><td><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></td></tr>
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

$boundary = md5(time());
$fromEmail = "noreply@esendnuisibles.fr";

$headers = "From: ESEND Website <" . $fromEmail . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

$message = "--" . $boundary . "\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$message .= $htmlMessage . "\r\n";

// Traitement dynamique de toutes les pièces jointes
foreach ($_FILES as $key => $file) {
    if ($file['error'] == UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
        $file_content = file_get_contents($file['tmp_name']);
        $encoded_content = chunk_split(base64_encode($file_content));

        $message .= "--" . $boundary . "\r\n";
        $message .= "Content-Type: " . (!empty($file['type']) ? $file['type'] : 'application/octet-stream') . "; name=\"" . basename($file['name']) . "\"\r\n";
        $message .= "Content-Disposition: attachment; filename=\"" . basename($file['name']) . "\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $message .= $encoded_content . "\r\n";
    }
}

$message .= "--" . $boundary . "--";

// Envoi final via sendmail PHP
if(mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi du courriel par le serveur Hostinger.']);
}
