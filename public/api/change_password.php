<?php
/**
 * API Change Password - ESEND
 * Specialist: developpeur-back-end-ops
 */

require_once 'config.php';

// Récupération des données POST
$data = json_decode(file_get_contents('php://input'), true);
$current = $data['current'] ?? '';
$next = $data['next'] ?? '';

if (empty($current) || empty($next)) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis']);
    exit;
}

// Pour simplifier, on suppose que l'utilisateur est celui avec l'ID 1 (ou le premier trouvé)
// Dans une version plus avancée, on utiliserait une session.
try {
    // 1. Vérifier l'ancien mot de passe
    $stmt = $pdo->prepare("SELECT id, password FROM esend_users LIMIT 1");
    $stmt->execute();
    $user = $stmt->fetch();

    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
        exit;
    }

    $isCurrentCorrect = false;
    // Vérification hybride (Hash ou Clair pour migration)
    if (password_verify($current, $user['password'])) {
        $isCurrentCorrect = true;
    } else if ($current === $user['password']) {
        $isCurrentCorrect = true;
    }

    if (!$isCurrentCorrect) {
        echo json_encode(['success' => false, 'message' => 'L\'ancien mot de passe est incorrect']);
        exit;
    }

    // 2. Mettre à jour avec le nouveau mot de passe haché
    $newHash = password_hash($next, PASSWORD_ARGON2ID);
    $stmt = $pdo->prepare("UPDATE esend_users SET password = ? WHERE id = ?");
    $stmt->execute([$newHash, $user['id']]);

    echo json_encode(['success' => true]);
} catch (\PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur technique lors de la mise à jour']);
}
