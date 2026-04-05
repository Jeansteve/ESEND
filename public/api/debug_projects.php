<?php
require_once 'config.php';
header('Content-Type: application/json');
try {
    $stmt = $pdo->query("DESCRIBE esend_projects");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($columns);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
