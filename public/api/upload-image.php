<?php
/**
 * upload-image.php — Endpoint upload image ESEND Admin
 * Accepte un fichier image, le redimensionne et le stocke dans /uploads/
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']); exit;
}

$uploadDir = __DIR__ . '/../uploads/';
$uploadUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'error' => 'Aucun fichier reçu ou erreur upload: ' . ($_FILES['image']['error'] ?? 'N/A')]); exit;
}

$file = $_FILES['image'];
$maxSize = 5 * 1024 * 1024; // 5MB

if ($file['size'] > $maxSize) {
    echo json_encode(['success' => false, 'error' => 'Fichier trop volumineux (max 5MB)']); exit;
}

$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    echo json_encode(['success' => false, 'error' => 'Type de fichier non autorisé: ' . $mimeType]); exit;
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
if (empty($extension) || !in_array(strtolower($extension), ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
    $extension = 'webp';
}

$filename = 'esend_' . uniqid() . '_' . time() . '.' . $extension;
$destination = $uploadDir . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    echo json_encode(['success' => false, 'error' => 'Erreur lors du déplacement du fichier']); exit;
}

echo json_encode([
    'success' => true,
    'url' => $uploadUrl . $filename,
    'filename' => $filename
]);
