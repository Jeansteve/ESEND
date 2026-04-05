<?php
/**
 * API Articles v3 - ESEND Admin Upgrade (Bypass Deploy Issues)
 * @specialist developpeur-back-end-ops
 * Supports: nuisible_tag, is_published, updated_at, service_id, meta_title, meta_description
 */

header('Content-Type: application/json');
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $filter = $_GET['status'] ?? null;
        $nuisibleTag = $_GET['nuisible_tag'] ?? null;

        $sql = "SELECT * FROM esend_articles";
        $conditions = [];
        $params = [];

        try {
            $checkCol = $pdo->query("SHOW COLUMNS FROM esend_articles LIKE 'is_published'");
            $hasIsPublished = ($checkCol->rowCount() > 0);
        } catch (Exception $e) {
            $hasIsPublished = false;
        }

        if ($hasIsPublished) {
            if ($filter === 'draft') {
                $conditions[] = "is_published = 0";
            } elseif ($filter === 'published') {
                $conditions[] = "is_published = 1";
            }
        }

        try {
            $checkTag = $pdo->query("SHOW COLUMNS FROM esend_articles LIKE 'nuisible_tag'");
            $hasNuisibleTag = ($checkTag->rowCount() > 0);
        } catch (Exception $e) {
            $hasNuisibleTag = false;
        }

        if ($hasNuisibleTag && $nuisibleTag) {
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

        $stmt = $pdo->prepare("INSERT INTO esend_articles 
            (uuid, title, excerpt, content, image, category, nuisible_tag, service_id, 
             is_published, publish_date, meta_title, meta_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
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
            $data['date'] ?? date('d M Y'),
            $data['meta_title'] ?? '',
            $data['meta_description'] ?? ''
        ]);

        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id, 'uuid' => $uuid]);
        break;

    case 'PUT':
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $uuid = $data['uuid'] ?? $_GET['uuid'] ?? null;
            $id   = $data['id']   ?? $_GET['id']   ?? null;

            if (!$data || (!$uuid && !$id)) {
                http_response_code(400); echo json_encode(['error' => 'uuid or id required']); exit;
            }

            $isPublished = (isset($data['is_published']) && ($data['is_published'] === true || $data['is_published'] === 1)) ? 1 : 0;

            if ($uuid) {
                $stmt = $pdo->prepare("UPDATE esend_articles SET
                    title = ?, excerpt = ?, content = ?, image = ?, category = ?,
                    nuisible_tag = ?, service_id = ?, is_published = ?,
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
                    $data['meta_title'] ?? '',
                    $data['meta_description'] ?? '',
                    $uuid
                ]);
            } else {
                $stmt = $pdo->prepare("UPDATE esend_articles SET
                    title = ?, excerpt = ?, content = ?, image = ?, category = ?,
                    nuisible_tag = ?, service_id = ?, is_published = ?,
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
                    $data['meta_title'] ?? '',
                    $data['meta_description'] ?? '',
                    $id
                ]);
            }

            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
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
