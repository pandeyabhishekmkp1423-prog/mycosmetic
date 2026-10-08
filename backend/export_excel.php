<?php
/**
 * Executive Excel / CSV Lead Export Endpoint
 * Downloads leads in Microsoft Excel compatible CSV format with UTF-8 BOM
 * Sushrut Institute of Plastic Surgery (SIPS) - Dr. R. K. Mishra
 */
require_once __DIR__ . '/config.php';

session_start();

// Admin Authentication Check: Active Session or Daily Token
$authenticated = false;

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    $authenticated = true;
} elseif (isset($_GET['token'])) {
    $expected1 = md5(ADMIN_PASSWORD . date('Y-m-d'));
    $expected2 = defined('ADMIN_SECONDARY_PASSWORD') ? md5(ADMIN_SECONDARY_PASSWORD . date('Y-m-d')) : '';
    if ($_GET['token'] === $expected1 || ($expected2 && $_GET['token'] === $expected2)) {
        $authenticated = true;
    }
}

if (!$authenticated) {
    header('Location: admin.php?error=auth_required');
    exit('Unauthorized access. Please login via admin.php first.');
}

$pdo = getDbConnection();
if (!$pdo) {
    exit('Database connection failed. Please check your credentials in config.php.');
}

// Build Filter Query
$where = ["1=1"];
$params = [];

// Search across name, phone, email, reference_id, city, message
if (!empty($_GET['search'])) {
    $searchTerm = trim($_GET['search']);
    $where[] = "(name LIKE :s OR phone LIKE :s OR email LIKE :s OR reference_id LIKE :s OR city LIKE :s OR message LIKE :s)";
    $params[':s'] = "%{$searchTerm}%";
}

if (!empty($_GET['status']) && $_GET['status'] !== 'all' && $_GET['status'] !== 'All') {
    $where[] = "status = :status";
    $params[':status'] = sanitizeInput($_GET['status']);
}

if (!empty($_GET['procedure']) && $_GET['procedure'] !== 'all' && $_GET['procedure'] !== 'All') {
    $where[] = "procedure_name LIKE :proc";
    $params[':proc'] = '%' . sanitizeInput($_GET['procedure']) . '%';
}

if (!empty($_GET['from_date'])) {
    $where[] = "DATE(created_at) >= :from_date";
    $params[':from_date'] = sanitizeInput($_GET['from_date']);
}

if (!empty($_GET['to_date'])) {
    $where[] = "DATE(created_at) <= :to_date";
    $params[':to_date'] = sanitizeInput($_GET['to_date']);
}

// Quick filter presets
if (!empty($_GET['preset'])) {
    if ($_GET['preset'] === 'today') {
        $where[] = "DATE(created_at) = CURDATE()";
    } elseif ($_GET['preset'] === 'yesterday') {
        $where[] = "DATE(created_at) = SUBDATE(CURDATE(), 1)";
    } elseif ($_GET['preset'] === 'week') {
        $where[] = "created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
    } elseif ($_GET['preset'] === 'month') {
        $where[] = "created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
    }
}

$whereClause = implode(' AND ', $where);
$query = "SELECT * FROM `leads` WHERE {$whereClause} ORDER BY `id` DESC";

try {
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    exit('Query error: ' . htmlspecialchars($e->getMessage()));
}

// Output Headers for Excel (.CSV) Download
$dateSuffix = date('d-M-Y_His');
$filename = "SIPS_Consultation_Leads_" . $dateSuffix . ".csv";

header('Content-Type: text/csv; charset=UTF-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Pragma: no-cache');
header('Expires: 0');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');

// Output UTF-8 BOM for Microsoft Excel Compatibility (prevents character corruption)
echo "\xEF\xBB\xBF";

// Open output stream
$output = fopen('php://output', 'w');

// CSV Header Row
fputcsv($output, [
    'Lead ID',
    'Reference ID',
    'Submission Date',
    'Submission Time',
    'Patient Full Name',
    'Mobile Number',
    'Email Address',
    'Procedure / Treatment',
    'Consultation Mode',
    'Preferred Date',
    'OPD Time Slot',
    'City / Location',
    'Patient Notes / Medical Questions',
    'Lead Status',
    'Patient IP Address',
    'Created At (Timestamp)'
]);

// Write Rows
foreach ($leads as $lead) {
    $createdAt = !empty($lead['created_at']) ? strtotime($lead['created_at']) : time();
    $dateFormatted = date('d-M-Y', $createdAt);
    $timeFormatted = date('h:i A', $createdAt);

    // Format phone with leading apostrophe so Excel retains full digits as text without scientific notation (9.79E+09)
    $cleanPhone = preg_replace('/\D/', '', $lead['phone'] ?? '');
    $phoneDisplay = !empty($cleanPhone) ? "'" . $cleanPhone : ($lead['phone'] ?? '');

    $prefDate = !empty($lead['preferred_date']) ? date('d-M-Y', strtotime($lead['preferred_date'])) : 'Flexible / Earliest';

    fputcsv($output, [
        $lead['id'],
        $lead['reference_id'] ?? 'SIPS-' . $lead['id'],
        $dateFormatted,
        $timeFormatted,
        $lead['name'] ?? '',
        $phoneDisplay,
        $lead['email'] ?? '',
        $lead['procedure_name'] ?? 'General Consultation',
        $lead['consultation_type'] ?? 'In-Person (SIPS Hospital)',
        $prefDate,
        $lead['preferred_time'] ?? 'Morning OPD',
        $lead['city'] ?? 'Lucknow',
        str_replace(["\r\n", "\r", "\n"], ' ', $lead['message'] ?? ''),
        $lead['status'] ?? 'New',
        $lead['ip_address'] ?? '',
        $lead['created_at'] ?? ''
    ]);
}

fclose($output);
exit;
