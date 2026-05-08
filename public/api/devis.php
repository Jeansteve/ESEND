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

// Récupération des données métiers du formulaire
$service = isset($_POST['Service']) ? $_POST['Service'] : 'Nuisibles';
$problem = isset($_POST['Précision_Problème']) ? $_POST['Précision_Problème'] : '';
$nom = isset($_POST['Nom']) ? $_POST['Nom'] : '';
$tel = isset($_POST['Téléphone']) ? $_POST['Téléphone'] : '';
$email = isset($_POST['Email']) ? $_POST['Email'] : '';
$nuisible = isset($_POST['Nuisible']) ? $_POST['Nuisible'] : '';
$type_client = isset($_POST['Type_Client']) ? $_POST['Type_Client'] : '';
$cp = isset($_POST['Code_Postal']) ? $_POST['Code_Postal'] : '';
$ville = isset($_POST['Ville']) ? trim($_POST['Ville']) : '';
$is_urgent = isset($_POST['is_urgent']) ? (int)$_POST['is_urgent'] : 0;

// Construction d'un objet (titre) d'email ultra-parlant
if ($service === 'Nuisibles' || $service === 'Intervention') {
    $titre_service = (!empty($nuisible) && $nuisible !== 'Non spécifié') ? $nuisible : "Intervention Nuisibles";
    $icone = "🐛";
    $label_detail = "Nuisible suspecté ou identifié :";
    $valeur_detail = htmlspecialchars($nuisible);
    $bordure_couleur = "#dd6b20";
    $titre_couleur = "#9c4221";
    $fond_couleur = "#fffaf0";
} elseif ($service === 'Désinfection') {
    $titre_service = "Désinfection";
    $icone = "🛡️";
    $label_detail = "Service demandé :";
    $valeur_detail = "Désinfection complète";
    $bordure_couleur = "#38a169";
    $titre_couleur = "#22543d";
    $fond_couleur = "#f0fff4";
} else {
    $titre_service = "Nettoyage";
    $icone = "✨";
    $label_detail = "Service demandé :";
    $valeur_detail = "Nettoyage professionnel";
    $bordure_couleur = "#805ad5";
    $titre_couleur = "#44337a";
    $fond_couleur = "#faf5ff";
}

// 1. Génération de l'ID de suivi (Tracking ID) type ES-2404-001
$yearMonth = date('ym');
$stmtCount = $pdo->prepare("SELECT COUNT(*) as total FROM esend_leads WHERE tracking_id LIKE ?");
$stmtCount->execute(["ES-" . $yearMonth . "-%"]);
$rowCount = $stmtCount->fetch();
$nextNum = str_pad(($rowCount['total'] ?? 0) + 1, 3, '0', STR_PAD_LEFT);
$trackingId = "ES-" . $yearMonth . "-" . $nextNum;

// --- NOUVEAU : Logique de classement intelligent par dossier ---

