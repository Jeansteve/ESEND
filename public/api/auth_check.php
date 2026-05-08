<?php
/**
 * ESEND - Middleware de Sécurité
 * Vérifie si une session admin est active avant de servir les données sensibles.
 */
session_start();

function checkAuth() {
    if (!isset($_SESSION['esend_admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false, 
            'error' => 'Accès non autorisé. Session expirée ou invalide.'
        ]);
        exit;
    }
}
