<?php
/**
 * API Articles - ESEND
 * Specialist: developpeur-back-end-ops
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM esend_articles ORDER BY created_at DESC");
        $articles = $stmt->fetchAll();
        echo json_encode($articles);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) exit;

        $uuid = $data['uuid'] ?? 'art-' . uniqid();
        $stmt = $pdo->prepare("INSERT INTO esend_articles (uuid, title, excerpt, content, image, category, publish_date) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $uuid,
            $data['title'],
            $data['excerpt'] ?? '',
            $data['content'] ?? '',
            $data['image'] ?? '',
            $data['category'] ?? '',
            $data['date'] ?? date('d M Y')
        ]);
        
        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id, 'uuid' => $uuid]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['uuid'])) exit;

        $stmt = $pdo->prepare("UPDATE esend_articles SET title = ?, excerpt = ?, content = ?, image = ?, category = ?, publish_date = ? WHERE uuid = ?");
        $stmt->execute([
            $data['title'],
            $data['excerpt'] ?? '',
            $data['content'] ?? '',
            $data['image'] ?? '',
            $data['category'] ?? '',
            $data['date'] ?? '',
            $data['uuid']
        ]);
        
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $uuid = $_GET['uuid'] ?? '';
        if (!$uuid) exit;

        $stmt = $pdo->prepare("DELETE FROM esend_articles WHERE uuid = ?");
        $stmt->execute([$uuid]);
        echo json_encode(['success' => true]);
        break;
}
