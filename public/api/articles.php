<?php
/**
 * API Articles v2 - ESEND Admin Upgrade
 * @specialist developpeur-back-end-ops
 * Supports: nuisible_tag, is_published, updated_at, service_id, meta_title, meta_description
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Filtre optionnel par statut ?status=draft|published
        $filter = $_GET['status'] ?? null;
        $nuisibleTag = $_GET['nuisible_tag'] ?? null;

        $sql = "SELECT id, uuid, title, excerpt, image, category, nuisible_tag, service_id,
                       is_published, status, publish_date, created_at, updated_at
                FROM esend_articles";
        $conditions = [];
        $params = [];

        if ($filter === 'draft') {
            $conditions[] = "is_published = 0";
        } elseif ($filter === 'published') {
            $conditions[] = "is_published = 1";
        }
        if ($nuisibleTag) {
            $conditions[] = "nuisible_tag = ?";
            $params[] = $nuisibleTag;
        }

        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", $conditions);
        }
        $sql .= " ORDER BY created_at DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $articles = $stmt->fetchAll();
        echo json_encode($articles);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

        $uuid = $data['uuid'] ?? 'art-' . uniqid();
        $isPublished = (isset($data['is_published']) && ($data['is_published'] === true || $data['is_published'] === 1)) ? 1 : 0;
        $status = $isPublished ? 'published' : 'draft';

        $stmt = $pdo->prepare("INSERT INTO esend_articles 
            (uuid, title, excerpt, content, image, category, nuisible_tag, service_id, 
             is_published, status, publish_date, meta_title, meta_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $uuid,
            $data['title'] ?? '',
            $data['excerpt'] ?? '',
            $data['content_html'] ?? $data['content'] ?? '',
            $data['image'] ?? '',
            $data['category'] ?? 'Expertise',
            $data['nuisible_tag'] ?? 'actualites',
            $data['service_id'] ?? 1,
            $isPublished,
            $status,
            $data['date'] ?? date('d M Y'),
            $data['meta_title'] ?? '',
            $data['meta_description'] ?? ''
        ]);

        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id, 'uuid' => $uuid]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $uuid = $data['uuid'] ?? $_GET['uuid'] ?? null;
        $id   = $data['id']   ?? $_GET['id']   ?? null;

        if (!$data || (!$uuid && !$id)) {
            http_response_code(400); echo json_encode(['error' => 'uuid or id required']); exit;
        }

        $isPublished = (isset($data['is_published']) && ($data['is_published'] === true || $data['is_published'] === 1)) ? 1 : 0;
        $status = $isPublished ? 'published' : 'draft';

        if ($uuid) {
            $stmt = $pdo->prepare("UPDATE esend_articles SET
                title = ?, excerpt = ?, content = ?, image = ?, category = ?,
                nuisible_tag = ?, service_id = ?, is_published = ?, status = ?,
                meta_title = ?, meta_description = ?, updated_at = NOW()
                WHERE uuid = ?");
            $stmt->execute([
                $data['title'] ?? '',
                $data['excerpt'] ?? '',
                $data['content_html'] ?? $data['content'] ?? '',
                $data['image'] ?? '',
                $data['category'] ?? 'Expertise',
                $data['nuisible_tag'] ?? 'actualites',
                $data['service_id'] ?? 1,
                $isPublished,
                $status,
                $data['meta_title'] ?? '',
                $data['meta_description'] ?? '',
                $uuid
            ]);
        } else {
            $stmt = $pdo->prepare("UPDATE esend_articles SET
                title = ?, excerpt = ?, content = ?, image = ?, category = ?,
                nuisible_tag = ?, service_id = ?, is_published = ?, status = ?,
                meta_title = ?, meta_description = ?, updated_at = NOW()
                WHERE id = ?");
            $stmt->execute([
                $data['title'] ?? '',
                $data['excerpt'] ?? '',
                $data['content_html'] ?? $data['content'] ?? '',
                $data['image'] ?? '',
                $data['category'] ?? 'Expertise',
                $data['nuisible_tag'] ?? 'actualites',
                $data['service_id'] ?? 1,
                $isPublished,
                $status,
                $data['meta_title'] ?? '',
                $data['meta_description'] ?? '',
                $id
            ]);
        }

        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $uuid = $_GET['uuid'] ?? null;
        $id   = $_GET['id']   ?? null;
        if (!$uuid && !$id) { http_response_code(400); echo json_encode(['error' => 'uuid or id required']); exit; }

        if ($uuid) {
            $stmt = $pdo->prepare("DELETE FROM esend_articles WHERE uuid = ?");
            $stmt->execute([$uuid]);
        } else {
            $stmt = $pdo->prepare("DELETE FROM esend_articles WHERE id = ?");
            $stmt->execute([$id]);
        }
        echo json_encode(['success' => true]);
        break;
}
