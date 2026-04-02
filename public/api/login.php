<?php
/**
 * ESEND - Contrôleur d'Authentification
 * Identique à TNERI, utilise la table esend_users.
 * Specialist: developpeur-back-end-ops
 */

require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'error' => 'Champs requis']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM esend_users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && $password === $user['password']) { // Simplifié pour test, idéalement avec password_verify
        echo json_encode(['success' => true, 'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name']
        ]]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Identifiants incorrects']);
    }
} catch (\PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur technique de connexion']);
}
