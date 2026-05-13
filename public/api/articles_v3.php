<?php
/**
 * API Articles v3 - ESEND Admin Upgrade (Bypass Deploy Issues)
 * @specialist developpeur-back-end-ops
 * FIXED SCHEMA: added meta_title, meta_description support.
 */

header('Content-Type: application/json');
require_once 'config.php';
require_once 'auth_check.php';

$method = $_SERVER['REQUEST_METHOD'];

// Protection : Seul l'admin peut modifier, créer ou supprimer des articles
if ($method !== 'GET') {
    checkAuth();
}

switch ($method) {
    case 'GET':
        $filter = $_GET['status'] ?? null;
        $nuisibleTag = $_GET['nuisible_tag'] ?? null;
        $id = $_GET['id'] ?? null;

        // --- Chargement d'un article unique par ID ou UUID (pour la page de lecture) ---
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM esend_articles WHERE id = ? OR uuid = ? LIMIT 1");
            $stmt->execute([$id, $id]);
            $article = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($article) {
                // --- View Tracking : Incrémenter le compteur de vues (si la colonne existe) ---
                try {
                    $pdo->prepare("UPDATE esend_articles SET views = views + 1 WHERE id = ?")->execute([$article['id']]);
                    $article['views'] = ($article['views'] ?? 0) + 1;
                } catch (Exception $e) { /* Silencieusement ignorer si la colonne views manque */ }

                // Protection : Empêcher la lecture d'un brouillon sans être admin
                if (isset($article['is_published']) && $article['is_published'] == 0) {
                    if (!isset($_SESSION['esend_admin_id'])) {
                        http_response_code(403);
                        echo json_encode(['error' => 'Accès interdit : cet article est en cours de rédaction.']);
                        exit;
                    }
                }
                
                // Mapper les champs pour le frontend
                $article['content_html'] = $article['content'] ?? '';
                $article['date'] = $article['publish_date'] ?? '';
                $article['readTime'] = $article['read_time'] ?? 1;
                
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
                checkAuth(); // Protection : Seul l'admin voit les brouillons
                $conditions[] = "is_published = 0";
            } elseif ($filter === 'published') {
                $conditions[] = "is_published = 1";
            } else {
                // Par défaut, si pas d'authentification, on ne montre que le publié
                if (!isset($_SESSION['esend_admin_id'])) {
                    $conditions[] = "is_published = 1";
                }
            }
        }

        try {
            $checkTag = $pdo->query("SHOW COLUMNS FROM esend_articles LIKE 'nuisible_tag'");
            $hasNuisibleTag = ($checkTag->rowCount() > 0);
            $checkReadTime = $pdo->query("SHOW COLUMNS FROM esend_articles LIKE 'read_time'");
            $hasReadTime = ($checkReadTime->rowCount() > 0);
        } catch (Exception $e) { $hasNuisibleTag = false; $hasReadTime = false; }

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
            // Aliasing pour KnowledgeHub.jsx
            $a['date'] = $a['publish_date'] ?? '';
            $a['readTime'] = $a['read_time'] ?? 1;
            return $a;
        }, $articles);

        echo json_encode($articles);
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

            $cols = ["uuid", "title", "excerpt", "content", "meta_title", "meta_description", "image", "category", "nuisible_tag", "service_id", "is_published", "publish_date"];
            $vals = [$uuid, $data['title'] ?? '', $data['excerpt'] ?? '', $data['content_html'] ?? $data['content'] ?? '', $data['meta_title'] ?? $data['seo_title'] ?? '', $data['meta_description'] ?? $data['seo_description'] ?? '', $data['image'] ?? '', $data['category'] ?? 'Expertise', $data['nuisible_tag'] ?? 'actualites', $data['service_id'] ?? 1, $isPublished, $data['date'] ?? date('d M Y')];

            if ($hasReadTime) {
                $cols[] = "read_time";
                $vals[] = $data['read_time'] ?? $data['readTime'] ?? 1;
            }

            $placeholders = implode(',', array_fill(0, count($cols), '?'));
            $sql = "INSERT INTO esend_articles (" . implode(',', $cols) . ") VALUES ($placeholders)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($vals);

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

            $updateCols = [
                "title = ?", "excerpt = ?", "content = ?", "meta_title = ?", "meta_description = ?", "image = ?", "category = ?",
                "nuisible_tag = ?", "service_id = ?", "is_published = ?", "updated_at = NOW()"
            ];
            $params = [
                $data['title'] ?? '', $data['excerpt'] ?? '', $data['content_html'] ?? $data['content'] ?? '',
                $data['meta_title'] ?? $data['seo_title'] ?? '', $data['meta_description'] ?? $data['seo_description'] ?? '',
                $data['image'] ?? '', $data['category'] ?? 'Expertise', $data['nuisible_tag'] ?? 'actualites',
                $data['service_id'] ?? 1, $isPublished
            ];

            if ($hasReadTime) {
                $updateCols[] = "read_time = ?";
                $params[] = $data['read_time'] ?? $data['readTime'] ?? 1;
            }

            if ($uuid) {
                $sql = "UPDATE esend_articles SET " . implode(', ', $updateCols) . " WHERE uuid = ?";
                $params[] = $uuid;
            } else {
                $sql = "UPDATE esend_articles SET " . implode(', ', $updateCols) . " WHERE id = ?";
                $params[] = $id;
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);

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