// Fonction pour nettoyer les noms de dossiers (pas d'accents, espaces -> tirets)
function sanitizeFolderName($str) {
    if (!$str) return "divers";
    $str = mb_strtolower($str, 'UTF-8');
    $str = str_replace([' ', "'", 'à', 'á', 'â', 'ã', 'ä', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ç'], ['-', '-', 'a', 'a', 'a', 'a', 'a', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'c'], $str);
    return preg_replace('/[^a-z0-9\-]/', '', $str);
}

$serviceSlug = sanitizeFolderName($service);
$subCategorySlug = ($service === 'Nuisibles' && $nuisible) ? sanitizeFolderName($nuisible) : $serviceSlug;

// Chemin relatif : ex: nuisibles/cafards/
$relPath = $serviceSlug . '/' . $subCategorySlug . '/';
$uploadDir = __DIR__ . '/../uploads/leads/' . $relPath;

// Création récursive du dossier si n'existe pas
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
    // On s'assure qu'un .htaccess est présent à la racine de /uploads/leads/ (déjà fait normalement)
}

$uploadedFiles = [];

if (!empty($_FILES)) {
    $i = 1;
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    $maxFileSize = 2 * 1024 * 1024; // 2MB par fichier

    foreach ($_FILES as $file) {
        if ($file['error'] == UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            
            // Vérification de l'extension
            if (!in_array($extension, $allowedExtensions)) {
                continue; // Ignore les fichiers non autorisés
            }

            // Vérification de la taille
            if ($file['size'] > $maxFileSize) {
                continue; // Ignore les fichiers trop lourds
            }

            $fileName = $trackingId . "_img_" . $i . "." . $extension;
            $destination = $uploadDir . $fileName;
            
            // --- NOUVEAU : Nettoyage profond (Re-génération de l'image) ---
            $img = null;
            if (function_exists('imagecreatefromjpeg')) {
                switch($extension) {
                    case 'jpg':
                    case 'jpeg': $img = @imagecreatefromjpeg($file['tmp_name']); break;
                    case 'png':  $img = @imagecreatefrompng($file['tmp_name']); break;
                    case 'webp': $img = @imagecreatefromwebp($file['tmp_name']); break;
                }
            }

            if ($img) {
                // On sauvegarde la nouvelle image (nettoyée) à destination
                $saved = false;
                switch($extension) {
                    case 'jpg':
                    case 'jpeg': $saved = imagejpeg($img, $destination, 85); break;
                    case 'png':  
                        imagealphablending($img, true);
                        imagesavealpha($img, true);
                        $saved = imagepng($img, $destination, 8); 
                        break;
                    case 'webp': $saved = imagewebp($img, $destination, 80); break;
                }
                imagedestroy($img);
                if ($saved) {
                    $uploadedFiles[] = $relPath . $fileName;
                    $i++;
                }
            } else {
                // FALLBACK : Si GD est absent, on utilise move_uploaded_file 
                // mais on garde le renommage et l'extension sécurisée.
                if (move_uploaded_file($file['tmp_name'], $destination)) {
                    $uploadedFiles[] = $relPath . $fileName;
                    $i++;
                } else {
                    error_log("Échec du déplacement de fichier fallback : " . $file['name']);
                }
            }
        }
    }
}
$imagesJson = !empty($uploadedFiles) ? json_encode($uploadedFiles) : null;

// 2. Archive de la demande en Base de Données (Mini-CRM)
try {
    $stmtLead = $pdo->prepare("INSERT INTO esend_leads (tracking_id, service, nuisible, problem_details, is_urgent, client_name, client_phone, client_email, client_type, zip_code, city, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmtLead->execute([
        $trackingId, 
        $service, 
        $nuisible, 
        $problem, 
        $is_urgent,
        $nom, 
        $tel, 
        $email, 
        $type_client, 
        $cp, 
        $ville,
        $imagesJson
    ]);
} catch (PDOException $e) {
    // On log l'erreur mais on continue pour ne pas bloquer l'envoi du mail
    error_log("Erreur insertion lead : " . $e->getMessage());
}

$ville_titre = !empty($ville) ? " (" . mb_strimwidth($ville, 0, 20, "...") . ")" : "";
$prefix_urgent = ($is_urgent === 1) ? "🔥 [URGENT] " : "";
$subject = $prefix_urgent . $icone . " [" . $trackingId . "] " . $titre_service . " - Devis de " . $nom . $ville_titre;

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
      <h2 style=\"color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-top: 0;\">Demande Dossier n° " . $trackingId . " ⚡️</h2>
      
      " . ($is_urgent === 1 ? "
      <div style=\"background-color: #fff5f5; border: 2px solid #e53e3e; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;\">
          <h1 style=\"color: #e53e3e; margin: 0; font-size: 24px; text-transform: uppercase;\">⚡️ INTERVENTION URGENTE ⚡️</h1>
          <p style=\"color: #c53030; margin: 5px 0 0 0; font-weight: bold;\">Le client a demandé une prise en charge prioritaire (sous 24h).</p>
      </div>
      " : "") . "

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

      <div style=\"background-color: " . $fond_couleur . "; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 4px solid " . $bordure_couleur . ";\">
          <h3 style=\"margin-top: 0; color: " . $titre_couleur . "; font-size: 18px;\">" . $icone . " Qualification du besoin</h3>
          <p style=\"margin-bottom: 12px; color: #4a5568;\"><strong>Catégorie principale :</strong> " . htmlspecialchars($service) . "</p>
          <p style=\"margin-bottom: 12px; color: #4a5568;\"><strong>" . $label_detail . "</strong> " . $valeur_detail . "</p>
          <p style=\"margin-bottom: 5px; color: #4a5568;\"><strong>Détails laissés par le client :</strong></p>
          <div style=\"background-color: #ffffff; padding: 15px; border-radius: 4px; border: 1px dashed #cbd5e0; color: #2d3748; font-style: italic;\">
            " . (empty($problem) || $problem === 'Aucune précision' ? "Aucune description supplémentaire fournie." : nl2br(htmlspecialchars($problem))) . "
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
    if (!empty($uploadedFiles)) {
        $fullUploadPath = __DIR__ . '/../uploads/leads/';
        foreach ($uploadedFiles as $relFilePath) {
            $filePath = $fullUploadPath . $relFilePath;
            if (file_exists($filePath)) {
                $mail->addAttachment($filePath, basename($relFilePath));
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
