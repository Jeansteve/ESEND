<?php
require_once 'config.php';
$stmt = $pdo->prepare("SELECT setting_key, LENGTH(setting_value) as len FROM esend_settings WHERE setting_key = 'apify_token'");
$stmt->execute();
$row = $stmt->fetch();

if ($row) {
    echo json_encode([
        "exists" => true,
        "key" => $row['setting_key'],
        "length" => $row['len']
    ]);
} else {
    echo json_encode(["status" => "Key apify_token not found in esend_settings"]);
}
?>
