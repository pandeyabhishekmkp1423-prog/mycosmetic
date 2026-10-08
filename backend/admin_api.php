<?php
/**
 * RESTful Admin API for Live Lead Management & React Frontend Sync
 * Sushrut Institute of Plastic Surgery (SIPS) - Dr. R. K. Mishra
 * Endpoint: /api/admin_api.php
 */
require_once __DIR__ . '/config.php';

session_start();

// Ensure JSON response by default
header('Content-Type: application/json; charset=utf-8');

$pdo = getDbConnection();

if (!$pdo) {
    sendJsonResponse([
        'success' => false,
        'error'   => 'Database connection failed. Please verify credentials in config.php.',
        'details' => $GLOBALS['db_last_error'] ?? 'Connection error'
    ], 500);
}

// Ensure table exists
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `leads` (
        `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `reference_id` VARCHAR(30) NOT NULL UNIQUE,
        `name` VARCHAR(150) NOT NULL,
        `phone` VARCHAR(30) NOT NULL,
        `email` VARCHAR(150) NULL,
        `procedure_name` VARCHAR(150) NOT NULL,
        `consultation_type` VARCHAR(50) DEFAULT 'In-Person (SIPS Hospital)',
        `preferred_date` DATE NULL,
        `preferred_time` VARCHAR(100) NULL,
        `city` VARCHAR(100) NULL,
        `message` TEXT NULL,
        `status` ENUM('New', 'Contacted', 'Scheduled', 'Completed', 'Cancelled') NOT NULL DEFAULT 'New',
        `ip_address` VARCHAR(45) NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_phone` (`phone`),
        INDEX `idx_status` (`status`),
        INDEX `idx_procedure` (`procedure_name`),
        INDEX `idx_created` (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
} catch (PDOException $e) {
    // continue
}

$action = $_GET['action'] ?? $_POST['action'] ?? 'get_leads';

// Parse JSON payload if sent via POST
$payload = [];
$rawInput = file_get_contents('php://input');
if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $payload = $decoded;
        if (isset($payload['action'])) {
            $action = $payload['action'];
        }
    }
}
if (empty($payload)) {
    $payload = $_POST;
}

// -------------------------------------------------------------
// 1. ACTION: LOGIN (Optional SPA login endpoint)
// -------------------------------------------------------------
if ($action === 'login') {
    $username = trim($payload['username'] ?? '');
    $password = trim($payload['password'] ?? '');

    $validUser = ($username === ADMIN_USERNAME);
    $validPass = ($password === ADMIN_PASSWORD || (defined('ADMIN_SECONDARY_PASSWORD') && $password === ADMIN_SECONDARY_PASSWORD));

    if ($validUser && $validPass) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $username;
        $_SESSION['login_time'] = time();

        sendJsonResponse([
            'success' => true,
            'message' => 'Admin authentication successful.',
            'token'   => md5(ADMIN_PASSWORD . date('Y-m-d'))
        ]);
    } else {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid username or password.'
        ], 401);
    }
}

