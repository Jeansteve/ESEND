<?php
/**
 * API Réalisations (Projects) - ESEND
 * Specialist: developpeur-back-end-ops
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM esend_projects ORDER BY created_at DESC");
        $projects = $stmt->fetchAll();
        echo json_encode($projects);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) exit;

        $stmt = $pdo->prepare("INSERT INTO esend_projects (title, location, img, tag, description) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'],
            $data['location'] ?? '',
            $data['img'] ?? '',
            $data['tag'] ?? '',
            $data['description'] ?? ''
        ]);
        
        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['id'])) exit;

        $stmt = $pdo->prepare("UPDATE esend_projects SET title = ?, location = ?, img = ?, tag = ?, description = ? WHERE id = ?");
        $stmt->execute([
            $data['title'],
            $data['location'] ?? '',
            $data['img'] ?? '',
            $data['tag'] ?? '',
            $data['description'] ?? '',
            $data['id']
        ]);
        
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? '';
        if (!$id) exit;

        $stmt = $pdo->prepare("DELETE FROM esend_projects WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
}
