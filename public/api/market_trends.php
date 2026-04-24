<?php
// /public/api/market_trends.php
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');

// Configuration
$CACHE_FILE = __DIR__ . '/../data/market_trends_cache_v2.json';
$CACHE_TTL = 3600; // 1 heure

// Récupération sécurisée du token
$apifyToken = '';
$stmt = $pdo->prepare("SELECT setting_value FROM esend_settings WHERE setting_key = 'apify_token' LIMIT 1");
$stmt->execute();
$row = $stmt->fetch();
if ($row && !empty($row['setting_value'])) {
    $apifyToken = $row['setting_value'];
}

$forceRefresh = isset($_GET['refresh']) && $_GET['refresh'] == '1';

if (!$forceRefresh && file_exists($CACHE_FILE) && (time() - filemtime($CACHE_FILE)) < $CACHE_TTL) {
    echo file_get_contents($CACHE_FILE);
    exit;
}

// Configuration du Radar Hyper-Local (Priorité Menton First)
$queries = [
    ["query" => "punaise de lit Menton", "label" => "Vigilance : Menton (Punaises)"],
    ["query" => "frelon asiatique 06", "label" => "06 : Riviera (Frelons)"],
    ["query" => "cafard Menton", "label" => "Menton : Cafards & Blattes"],
    ["query" => "dératisation Menton", "label" => "Menton : Rats & Souris"]
];

function fetchApifyData($token, $queries) {
    if (empty($token) || strlen($token) < 10) return null;

    $actorId = 'apify~google-trends-scraper';
    $searchTerms = array_column($queries, 'query');
    
    $input = [
        "searchTerms" => $searchTerms,
        "geo" => "FR-U", // Région PACA pour assurer un volume de data suffisant
        "timeRange" => "now 7-d"
    ];

    $url = "https://api.apify.com/v2/acts/$actorId/run-sync-get-dataset-items?token=$token&timeout=25";
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $itemsJson = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 400 || empty($itemsJson)) return null;

    $items = json_decode($itemsJson, true);
    if (empty($items) || !is_array($items)) return null;

    // Analyse REELLE des points de données
    $final = [];
    foreach ($queries as $idx => $q) {
        $trendVal = 0;
        $isRising = false;
        
        // Extraction de la timeline pour ce terme
        // Apify renvoie souvent les résultats fusionnés ou par terme
        foreach ($items as $item) {
            $timeline = $item['interestOverTime_timelineData'] ?? null;
            if ($timeline && count($timeline) >= 2) {
                $last = end($timeline)['value'][$idx] ?? 0;
                $prev = prev($timeline)['value'][$idx] ?? 0;
                
                if ($prev > 0) {
                    $trendVal = round((($last - $prev) / $prev) * 100);
                } else {
                    $trendVal = $last > 0 ? 100 : 0;
                }
                $isRising = $trendVal > 0;
                break;
            }
        }

        $final[] = [
            "label" => $q['label'],
            "searchTerm" => $q['query'],
            "trendChange" => ($trendVal >= 0 ? "+" : "") . $trendVal . "%",
            "isRising" => $isRising,
            "color" => $idx === 1 ? 'amber' : ($trendVal > 30 ? 'red' : 'indigo'),
            "url" => "https://trends.google.fr/trends/explore?date=now%207-d&geo=FR-U&q=" . urlencode($q['query'])
        ];
    }
    return $final;
}

$data = fetchApifyData($apifyToken, $queries);
$source = $data ? "apify_live" : "simulation_fallback";

if (!$data) {
    $data = [];
    $month = (int)date('m');
    foreach ($queries as $idx => $q) {
        $val = ($idx === 1 && $month >= 4) ? rand(35, 60) : rand(10, 28);
        $data[] = [
            "label" => $q['label'],
            "searchTerm" => $q['query'],
            "trendChange" => "+$val%",
            "isRising" => true,
            "color" => $idx === 1 ? 'amber' : 'indigo',
            "url" => "https://trends.google.fr/trends/explore?date=now%207-d&geo=FR-U&q=" . urlencode($q['query'])
        ];
    }
}

$output = [
    "timestamp" => time(),
    "source" => $source,
    "data" => $data,
    "debug" => ["token_detected" => !empty($apifyToken)]
];

if (!is_dir(__DIR__ . '/../data')) mkdir(__DIR__ . '/../data', 0755, true);
file_put_contents($CACHE_FILE, json_encode($output));
echo json_encode($output);
?>
