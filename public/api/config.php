<?php
/**
 * ESEND API Config - Connexion MySQL
 * Specialist: developpeur-back-end-ops
 */

// À DESACTIVER EN PRODUCTION UNE FOIS LE DEBUG TERMINÉ
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Paramètres de connexion Hostinger (À remplir par l'utilisateur)
define('DB_HOST', 'localhost'); // Souvent localhost sur Hostinger
define('DB_NAME', 'u387599421_esend'); // Exemple
define('DB_USER', 'u387599421_admin'); // Exemple
define('DB_PASS', '&haQ*;Q+4mW'); // Exemple

// Configuration PDO
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (\PDOException $e) {
    header('Content-Type: application/json', true, 500);
    echo json_encode(['success' => false, 'error' => 'Erreur de connexion DB : ' . $e->getMessage()]);
    exit;
}

// Headers CORS (À ajuster par l'utilisateur pour la sécurité)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Gestion du pré-vol (Preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
