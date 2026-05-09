<?php
/**
 * ESEND - Middleware de Sécurité
 * Vérifie si une session admin est active avant de servir les données sensibles.
 * SÉCURITÉ : Options de session durcies (MED-04)
 */
session_start([
    'cookie_httponly' => true,   // Inaccessible au JS (anti-XSS)
    'cookie_secure'   => true,   // HTTPS uniquement
    'cookie_samesite' => 'Strict', // Anti-CSRF
    'gc_maxlifetime'  => 7200    // Expiration : 2 heures
]);

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
