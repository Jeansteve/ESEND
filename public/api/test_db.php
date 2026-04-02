<?php
/**
 * Test Connexion ESEND
 * Specialist: developpeur-back-end-ops
 */

// Force l'affichage d'erreurs (DEBUG)
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>🔍 Diagnostic de Connexion ESEND</h1>";

try {
    require_once 'config.php';
    echo "<p style='color:green'>✅ Import de config.php réussi.</p>";
    
    if (isset($pdo)) {
        echo "<p style='color:green'>✅ Objet PDO détecté.</p>";
        $stmt = $pdo->query("SELECT COUNT(*) FROM esend_settings");
        $count = $stmt->fetchColumn();
        echo "<p style='color:green'>✅ Succès ! Nombre de réglages trouvés : $count</p>";
    } else {
        echo "<p style='color:red'>❌ L'objet \$pdo n'est pas défini dans config.php.</p>";
    }
} catch (Exception $e) {
    echo "<p style='color:red'>❌ ERREUR FATALE : " . $e->getMessage() . "</p>";
}
