<?php
/**
 * ESEND API Config
 * Generated automatically via GitHub Actions - DO NOT EDIT MANUALLY
 */

error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json; charset=utf-8');

// Credentials Base de Données
define('DB_HOST', '${DB_HOST}');
define('DB_NAME', '${DB_NAME}');
define('DB_USER', '${DB_USER}');
define('DB_PASS', '${DB_PASS}');

// Credentials SMTP
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_USER', '${SMTP_USER}');
define('SMTP_PASS', '${SMTP_PASS}');
define('SMTP_PORT', 465);

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
    echo json_encode(['success' => false, 'error' => 'Erreur de connexion DB']);
    exit;
}

// CORS restreint aux domaines autorisés
$allowedOrigins = ['https://esendnuisibles.fr', 'https://site-test.esendnuisibles.fr', 'https://www.esendnuisibles.fr'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
