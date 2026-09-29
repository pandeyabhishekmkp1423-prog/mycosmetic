<?php
/**
 * Excel / CSV Lead Export Endpoint
 * Downloads leads in Microsoft Excel compatible CSV format with UTF-8 BOM
 */
require_once __DIR__ . '/config.php';

session_start();

// Admin Authentication Check: Session or Security Token
$authenticated = false;

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    $authenticated = true;
} elseif (isset($_GET['token']) && $_GET['token'] === md5(ADMIN_PASSWORD . date('Y-m-d'))) {
    $authenticated = true;
}

if (!$authenticated) {
    header('Location: admin.php?error=auth_required');
    exit('Unauthorized access. Please login via admin.php first.');
}

$pdo = getDbConnection();
if (!$pdo) {
    exit('Database connection failed. Please check config.php.');
}

// Build Filter Query
$where = ["1=1"];
$params = [];

if (!empty($_GET['status'])) {
    $where[] = "status = :status";
    $params[':status'] = sanitizeInput($_GET['status']);
}

if (!empty($_GET['procedure'])) {
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

$whereClause = implode(' AND ', $where);
$query = "SELECT * FROM `leads` WHERE {$whereClause} ORDER BY `id` DESC";
$stmt = $pdo->prepare($query);
$stmt->execute($params);
$leads = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output Headers for Excel Download
$filename = "Dr_RK_Mishra_Leads_" . date('Y-m-d_His') . ".csv";

header('Content-Type: text/csv; charset=UTF-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Pragma: no-cache');
header('Expires: 0');

// Output UTF-8 BOM for Microsoft Excel UTF-8 Compatibility
echo "\xEF\xBB\xBF";

// Open output stream
$output = fopen('php://output', 'w');

// CSV Header Row
fputcsv($output, [
    'ID',
    'Reference ID',
    'Date Submitted',
    'Time',
    'Patient Name',
    'Phone Number',
    'Email Address',
    'Procedure / Treatment',
    'Consultation Mode',
    'Preferred Date',
    'OPD Slot',
    'City / Location',
    'Patient Questions / Notes',
    'Lead Status',
    'IP Address'
]);

// Write Rows
foreach ($leads as $lead) {
    $createdAt = strtotime($lead['created_at']);
    $date = date('d-M-Y', $createdAt);
    $time = date('h:i A', $createdAt);

    // Format phone to prevent Excel from treating it as scientific notation
    $phone = "'" . $lead['phone'];

    fputcsv($output, [
        $lead['id'],
        $lead['reference_id'] ?? '',
        $date,
        $time,
        $lead['name'] ?? '',
        $phone,
        $lead['email'] ?? '',
        $lead['procedure_name'] ?? '',
        $lead['consultation_type'] ?? '',
        $lead['preferred_date'] ?? '',
        $lead['preferred_time'] ?? '',
        $lead['city'] ?? '',
        $lead['message'] ?? '',
        $lead['status'] ?? 'New',
        $lead['ip_address'] ?? ''
    ]);
}

fclose($output);
exit;
