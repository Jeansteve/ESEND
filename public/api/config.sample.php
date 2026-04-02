<?php
/**
 * ESEND API Config - MODÈLE (Sample)
 * Specialist: developpeur-back-end-ops
 * 
 * INSTRUCTIONS : 
 * 1. Renommez ce fichier en 'config.php' sur votre serveur.
 * 2. Remplissez vos identifiants Hostinger ci-dessous.
 */

// Paramètres de connexion Hostinger
define('DB_HOST', 'localhost');
define('DB_NAME', 'VOTRE_NOM_DE_BASE');
define('DB_USER', 'VOTRE_UTILISATEUR');
define('DB_PASS', 'VOTRE_MOT_DE_PASSE');

// Configuration PDO
$options = [
    PDO::ATTR_ERR_MODE            => PDO::ERR_MODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE  => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (\PDOException $e) {
    header('Content-Type: application/json', true, 500);
    echo json_encode(['success' => false, 'error' => 'Erreur de connexion DB']);
    exit;
}

// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
