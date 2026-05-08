<?php
/**
 * API Upload - ESEND
 * Specialist: developpeur-back-end-ops
 */

require_once 'config.php';
require_once 'auth_check.php';

// Protection : Seul l'admin peut uploader des fichiers
checkAuth();

// Dossier de destination relatif
$target_dir = "../uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $file_name = time() . '_' . basename($file["name"]);
    $target_file = $target_dir . $file_name;
    $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

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

    // Allow certain formats
    if($file_type != "jpg" && $file_type != "png" && $file_type != "jpeg" && $file_type != "webp" ) {
        echo json_encode(['success' => false, 'error' => "Seuls les formats JPG, JPEG, PNG & WEBP sont autorisés."]);
        exit;
    }

    if (move_uploaded_file($file["tmp_name"], $target_file)) {
        // Retourne le chemin relatif pour enregistrement dans la DB
        echo json_encode(['success' => true, 'url' => "/uploads/" . $file_name]);
    } else {
        echo json_encode(['success' => false, 'error' => "Erreur lors du transfert du fichier."]);
    }
} else {
    echo json_encode(['success' => false, 'error' => "Aucun fichier reçu."]);
}
