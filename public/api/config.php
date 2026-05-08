<?php
/**
 * ESEND API Config - Connexion MySQL
 * Specialist: developpeur-back-end-ops
 */

// Optimisation PHP pour les API JSON
error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json; charset=utf-8');

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
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données.']);
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
