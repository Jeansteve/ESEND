<?php
/**
 * API Settings - ESEND
 * Specialist: developpeur-back-end-ops
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM esend_settings");
        $rows = $stmt->fetchAll();
        
        $settings = array();
        foreach ($rows as $row) {
            $val = $row['setting_value'];
            // Auto-cast boolean strings
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
