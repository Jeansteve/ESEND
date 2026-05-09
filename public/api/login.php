<?php
/**
 * ESEND - Login API
 * SÉCURITÉ : Session durcies (MED-04) - Fallback mot de passe en clair supprimé (CRIT-03)
 */
session_start([
    'cookie_httponly' => true,
    'cookie_secure'   => true,
    'cookie_samesite' => 'Strict',
    'gc_maxlifetime'  => 7200
]);
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

    if ($user) {
        $isPasswordCorrect = false;
        $needsRehash = false;

        // 1. Vérification Argon2id uniquement (le fallback en clair a été supprimé pour des raisons de sécurité)
        if (password_verify($password, $user['password'])) {
            $isPasswordCorrect = true;
            // Mettre à jour le hash si les paramètres Argon2id sont obsolètes
            if (password_needs_rehash($user['password'], PASSWORD_ARGON2ID)) {
                $needsRehash = true;
            }
        }
        // Note : Si votre compte ne fonctionne plus, utilisez change_password.php pour réinitialiser.

        if ($isPasswordCorrect) {
            // --- NOUVEAU : On stocke l'ID en session ---
            $_SESSION['esend_admin_id'] = $user['id'];
            $_SESSION['esend_admin_email'] = $user['email'];

            // Si nécessaire, on hache/re-hache le mot de passe
            if ($needsRehash) {
                $newHash = password_hash($password, PASSWORD_ARGON2ID);
                $updateStmt = $pdo->prepare("UPDATE esend_users SET password = ? WHERE id = ?");
                $updateStmt->execute([$newHash, $user['id']]);
            }

            echo json_encode(['success' => true, 'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name']
            ]]);
        } else {
            sleep(1); // Ralentit les attaques brute-force
            echo json_encode(['success' => false, 'error' => 'Identifiants incorrects']);
        }
    } else {
        sleep(1); // Ralentit les attaques brute-force
        echo json_encode(['success' => false, 'error' => 'Identifiants incorrects']);
    }
} catch (\PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur technique de connexion']);
}
