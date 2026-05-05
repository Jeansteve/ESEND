<?php
/**
 * Script de Migration Massive - ESEND
 * Transforme tous les mots de passe en clair en hachages Argon2id.
 * À exécuter UNE SEULE FOIS, puis à supprimer.
 */

require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT id, password FROM esend_users");
    $users = $stmt->fetchAll();
    
    $count = 0;
    foreach ($users as $user) {
        // Si le mot de passe ne commence pas par '$', ce n'est pas encore un hash
        if (substr($user['password'], 0, 1) !== '$') {
            $hashed = password_hash($user['password'], PASSWORD_ARGON2ID);
            $update = $pdo->prepare("UPDATE esend_users SET password = ? WHERE id = ?");
            $update->execute([$hashed, $user['id']]);
            $count++;
        }
    }
    
    echo json_encode([
        'success' => true, 
        'message' => "$count utilisateur(s) migré(s) avec succès vers Argon2id."
    ]);

} catch (\PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => "Erreur lors de la migration : " . $e->getMessage()
    ]);
}
