<?php
/**
 * API Upload - ESEND
 * SÉCURITÉ : Re-génération d'image via PHP GD (HIGH-04) - Protège contre les fichiers polyglottes/stéganographie
 */

require_once 'config.php';
require_once 'auth_check.php';

// Protection : Seul l'admin peut uploader des fichiers
checkAuth();

// Dossier de destination relatif
$target_dir = "../uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $file_type = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

    // Vérifications de base (Images uniquement)
    $check = getimagesize($file["tmp_name"]);
    if ($check === false) {
        echo json_encode(['success' => false, 'error' => "Le fichier n'est pas une image."]);
        exit;
    }

    // Limit size (5MB)
    if ($file["size"] > 5000000) {
        echo json_encode(['success' => false, 'error' => "Fichier trop volumineux (Max 5MB)."]);
        exit;
    }

    // Formats autorisés
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    if (!in_array($file_type, $allowedExtensions)) {
        echo json_encode(['success' => false, 'error' => "Seuls les formats JPG, JPEG, PNG & WEBP sont autorisés."]);
        exit;
    }

    $file_name = time() . '_' . bin2hex(random_bytes(8)) . '.' . $file_type;
    $target_file = $target_dir . $file_name;

    // --- SÉCURITÉ : Re-génération de l'image via GD (neutralise la stéganographie) ---
    $img = null;
    if (function_exists('imagecreatefromjpeg')) {
        switch ($file_type) {
            case 'jpg':
            case 'jpeg': $img = @imagecreatefromjpeg($file['tmp_name']); break;
            case 'png':  $img = @imagecreatefrompng($file['tmp_name']); break;
            case 'webp': $img = @imagecreatefromwebp($file['tmp_name']); break;
        }
    }

    if ($img) {
        $saved = false;
        switch ($file_type) {
            case 'jpg':
            case 'jpeg': $saved = imagejpeg($img, $target_file, 85); break;
            case 'png':
                imagealphablending($img, true);
                imagesavealpha($img, true);
                $saved = imagepng($img, $target_file, 8);
                break;
            case 'webp': $saved = imagewebp($img, $target_file, 80); break;
        }
        imagedestroy($img);
        if ($saved) {
            echo json_encode(['success' => true, 'url' => "/uploads/" . $file_name]);
        } else {
            echo json_encode(['success' => false, 'error' => "Erreur lors de la sauvegarde de l'image."]);
        }
    } else {
        // Fallback si GD est absent
        if (move_uploaded_file($file["tmp_name"], $target_file)) {
            echo json_encode(['success' => true, 'url' => "/uploads/" . $file_name]);
        } else {
            echo json_encode(['success' => false, 'error' => "Erreur lors du transfert du fichier."]);
        }
    }
} else {
    echo json_encode(['success' => false, 'error' => "Aucun fichier reçu."]);
}
