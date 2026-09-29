<?php
/**
 * Database & Application Configuration
 * Sushrut Institute of Plastic Surgery (SIPS) - Dr. R. K. Mishra
 * Designed for deployment on Hostinger MySQL & PHP
 */

// Prevent direct command-line or unintended execution if needed
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// CORS Headers: Allow requests from website domain or localhost during testing
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:3001',
    'https://mycosmeticsurgery.in',
    'https://www.mycosmeticsurgery.in'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins) || empty($origin)) {
    header("Access-Control-Allow-Origin: " . ($origin ? $origin : "*"));
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS request immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -------------------------------------------------------------
// 1. HOSTINGER DATABASE SETTINGS (Fill in your Hostinger MySQL details)
// -------------------------------------------------------------
define('DB_HOST', 'localhost');                // Hostinger MySQL host (usually 'localhost')
define('DB_NAME', 'u123456789_cosmetic');      // Hostinger Database Name
define('DB_USER', 'u123456789_user');          // Hostinger Database Username
define('DB_PASS', 'YourStrongPasswordHere');   // Hostinger Database Password
define('DB_CHARSET', 'utf8mb4');

// -------------------------------------------------------------
// 2. ADMIN PANEL SECURITY SETTINGS
// -------------------------------------------------------------
define('ADMIN_USERNAME', 'admin');             // Admin username to login
define('ADMIN_PASSWORD', 'DrMishra@2026');     // Admin password (change this to your preferred password)
define('SESSION_LIFETIME', 86400);             // 24 hours session lifetime

// -------------------------------------------------------------
// 3. CLINIC NOTIFICATION SETTINGS
// -------------------------------------------------------------
define('CLINIC_EMAIL', 'MyCosmeticSurgery@gmail.com');
define('CLINIC_PHONE', '9795800800');
define('ENABLE_EMAIL_NOTIFICATION', false);    // Set to true if your Hostinger PHP mail() is enabled

// -------------------------------------------------------------
// 4. PDO DATABASE CONNECTION FUNCTION
// -------------------------------------------------------------
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Return null or error message in production
        return null;
    }
}

// -------------------------------------------------------------
// 5. HELPER UTILITIES
// -------------------------------------------------------------
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(trim((string)$data), ENT_QUOTES, 'UTF-8');
}
