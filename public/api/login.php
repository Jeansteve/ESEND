session_start();
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

        // 1. Essai avec hachage moderne
        if (password_verify($password, $user['password'])) {
            $isPasswordCorrect = true;
            // Vérifier si les paramètres de hachage doivent être mis à jour
            if (password_needs_rehash($user['password'], PASSWORD_ARGON2ID)) {
                $needsRehash = true;
            }
        } 
        // 2. Fallback pour les anciens mots de passe en clair (Migration Douce)
        else if ($password === $user['password']) {
            $isPasswordCorrect = true;
            $needsRehash = true;
        }

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
            echo json_encode(['success' => false, 'error' => 'Identifiants incorrects']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Identifiants incorrects']);
    }
} catch (\PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur technique de connexion']);
}
