<?php
/**
 * API Settings - ESEND
 * Specialist: developpeur-back-end-ops
 */

require_once 'config.php';
require_once 'auth_check.php';

$method = $_SERVER['REQUEST_METHOD'];

// Protection : Seul l'admin peut modifier les réglages
if ($method === 'POST') {
    checkAuth();
}

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM esend_settings");
        $rows = $stmt->fetchAll();
        
        // Clés sensibles masquées pour les requêtes non authentifiées (MED-01)
        $sensitiveKeys = ['gemini_api_key', 'apify_token', 'google_reviews_id', 'ga_id'];
        $isAdmin = isset($_SESSION['esend_admin_id']);
        
        $settings = array();
        foreach ($rows as $row) {
            // Masquer les clés sensibles si l'utilisateur n'est pas admin
            if (!$isAdmin && in_array($row['setting_key'], $sensitiveKeys)) {
                continue;
            }
            $val = $row['setting_value'];
            if ($val === 'true') $val = true;
            if ($val === 'false') $val = false;
            $settings[$row['setting_key']] = $val;
        }
        echo json_encode($settings);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) exit;

        foreach ($data as $key => $value) {
            // Conversion booléen en string pour le stockage SQL
            if (is_bool($value)) $value = $value ? 'true' : 'false';
            
            $stmt = $pdo->prepare("INSERT INTO esend_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
            $stmt->execute([$key, $value, $value]);
        }
        
        echo json_encode(['success' => true]);
        break;
}
