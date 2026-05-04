<?php
/**
 * API Articles v3 - ESEND Admin Upgrade (Bypass Deploy Issues)
 * @specialist developpeur-back-end-ops
 * FIXED SCHEMA: removed meta_title, meta_description which do not exist in the table.
 */

header('Content-Type: application/json');
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $filter = $_GET['status'] ?? null;
        $nuisibleTag = $_GET['nuisible_tag'] ?? null;
        $id = $_GET['id'] ?? null;

        // --- Chargement d'un article unique par ID (pour la page de lecture) ---
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM esend_articles WHERE id = ? LIMIT 1");
            $stmt->execute([$id]);
            $article = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($article) {
                // Mapper 'content' (DB) -> 'content_html' (frontend)
                $article['content_html'] = $article['content'] ?? '';
                echo json_encode($article);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Article not found']);
            }
            break;
        }

        $sql = "SELECT * FROM esend_articles";
        $conditions = [];
        $params = [];

        try {
            $checkCol = $pdo->query("SHOW COLUMNS FROM esend_articles LIKE 'is_published'");
            $hasIsPublished = ($checkCol->rowCount() > 0);
        } catch (Exception $e) { $hasIsPublished = false; }

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
        } catch (Exception $e) { $hasNuisibleTag = false; }

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
        $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // OPTIMISATION PERF: Supprimer le contenu lourd pour la vue liste
        // Le frontend n'a besoin que du titre, extrait, image, etc.
        $articles = array_map(function($a) {
            unset($a['content']); // Réduit la taille du JSON drastiquement
            return $a;
        }, $articles);

        echo json_encode($articles);
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

            $uuid = $data['uuid'] ?? 'art-' . uniqid();
            $isPublished = (isset($data['is_published']) && ($data['is_published'] === true || $data['is_published'] === 1)) ? 1 : 0;

            // REAL SCHEMA: id, uuid, title, excerpt, content, image, category, publish_date, created_at, updated_at, nuisible_tag, is_published, service_id
            $stmt = $pdo->prepare("INSERT INTO esend_articles 
                (uuid, title, excerpt, content, image, category, nuisible_tag, service_id, is_published, publish_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
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
                $data['date'] ?? date('d M Y')
            ]);

            $id = $pdo->lastInsertId();
            echo json_encode(['success' => true, 'id' => $id, 'uuid' => $uuid]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
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
                    nuisible_tag = ?, service_id = ?, is_published = ?, updated_at = NOW()
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
                    $uuid
                ]);
            } else {
                $stmt = $pdo->prepare("UPDATE esend_articles SET
                    title = ?, excerpt = ?, content = ?, image = ?, category = ?,
                    nuisible_tag = ?, service_id = ?, is_published = ?, updated_at = NOW()
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
