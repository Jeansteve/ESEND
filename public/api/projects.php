<?php
/**
 * API Réalisations (Projects) v2 - ESEND Admin Upgrade
 * @specialist developpeur-back-end-ops
 * Supports: is_published, updated_at, method, result, category
 */

header('Content-Type: application/json');
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $filter = $_GET['status'] ?? null;
        $category = $_GET['category'] ?? null;

        // SELECT * pour compatibilité avec l'ancien schéma DB (avant migration v2)
        $sql = "SELECT * FROM esend_projects";
        $conditions = [];
        $params = [];

        // Filtre is_published conditionnel
        try {
            $checkPub = $pdo->query("SHOW COLUMNS FROM esend_projects LIKE 'is_published'");
            $hasIsPublished = ($checkPub->rowCount() > 0);
        } catch (Exception $e) { $hasIsPublished = false; }

        if ($hasIsPublished) {
            if ($filter === 'draft') $conditions[] = "is_published = 0";
            elseif ($filter === 'published') $conditions[] = "is_published = 1";
        }

        // Filtre category conditionnel
        try {
            $checkCat = $pdo->query("SHOW COLUMNS FROM esend_projects LIKE 'category'");
            $hasCat = ($checkCat->rowCount() > 0);
        } catch (Exception $e) { $hasCat = false; }

        if ($hasCat && $category) {
            $conditions[] = "category = ?";
            $params[] = $category;
        }

        if (!empty($conditions)) $sql .= " WHERE " . implode(" AND ", $conditions);
        $sql .= " ORDER BY created_at DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $projects = $stmt->fetchAll();
        echo json_encode($projects);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

        $isPublished = (isset($data['is_published']) && ($data['is_published'] === true || $data['is_published'] === 1)) ? 1 : 1; // Publiées par défaut

        $stmt = $pdo->prepare("INSERT INTO esend_projects 
            (title, location, img, tag, description, method, result, category, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['location'] ?? '',
            $data['img'] ?? '',
            $data['tag'] ?? '',
            $data['description'] ?? '',
            $data['method'] ?? '',
            $data['result'] ?? 'Succès',
            $data['category'] ?? 'nuisibles',
            $isPublished
        ]);

        $id = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id' => $id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? $_GET['id'] ?? null;

        if (!$data || !$id) {
            http_response_code(400); echo json_encode(['error' => 'id required']); exit;
        }

        $isPublished = isset($data['is_published']) ? ($data['is_published'] ? 1 : 0) : 1;

        $stmt = $pdo->prepare("UPDATE esend_projects SET
            title = ?, location = ?, img = ?, tag = ?, description = ?,
            method = ?, result = ?, category = ?, is_published = ?, updated_at = NOW()
            WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['location'] ?? '',
            $data['img'] ?? '',
            $data['tag'] ?? '',
            $data['description'] ?? '',
            $data['method'] ?? '',
            $data['result'] ?? 'Succès',
            $data['category'] ?? 'nuisibles',
            $isPublished,
            $id
        ]);

        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) { http_response_code(400); echo json_encode(['error' => 'id required']); exit; }

        $stmt = $pdo->prepare("DELETE FROM esend_projects WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
}