// -------------------------------------------------------------
// 2. ACTION: GET LEADS WITH METRICS & FILTERS
// -------------------------------------------------------------
if ($action === 'get_leads') {
    $where = ["1=1"];
    $params = [];

    $search = trim($_GET['search'] ?? $payload['search'] ?? '');
    if (!empty($search)) {
        $where[] = "(name LIKE :s OR phone LIKE :s OR email LIKE :s OR reference_id LIKE :s OR city LIKE :s OR message LIKE :s)";
        $params[':s'] = "%{$search}%";
    }

    $status = trim($_GET['status'] ?? $payload['status'] ?? '');
    if (!empty($status) && $status !== 'all' && $status !== 'All') {
        $where[] = "status = :st";
        $params[':st'] = $status;
    }

    $procedure = trim($_GET['procedure'] ?? $payload['procedure'] ?? '');
    if (!empty($procedure) && $procedure !== 'all' && $procedure !== 'All') {
        $where[] = "procedure_name LIKE :pr";
        $params[':pr'] = "%{$procedure}%";
    }

    $fromDate = trim($_GET['from_date'] ?? $payload['from_date'] ?? '');
    if (!empty($fromDate)) {
        $where[] = "DATE(created_at) >= :from_date";
        $params[':from_date'] = $fromDate;
    }

    $toDate = trim($_GET['to_date'] ?? $payload['to_date'] ?? '');
    if (!empty($toDate)) {
        $where[] = "DATE(created_at) <= :to_date";
        $params[':to_date'] = $toDate;
    }

    $whereSql = implode(' AND ', $where);
    $limit = min((int)($_GET['limit'] ?? $payload['limit'] ?? 500), 1000);

    try {
        // Compute Metrics
        $total = (int)$pdo->query("SELECT COUNT(*) FROM `leads`")->fetchColumn();
        $today = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE DATE(created_at) = CURDATE()")->fetchColumn();
        $new = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'New'")->fetchColumn();
        $scheduled = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'Scheduled'")->fetchColumn();
        $contacted = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'Contacted'")->fetchColumn();
        $completed = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'Completed'")->fetchColumn();

        // Fetch Leads
        $stmt = $pdo->prepare("SELECT * FROM `leads` WHERE {$whereSql} ORDER BY `id` DESC LIMIT {$limit}");
        $stmt->execute($params);
        $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch distinct procedures for filtering
        $procStmt = $pdo->query("SELECT DISTINCT `procedure_name` FROM `leads` WHERE `procedure_name` IS NOT NULL AND `procedure_name` != '' ORDER BY `procedure_name` ASC");
        $procedures = $procStmt->fetchAll(PDO::FETCH_COLUMN);

        sendJsonResponse([
            'success' => true,
            'metrics' => [
                'total'     => $total,
                'today'     => $today,
                'new'       => $new,
                'scheduled' => $scheduled,
                'contacted' => $contacted,
                'completed' => $completed
            ],
            'procedures' => $procedures,
            'count'      => count($leads),
            'leads'      => $leads
        ]);

    } catch (PDOException $e) {
        sendJsonResponse([
            'success' => false,
            'error'   => 'Database query error: ' . $e->getMessage()
        ], 500);
    }
}

// -------------------------------------------------------------
// 3. ACTION: UPDATE LEAD STATUS
// -------------------------------------------------------------
if ($action === 'update_status') {
    $id = (int)($payload['id'] ?? $payload['lead_id'] ?? $_GET['id'] ?? 0);
    $newStatus = trim($payload['status'] ?? $_GET['status'] ?? '');

    $allowedStatuses = ['New', 'Contacted', 'Scheduled', 'Completed', 'Cancelled'];
    if ($id <= 0 || !in_array($newStatus, $allowedStatuses, true)) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid lead ID or status value.'
        ], 422);
    }

    try {
        $stmt = $pdo->prepare("UPDATE `leads` SET `status` = :status, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = :id");
        $stmt->execute([
            ':status' => $newStatus,
            ':id'     => $id
        ]);

        sendJsonResponse([
            'success'   => true,
            'message'   => "Lead #{$id} status updated to '{$newStatus}'.",
            'lead_id'   => $id,
            'status'    => $newStatus
        ]);
    } catch (PDOException $e) {
        sendJsonResponse([
            'success' => false,
            'error'   => 'Error updating status: ' . $e->getMessage()
        ], 500);
    }
}

// -------------------------------------------------------------
// 4. ACTION: DELETE LEAD
// -------------------------------------------------------------
if ($action === 'delete_lead') {
    $id = (int)($payload['id'] ?? $payload['lead_id'] ?? $_GET['id'] ?? 0);

    if ($id <= 0) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid lead ID.'
        ], 422);
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM `leads` WHERE `id` = :id");
        $stmt->execute([':id' => $id]);

        sendJsonResponse([
            'success' => true,
            'message' => "Lead #{$id} deleted successfully.",
            'lead_id' => $id
        ]);
    } catch (PDOException $e) {
        sendJsonResponse([
            'success' => false,
            'error'   => 'Error deleting lead: ' . $e->getMessage()
        ], 500);
    }
}

// Unknown action
sendJsonResponse([
    'success' => false,
    'message' => "Unknown API action: '{$action}'."
], 400);
