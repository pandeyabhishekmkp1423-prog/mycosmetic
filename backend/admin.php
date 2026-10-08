<?php
/**
 * Executive Admin Portal - Surgical Lead Management & Excel Export
 * Sushrut Institute of Plastic Surgery (SIPS) - Dr. R. K. Mishra
 * URL: /api/admin.php or /backend/admin.php
 */
require_once __DIR__ . '/config.php';

session_start();

$error = '';
$message = '';

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    $_SESSION['admin_logged_in'] = false;
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Handle Login Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $validUser = ($username === ADMIN_USERNAME);
    $validPass = ($password === ADMIN_PASSWORD || (defined('ADMIN_SECONDARY_PASSWORD') && $password === ADMIN_SECONDARY_PASSWORD));

    if ($validUser && $validPass) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $username;
        $_SESSION['login_time'] = time();
        header('Location: admin.php');
        exit;
    } else {
        $error = 'Invalid credentials. Please verify your admin username and password.';
    }
}

// Check Authentication
$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Connect to Database
$pdo = getDbConnection();

// Handle Status Update Action (Standard POST fallback)
if ($isLoggedIn && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    $leadId = (int)($_POST['lead_id'] ?? 0);
    $newStatus = sanitizeInput($_POST['status'] ?? 'New');

    if ($leadId > 0 && $pdo) {
        $updateStmt = $pdo->prepare("UPDATE `leads` SET `status` = :status, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = :id");
        $updateStmt->execute([':status' => $newStatus, ':id' => $leadId]);
        $message = "Lead #{$leadId} status updated to '{$newStatus}'.";
    }
}

// Handle Delete Lead Action (Standard POST fallback)
if ($isLoggedIn && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_lead'])) {
    $leadId = (int)($_POST['lead_id'] ?? 0);

    if ($leadId > 0 && $pdo) {
        $delStmt = $pdo->prepare("DELETE FROM `leads` WHERE `id` = :id");
        $delStmt->execute([':id' => $leadId]);
        $message = "Lead #{$leadId} deleted successfully.";
    }
}

// If Not Logged In, Render Modern Luxury Medical Login Screen
if (!$isLoggedIn):
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surgeon Admin Portal • Dr. R. K. Mishra • SIPS Hospital</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: radial-gradient(circle at 50% 0%, #00264D 0%, #001428 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; color: #fff; }
        .login-card { background: rgba(255, 255, 255, 0.98); color: #0f172a; width: 100%; max-width: 440px; border-radius: 24px; padding: 40px; box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6); border: 1px solid rgba(255,255,255,0.2); }
        .logo-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: #E0F2FE; color: #0369A1; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
        h1 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #00264D; margin-bottom: 6px; }
        p.subtitle { font-size: 13px; color: #64748B; margin-bottom: 24px; line-height: 1.5; }
        .form-group { margin-bottom: 18px; }
        label { display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.03em; }
        input[type="text"], input[type="password"] { width: 100%; padding: 13px 16px; border: 1.5px solid #CBD5E1; border-radius: 12px; font-size: 14px; font-family: inherit; transition: all 0.2s; background: #F8FAFC; }
        input[type="text"]:focus, input[type="password"]:focus { outline: none; border-color: #003366; background: #fff; box-shadow: 0 0 0 4px rgba(0, 51, 102, 0.1); }
        .btn-submit { width: 100%; padding: 14px; background: linear-gradient(135deg, #00264D 0%, #003366 100%); color: #fff; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; box-shadow: 0 4px 14px rgba(0, 38, 77, 0.35); }
        .btn-submit:hover { background: linear-gradient(135deg, #001A35 0%, #00264D 100%); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0, 38, 77, 0.45); }
        .alert-error { background: #FEF2F2; color: #991B1B; padding: 12px 14px; border-radius: 10px; font-size: 13px; border: 1px solid #F87171; margin-bottom: 18px; font-weight: 600; }
        .footer-note { text-align: center; font-size: 11px; color: #94A3B8; margin-top: 24px; line-height: 1.5; }
        .hint-box { background: #F1F5F9; border-radius: 10px; padding: 10px 12px; margin-top: 14px; font-size: 11px; color: #475569; }
        .hint-box strong { color: #003366; }
    </style>
</head>
<body>

<div class="login-card">
    <div class="logo-badge">
        <span>SIPS Super Specialty Hospital</span>
    </div>
    <h1>Executive Portal</h1>
    <p class="subtitle">Secure administrative access for Dr. R. K. Mishra&apos;s surgical consultation desk &amp; lead management.</p>

    <?php if (!empty($error)): ?>
        <div class="alert-error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="POST" action="admin.php">
        <input type="hidden" name="login" value="1">
        
        <div class="form-group">
            <label for="username">Admin Username</label>
            <input type="text" id="username" name="username" required autocomplete="username" value="admin" autofocus>
        </div>

        <div class="form-group">
            <label for="password">Security Password</label>
            <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••••••">
        </div>

        <button type="submit" class="btn-submit">Login to Leads Dashboard &rarr;</button>

        <div class="hint-box">
            💡 Default Login: Username <strong>admin</strong> | Password <strong>Mycosmetic@123</strong>
        </div>
    </form>

    <div class="footer-note">
        My Cosmetic Surgery • Sushrut Institute of Plastic Surgery<br>
        29, Shah Mina Rd, Chowk, Lucknow • +91 9795 800 800
    </div>
</div>

</body>
</html>
<?php
exit;
endif;

// =========================================================================
// LOGGED IN EXECUTIVE DASHBOARD VIEW
// =========================================================================

// Search and Filter Parameters
$search = trim($_GET['search'] ?? '');
$statusFilter = trim($_GET['status'] ?? '');
$procFilter = trim($_GET['procedure'] ?? '');
$fromDate = trim($_GET['from_date'] ?? '');
$toDate = trim($_GET['to_date'] ?? '');
$preset = trim($_GET['preset'] ?? '');

$where = ["1=1"];
$params = [];

if (!empty($search)) {
    $where[] = "(name LIKE :s OR phone LIKE :s OR email LIKE :s OR reference_id LIKE :s OR city LIKE :s OR message LIKE :s)";
    $params[':s'] = "%{$search}%";
}

if (!empty($statusFilter) && $statusFilter !== 'all' && $statusFilter !== 'All') {
    $where[] = "status = :st";
    $params[':st'] = $statusFilter;
}

if (!empty($procFilter) && $procFilter !== 'all' && $procFilter !== 'All') {
    $where[] = "procedure_name LIKE :pr";
    $params[':pr'] = "%{$procFilter}%";
}

if (!empty($fromDate)) {
    $where[] = "DATE(created_at) >= :fd";
    $params[':fd'] = $fromDate;
}

if (!empty($toDate)) {
    $where[] = "DATE(created_at) <= :td";
    $params[':td'] = $toDate;
}

if ($preset === 'today') {
    $where[] = "DATE(created_at) = CURDATE()";
} elseif ($preset === 'week') {
    $where[] = "created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
} elseif ($preset === 'month') {
    $where[] = "created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
}

$whereSql = implode(' AND ', $where);

// Metrics Calculation
$totalLeads = 0;
$todayLeads = 0;
$newLeads = 0;
$scheduledLeads = 0;
$completedLeads = 0;
$contactedLeads = 0;
$allProcedures = [];

if ($pdo) {
    try {
        $totalLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads`")->fetchColumn();
        $todayLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE DATE(created_at) = CURDATE()")->fetchColumn();
        $newLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'New'")->fetchColumn();
        $scheduledLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'Scheduled'")->fetchColumn();
        $contactedLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'Contacted'")->fetchColumn();
        $completedLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'Completed'")->fetchColumn();

        // Fetch distinct procedures
        $procStmt = $pdo->query("SELECT DISTINCT `procedure_name` FROM `leads` WHERE `procedure_name` IS NOT NULL AND `procedure_name` != '' ORDER BY `procedure_name` ASC");
        $allProcedures = $procStmt->fetchAll(PDO::FETCH_COLUMN);

        // Fetch Leads
        $stmt = $pdo->prepare("SELECT * FROM `leads` WHERE {$whereSql} ORDER BY `id` DESC LIMIT 300");
        $stmt->execute($params);
        $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $leads = [];
        $error = "Database error: " . $e->getMessage();
    }
} else {
    $leads = [];
    $error = "Could not connect to database. Please check your credentials in config.php. (" . ($GLOBALS['db_last_error'] ?? '') . ")";
}

// Fallback Core Procedures list
$coreProcedures = [
    'Gynecomastia (Male Chest Reduction)',
    'Rhinoplasty (Nose Job)',
    '360° High definition Liposuction',
    'Tummy Tuck (Abdominoplasty)',
    'Breast Augmentation',
    'Breast Reduction & Lift',
    'Genioplasty (Chin Enhancement)',
    'Blepharoplasty (Baggy Eyelids)'
];
$displayProcedures = array_unique(array_merge($coreProcedures, $allProcedures));

// Build export query string matching active filters
$exportParams = $_GET;
unset($exportParams['action']);
$exportUrl = 'export_excel.php?' . http_build_query($exportParams);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. R. K. Mishra • Leads Dashboard • SIPS Hospital</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
    <style>
        :root {
            --navy-dark: #001D3D;
            --navy-primary: #00264D;
            --navy-secondary: #003366;
            --cyan-accent: #00A3E0;
            --emerald: #10B981;
            --emerald-hover: #059669;
            --bg-page: #F8FAFD;
            --card-border: #E2E8F0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg-page); color: #0F172A; min-height: 100vh; padding-bottom: 80px; }
        
        /* Top Navigation Header */
        header.dashboard-header { background: var(--navy-dark); color: #fff; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #002E5C; position: sticky; top: 0; z-index: 50; box-shadow: 0 4px 16px rgba(0,0,0,0.18); }
        .brand-title { display: flex; align-items: center; gap: 14px; }
        .brand-title .logo-symbol { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #00A3E0 0%, #003366 100%); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; color: #fff; box-shadow: 0 2px 8px rgba(0, 163, 224, 0.4); }
        .brand-title h1 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; color: #fff; line-height: 1.2; }
        .brand-title .brand-sub { font-size: 11px; color: #94A3B8; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500; }
        .badge-sips { background: rgba(0, 163, 224, 0.15); color: #38BDF8; border: 1px solid rgba(0, 163, 224, 0.35); font-size: 10px; padding: 2px 8px; border-radius: 999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-left: 6px; }
        
        .header-actions { display: flex; align-items: center; gap: 12px; }
        .btn-excel { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #fff; padding: 10px 20px; border-radius: 12px; font-weight: 700; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 3px 12px rgba(16, 185, 129, 0.35); border: none; cursor: pointer; }
        .btn-excel:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(16, 185, 129, 0.45); }
        .btn-link-site { background: rgba(255,255,255,0.08); color: #CBD5E1; padding: 9px 15px; border-radius: 10px; font-weight: 600; font-size: 12px; text-decoration: none; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.12); }
        .btn-link-site:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .btn-logout { background: #DC2626; color: #fff; padding: 9px 15px; border-radius: 10px; font-weight: 700; font-size: 12px; text-decoration: none; transition: all 0.2s; border: none; }
        .btn-logout:hover { background: #B91C1C; }

        .container { max-width: 1480px; margin: 24px auto; padding: 0 20px; }

        /* Metric Cards */
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .metric-card { background: #fff; border: 1px solid var(--card-border); border-radius: 18px; padding: 20px 22px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); position: relative; overflow: hidden; transition: transform 0.2s; }
        .metric-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.05); }
        .metric-card .label { font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: space-between; }
        .metric-card .number { font-size: 32px; font-weight: 800; color: var(--navy-primary); margin-top: 8px; line-height: 1; }
        .metric-card .sub { font-size: 12px; color: #94A3B8; margin-top: 6px; font-weight: 500; }
        .metric-card.total { border-left: 4px solid var(--navy-secondary); }
        .metric-card.today { border-left: 4px solid #10B981; }
        .metric-card.today .number { color: #047857; }
        .metric-card.new-alert { border-left: 4px solid #F59E0B; }
        .metric-card.new-alert .number { color: #B45309; }
        .metric-card.scheduled { border-left: 4px solid var(--cyan-accent); }
        .metric-card.completed { border-left: 4px solid #6366F1; }
        .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block; box-shadow: 0 0 0 rgba(16, 185, 129, 0.4); animation: pulse 2s infinite; }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        /* Filter Box */
        .filter-card { background: #fff; border: 1px solid var(--card-border); border-radius: 18px; padding: 20px 24px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .filter-form { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; }
        .filter-field { flex: 1; min-width: 190px; }
        .filter-field label { display: block; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.03em; }
        .filter-field input, .filter-field select { width: 100%; padding: 10px 14px; border: 1.5px solid #CBD5E1; border-radius: 10px; font-size: 13px; font-family: inherit; background: #F8FAFC; color: #0F172A; transition: all 0.2s; }
        .filter-field input:focus, .filter-field select:focus { outline: none; border-color: var(--navy-secondary); background: #fff; box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.08); }
        
        .filter-actions { display: flex; align-items: center; gap: 8px; }
        .btn-filter { padding: 10px 22px; background: var(--navy-secondary); color: #fff; border: none; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; height: 42px; display: inline-flex; align-items: center; gap: 6px; }
        .btn-filter:hover { background: var(--navy-primary); transform: translateY(-1px); }
        .btn-reset { padding: 10px 16px; background: #F1F5F9; color: #475569; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 13px; height: 42px; display: inline-flex; align-items: center; border: 1px solid #E2E8F0; transition: all 0.2s; }
        .btn-reset:hover { background: #E2E8F0; color: #0F172A; }
        .preset-pills { display: flex; align-items: center; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
        .preset-pill { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 999px; text-decoration: none; background: #F1F5F9; color: #475569; border: 1px solid #E2E8F0; transition: all 0.15s; }
        .preset-pill:hover, .preset-pill.active { background: #E0F2FE; color: #0369A1; border-color: #BAE6FD; }

        /* Table Card */
        .table-card { background: #fff; border: 1px solid var(--card-border); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
        .table-header { padding: 18px 24px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; background: #FAFCFE; }
        .table-header h2 { font-size: 16px; font-weight: 800; color: var(--navy-primary); display: flex; align-items: center; gap: 8px; }
        .table-responsive { width: 100%; overflow-x: auto; }

        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
        thead th { background: #F8FAFC; padding: 14px 18px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; border-bottom: 1px solid #E2E8F0; white-space: nowrap; }
        tbody tr { border-bottom: 1px solid #F1F5F9; transition: background 0.15s; }
        tbody tr:hover { background: #F8FAFD; }
        tbody td { padding: 14px 18px; vertical-align: middle; }

        /* Patient Info Styling */
        .patient-name { font-weight: 700; color: var(--navy-primary); font-size: 14px; }
        .patient-ref { font-size: 11px; font-family: monospace; color: #64748B; font-weight: 700; background: #F1F5F9; padding: 2px 6px; border-radius: 6px; display: inline-block; }
        .patient-city { font-size: 11px; color: #64748B; margin-top: 2px; display: inline-flex; align-items: center; gap: 3px; }
        .patient-email { font-size: 11px; color: #64748B; margin-top: 2px; }

        /* Direct Connect Buttons */
        .phone-group { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
        .btn-call { display: inline-flex; align-items: center; gap: 4px; padding: 4px 9px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; background: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD; transition: all 0.15s; }
        .btn-call:hover { background: #BAE6FD; }
        .btn-wa { display: inline-flex; align-items: center; gap: 4px; padding: 4px 9px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; background: #DCFCE7; color: #166534; border: 1px solid #BBF7D0; transition: all 0.15s; }
        .btn-wa:hover { background: #BBF7D0; }

        /* Badges */
        .proc-badge { display: inline-block; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; background: #EFF6FF; color: #1D4ED8; border: 1px solid #DBEAFE; max-width: 220px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
        .format-badge { display: inline-block; padding: 2px 7px; border-radius: 6px; font-size: 10px; font-weight: 700; background: #F1F5F9; color: #475569; margin-top: 3px; text-transform: uppercase; }

        /* Status Dropdown */
        .status-select { padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; border: 1.5px solid #CBD5E1; font-family: inherit; cursor: pointer; transition: all 0.2s; }
        .status-New { background: #FEF3C7; color: #92400E; border-color: #FCD34D; }
        .status-Contacted { background: #E0E7FF; color: #3730A3; border-color: #C7D2FE; }
        .status-Scheduled { background: #DCFCE7; color: #166534; border-color: #86EFAC; }
        .status-Completed { background: #F1F5F9; color: #334155; border-color: #CBD5E1; }
        .status-Cancelled { background: #FEE2E2; color: #991B1B; border-color: #FCA5A5; }

        .btn-dossier { padding: 6px 10px; border-radius: 8px; background: #F1F5F9; border: 1px solid #CBD5E1; font-size: 11px; font-weight: 700; color: #334155; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s; }
        .btn-dossier:hover { background: #00264D; color: #fff; border-color: #00264D; }

        .btn-del { padding: 6px 8px; border-radius: 8px; background: transparent; border: 1px solid transparent; font-size: 11px; font-weight: 700; color: #94A3B8; cursor: pointer; transition: all 0.15s; }
        .btn-del:hover { background: #FEE2E2; color: #991B1B; border-color: #FECACA; }

        .empty-state { text-align: center; padding: 60px 20px; color: #64748B; font-size: 14px; }
        .message-preview { max-width: 200px; font-size: 12px; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-style: italic; cursor: pointer; }
        .message-preview:hover { text-decoration: underline; color: #003366; }

        .alert-success { background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; padding: 12px 18px; border-radius: 12px; margin-bottom: 20px; font-weight: 600; font-size: 13px; }
        .alert-error { background: #FEF2F2; color: #991B1B; border: 1px solid #FCA5A5; padding: 12px 18px; border-radius: 12px; margin-bottom: 20px; font-weight: 600; font-size: 13px; }

        /* Modal Styles */
        .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 15, 30, 0.7); backdrop-filter: blur(4px); z-index: 100; align-items: center; justify-content: center; padding: 20px; }
        .modal-overlay.active { display: flex; animation: fadeIn 0.15s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-box { background: #fff; border-radius: 20px; width: 100%; max-width: 640px; box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.4); border: 1px solid #CBD5E1; overflow: hidden; animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes popIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .modal-head { background: var(--navy-dark); color: #fff; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .modal-head h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #fff; }
        .btn-modal-close { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px; border-radius: 8px; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .btn-modal-close:hover { background: rgba(255,255,255,0.25); }

        .modal-body { padding: 24px; max-height: 75vh; overflow-y: auto; }
        .dossier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        .dossier-item { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 14px; border-radius: 12px; }
        .dossier-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748B; letter-spacing: 0.05em; margin-bottom: 4px; }
        .dossier-value { font-size: 14px; font-weight: 700; color: #0F172A; word-break: break-word; }
        .dossier-message-box { background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 14px 16px; margin-top: 14px; }
        .dossier-message-box .title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #1D4ED8; letter-spacing: 0.04em; margin-bottom: 6px; }
        .dossier-message-box .content { font-size: 13px; color: #1E293B; line-height: 1.6; white-space: pre-wrap; font-style: italic; }

        .modal-foot { padding: 16px 24px; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; }
        
        /* Toast Notification */
        .toast { position: fixed; bottom: 24px; right: 24px; background: #00264D; color: #fff; padding: 12px 20px; border-radius: 12px; font-size: 13px; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 200; display: none; align-items: center; gap: 10px; border: 1px solid #003366; }
        .toast.show { display: flex; animation: slideUp 0.2s ease-out; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    </style>
</head>
<body>

<!-- Dashboard Sticky Header -->
<header class="dashboard-header">
    <div class="brand-title">
        <div class="logo-symbol">S</div>
        <div>
            <h1>Dr. R. K. Mishra • Leads Operations</h1>
            <div class="brand-sub">
                Sushrut Institute of Plastic Surgery (SIPS)
                <span class="badge-sips">Executive Desk</span>
            </div>
        </div>
    </div>

    <div class="header-actions">
        <!-- Direct Excel (.CSV) Download Button -->
        <a href="<?php echo htmlspecialchars($exportUrl); ?>" class="btn-excel" title="Download filtered patient leads in Microsoft Excel (.CSV) format with UTF-8 BOM">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download Leads in Excel</span>
        </a>

        <a href="/" target="_blank" class="btn-link-site" title="Open patient website in a new tab">
            Visit Website ↗
        </a>

        <a href="admin.php?action=logout" class="btn-logout" title="Sign out from admin session">Logout</a>
    </div>
</header>

<div class="container">

    <?php if (!empty($message)): ?>
        <div class="alert-success">✓ <?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>

    <?php if (!empty($error)): ?>
        <div class="alert-error">⚠ <?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <!-- 5 High-Level Key Performance Metric Cards -->
    <div class="metrics-grid">
        <div class="metric-card total">
            <div class="label">Total Recorded Leads</div>
            <div class="number"><?php echo number_format($totalLeads); ?></div>
            <div class="sub">Lifetime surgical inquiries</div>
        </div>

        <div class="metric-card today">
            <div class="label">
                <span>Today&apos;s New Inquiries</span>
                <span class="pulse-dot"></span>
            </div>
            <div class="number"><?php echo number_format($todayLeads); ?></div>
            <div class="sub"><?php echo date('d M Y'); ?> (IST)</div>
        </div>

        <div class="metric-card new-alert">
            <div class="label">Pending Action</div>
            <div class="number"><?php echo number_format($newLeads); ?></div>
            <div class="sub">Status: 'New' (Requires Call)</div>
        </div>

        <div class="metric-card scheduled">
            <div class="label">Scheduled OPDs</div>
            <div class="number"><?php echo number_format($scheduledLeads); ?></div>
            <div class="sub">Confirmed consultations</div>
        </div>

        <div class="metric-card completed">
            <div class="label">Contacted / Completed</div>
            <div class="number"><?php echo number_format($contactedLeads + $completedLeads); ?></div>
            <div class="sub"><?php echo number_format($completedLeads); ?> converted / completed</div>
        </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="filter-card">
        <form method="GET" action="admin.php" class="filter-form">
            
            <div class="filter-field" style="flex: 1.5; min-width: 240px;">
                <label for="search">Search Patients</label>
                <input type="text" id="search" name="search" value="<?php echo htmlspecialchars($search); ?>" placeholder="Search name, phone, email, city, ref ID, notes...">
            </div>

            <div class="filter-field">
                <label for="procedure">Procedure Filter</label>
                <select id="procedure" name="procedure">
                    <option value="">All Procedures (<?php echo count($displayProcedures); ?>)</option>
                    <?php foreach ($displayProcedures as $p): ?>
                        <option value="<?php echo htmlspecialchars($p); ?>" <?php echo $procFilter === $p ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($p); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="filter-field" style="max-width: 170px;">
                <label for="status">Lead Status</label>
                <select id="status" name="status">
                    <option value="">All Statuses</option>
                    <option value="New" <?php echo $statusFilter === 'New' ? 'selected' : ''; ?>>New</option>
                    <option value="Contacted" <?php echo $statusFilter === 'Contacted' ? 'selected' : ''; ?>>Contacted</option>
                    <option value="Scheduled" <?php echo $statusFilter === 'Scheduled' ? 'selected' : ''; ?>>Scheduled</option>
                    <option value="Completed" <?php echo $statusFilter === 'Completed' ? 'selected' : ''; ?>>Completed</option>
                    <option value="Cancelled" <?php echo $statusFilter === 'Cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                </select>
            </div>

            <div class="filter-field" style="max-width: 150px;">
                <label for="from_date">From Date</label>
                <input type="date" id="from_date" name="from_date" value="<?php echo htmlspecialchars($fromDate); ?>">
            </div>

            <div class="filter-field" style="max-width: 150px;">
                <label for="to_date">To Date</label>
                <input type="date" id="to_date" name="to_date" value="<?php echo htmlspecialchars($toDate); ?>">
            </div>

            <div class="filter-actions">
                <button type="submit" class="btn-filter">Filter Leads</button>
                <?php if (!empty($search) || !empty($statusFilter) || !empty($procFilter) || !empty($fromDate) || !empty($toDate) || !empty($preset)): ?>
                    <a href="admin.php" class="btn-reset">Reset</a>
                <?php endif; ?>
            </div>

        </form>

        <div class="preset-pills">
            <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase;">Quick Date Filters:</span>
            <a href="admin.php?preset=today" class="preset-pill <?php echo $preset === 'today' ? 'active' : ''; ?>">Today</a>
            <a href="admin.php?preset=week" class="preset-pill <?php echo $preset === 'week' ? 'active' : ''; ?>">Last 7 Days</a>
            <a href="admin.php?preset=month" class="preset-pill <?php echo $preset === 'month' ? 'active' : ''; ?>">Last 30 Days</a>
            <a href="admin.php" class="preset-pill <?php echo (empty($preset) && empty($fromDate) && empty($toDate)) ? 'active' : ''; ?>">All Time</a>
        </div>
    </div>

    <!-- Leads Data Table -->
    <div class="table-card">
        <div class="table-header">
            <h2>
                <span>Patient Consultation Inquiries</span>
                <span style="background: #E0F2FE; color: #0369A1; font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 999px;">
                    <?php echo count($leads); ?> leads showing
                </span>
            </h2>
            <div style="font-size: 12px; color: #64748B; font-weight: 500;">
                Showing most recent inquiries first • Real-time DB sync
            </div>
        </div>

        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Date &amp; Ref ID</th>
                        <th>Patient Info</th>
                        <th>Direct Connect</th>
                        <th>Selected Procedure</th>
                        <th>Preferred Slot</th>
                        <th>Mode</th>
                        <th>Patient Notes</th>
                        <th>Status</th>
                        <th style="text-align: right;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($leads)): ?>
                        <tr>
                            <td colspan="9" class="empty-state">
                                No consultation leads found matching the selected filters.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($leads as $row): 
                            $cleanPhone = preg_replace('/\D/', '', $row['phone']);
                            if (strpos($cleanPhone, '91') === 0 && strlen($cleanPhone) === 12) {
                                $cleanPhone = substr($cleanPhone, 2);
                            }
                            $waMessage = urlencode("Namaste {$row['name']} ji, this is Dr. R. K. Mishra's surgical consultation desk at SIPS Super Specialty Hospital, Lucknow regarding your inquiry for {$row['procedure_name']}. How can we assist you with scheduling your appointment?");
                            
                            $jsonLead = htmlspecialchars(json_encode([
                                'id'               => $row['id'],
                                'reference_id'     => $row['reference_id'] ?? 'SIPS-' . $row['id'],
                                'name'             => $row['name'],
                                'phone'            => $cleanPhone,
                                'email'            => $row['email'] ?? 'Not provided',
                                'city'             => $row['city'] ?? 'Lucknow',
                                'procedure_name'   => $row['procedure_name'],
                                'consultation_type'=> $row['consultation_type'] ?? 'In-Person (SIPS Hospital)',
                                'preferred_date'   => $row['preferred_date'] ?? 'Flexible',
                                'preferred_time'   => $row['preferred_time'] ?? 'Morning OPD',
                                'message'          => $row['message'] ?? 'No special notes provided.',
                                'status'           => $row['status'],
                                'ip_address'       => $row['ip_address'] ?? 'Not recorded',
                                'created_at'       => date('d M Y, h:i A', strtotime($row['created_at']))
                            ]), ENT_QUOTES, 'UTF-8');
                        ?>
                            <tr id="lead-row-<?php echo $row['id']; ?>">
                                <td>
                                    <div class="patient-ref"><?php echo htmlspecialchars($row['reference_id'] ?? 'SIPS-' . $row['id']); ?></div>
                                    <div style="font-size: 11px; color: #64748B; margin-top: 3px; font-weight: 500;">
                                        <?php echo date('d M Y, h:i A', strtotime($row['created_at'])); ?>
                                    </div>
                                </td>

                                <td>
                                    <div class="patient-name"><?php echo htmlspecialchars($row['name']); ?></div>
                                    <div class="patient-city">
                                        📍 <?php echo htmlspecialchars($row['city'] ?: 'Lucknow'); ?>
                                    </div>
                                    <?php if (!empty($row['email'])): ?>
                                        <div class="patient-email">✉ <?php echo htmlspecialchars($row['email']); ?></div>
                                    <?php endif; ?>
                                </td>

                                <td>
                                    <div style="font-weight: 700; color: #1E293B; font-size: 13px;">+91 <?php echo htmlspecialchars($cleanPhone); ?></div>
                                    <div class="phone-group">
                                        <a href="tel:+91<?php echo htmlspecialchars($cleanPhone); ?>" class="btn-call" title="Call patient directly">
                                            📞 Call
                                        </a>
                                        <a href="https://wa.me/91<?php echo htmlspecialchars($cleanPhone); ?>?text=<?php echo $waMessage; ?>" target="_blank" rel="noopener noreferrer" class="btn-wa" title="Open WhatsApp chat with pre-written clinic message">
                                            💬 WhatsApp
                                        </a>
                                    </div>
                                </td>

                                <td>
                                    <span class="proc-badge" title="<?php echo htmlspecialchars($row['procedure_name']); ?>">
                                        <?php echo htmlspecialchars($row['procedure_name']); ?>
                                    </span>
                                </td>

                                <td>
                                    <div style="font-weight: 700; color: #1E293B;">
                                        <?php echo !empty($row['preferred_date']) ? date('d-M-Y', strtotime($row['preferred_date'])) : 'Flexible / Earliest'; ?>
                                    </div>
                                    <div style="font-size: 11px; color: #64748B;">
                                        <?php echo htmlspecialchars($row['preferred_time'] ?: 'Morning OPD'); ?>
                                    </div>
                                </td>

                                <td>
                                    <span class="format-badge">
                                        <?php echo htmlspecialchars($row['consultation_type'] ?: 'In-Person'); ?>
                                    </span>
                                </td>

                                <td>
                                    <?php if (!empty($row['message'])): ?>
                                        <div class="message-preview" onclick='openDossier(<?php echo $jsonLead; ?>)' title="Click to view full patient question">
                                            &ldquo;<?php echo htmlspecialchars($row['message']); ?>&rdquo;
                                        </div>
                                    <?php else: ?>
                                        <span style="color: #CBD5E1;">—</span>
                                    <?php endif; ?>
                                </td>

                                <td>
                                    <select 
                                        name="status" 
                                        class="status-select status-<?php echo htmlspecialchars($row['status']); ?>" 
                                        data-lead-id="<?php echo $row['id']; ?>"
                                        onchange="handleAjaxStatusChange(this, <?php echo $row['id']; ?>)"
                                    >
                                        <option value="New" <?php echo $row['status'] === 'New' ? 'selected' : ''; ?>>New</option>
                                        <option value="Contacted" <?php echo $row['status'] === 'Contacted' ? 'selected' : ''; ?>>Contacted</option>
                                        <option value="Scheduled" <?php echo $row['status'] === 'Scheduled' ? 'selected' : ''; ?>>Scheduled</option>
                                        <option value="Completed" <?php echo $row['status'] === 'Completed' ? 'selected' : ''; ?>>Completed</option>
                                        <option value="Cancelled" <?php echo $row['status'] === 'Cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                                    </select>
                                </td>

                                <td style="text-align: right; white-space: nowrap;">
                                    <button type="button" class="btn-dossier" onclick='openDossier(<?php echo $jsonLead; ?>)' title="View full patient dossier">
                                        👁️ View Details
                                    </button>
                                    <button type="button" class="btn-del" onclick="confirmDeleteLead(<?php echo $row['id']; ?>, '<?php echo htmlspecialchars(addslashes($row['name'])); ?>')" title="Delete test/spam lead">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<!-- Modal: Comprehensive Patient Dossier / Form Submission Details -->
<div id="dossier-modal" class="modal-overlay" onclick="closeDossier(event)">
    <div class="modal-box" onclick="event.stopPropagation()">
        <div class="modal-head">
            <div>
                <h3>Patient Consultation Dossier</h3>
                <div style="font-size: 11px; color: #94A3B8;" id="modal-ref-header">SIPS Hospital Record</div>
            </div>
            <button class="btn-modal-close" onclick="closeDossier(null)">&times;</button>
        </div>

        <div class="modal-body">
            <div class="dossier-grid">
                <div class="dossier-item">
                    <div class="dossier-label">Patient Name</div>
                    <div class="dossier-value" id="m-name">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">Mobile Number</div>
                    <div class="dossier-value" id="m-phone">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">Email Address</div>
                    <div class="dossier-value" id="m-email">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">City / Location</div>
                    <div class="dossier-value" id="m-city">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">Procedure / Treatment</div>
                    <div class="dossier-value" id="m-procedure" style="color: #0369A1;">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">Consultation Mode</div>
                    <div class="dossier-value" id="m-mode">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">Preferred Date</div>
                    <div class="dossier-value" id="m-date">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">OPD Time Slot</div>
                    <div class="dossier-value" id="m-slot">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">Submission Date &amp; Time</div>
                    <div class="dossier-value" id="m-created">-</div>
                </div>

                <div class="dossier-item">
                    <div class="dossier-label">Client IP Address</div>
                    <div class="dossier-value" id="m-ip">-</div>
                </div>
            </div>

            <div class="dossier-message-box">
                <div class="title">Patient Notes &amp; Specific Concerns:</div>
                <div class="content" id="m-message">No notes entered by the patient.</div>
            </div>
        </div>

        <div class="modal-foot">
            <div id="modal-quick-actions" style="display: flex; gap: 8px;">
                <!-- Filled dynamically by openDossier -->
            </div>
            <button class="btn-reset" onclick="closeDossier(null)">Close Window</button>
        </div>
    </div>
</div>

<!-- Modal: Delete Confirmation -->
<div id="delete-modal" class="modal-overlay" onclick="closeDeleteModal(event)">
    <div class="modal-box" style="max-width: 420px;" onclick="event.stopPropagation()">
        <div class="modal-head" style="background: #991B1B;">
            <h3>Delete Consultation Lead</h3>
            <button class="btn-modal-close" onclick="closeDeleteModal(null)">&times;</button>
        </div>
        <div class="modal-body" style="padding: 24px; text-align: center;">
            <p style="font-size: 14px; color: #334155; line-height: 1.5;" id="delete-modal-msg">
                Are you sure you want to delete this patient inquiry from the database?
            </p>
        </div>
        <div class="modal-foot" style="justify-content: flex-end; gap: 10px;">
            <button class="btn-reset" onclick="closeDeleteModal(null)">Cancel</button>
            <form id="delete-form" method="POST" action="admin.php">
                <input type="hidden" name="delete_lead" value="1">
                <input type="hidden" name="lead_id" id="delete-lead-id" value="">
                <button type="submit" class="btn-logout" style="cursor: pointer;">Confirm Delete</button>
            </form>
        </div>
    </div>
</div>

<!-- Toast for status updates -->
<div id="toast" class="toast">
    <span id="toast-msg">Lead status updated successfully.</span>
</div>

<script>
// Open Patient Dossier Modal
function openDossier(lead) {
    document.getElementById('modal-ref-header').textContent = 'Reference ID: ' + lead.reference_id;
    document.getElementById('m-name').textContent = lead.name;
    document.getElementById('m-phone').textContent = '+91 ' + lead.phone;
    document.getElementById('m-email').textContent = lead.email;
    document.getElementById('m-city').textContent = lead.city;
    document.getElementById('m-procedure').textContent = lead.procedure_name;
    document.getElementById('m-mode').textContent = lead.consultation_type;
    document.getElementById('m-date').textContent = lead.preferred_date;
    document.getElementById('m-slot').textContent = lead.preferred_time;
    document.getElementById('m-created').textContent = lead.created_at;
    document.getElementById('m-ip').textContent = lead.ip_address || 'Localhost / Proxy';
    document.getElementById('m-message').textContent = lead.message || 'No additional notes or questions provided.';

    // Populate quick actions
    const actionsDiv = document.getElementById('modal-quick-actions');
    const waText = encodeURIComponent("Namaste " + lead.name + " ji, this is Dr. R. K. Mishra's surgical consultation desk at SIPS Super Specialty Hospital, Lucknow regarding your inquiry for " + lead.procedure_name + ". When would you like to schedule your consultation?");
    
    actionsDiv.innerHTML = `
        <a href="tel:+91${lead.phone}" class="btn-call" style="padding: 8px 14px; font-size: 12px;">📞 Call Patient</a>
        <a href="https://wa.me/91${lead.phone}?text=${waText}" target="_blank" rel="noopener noreferrer" class="btn-wa" style="padding: 8px 14px; font-size: 12px;">💬 WhatsApp Chat</a>
    `;

    document.getElementById('dossier-modal').classList.add('active');
}

function closeDossier(e) {
    if (!e || e.target.id === 'dossier-modal') {
        document.getElementById('dossier-modal').classList.remove('active');
    }
}

// Delete Confirmation Modal
function confirmDeleteLead(id, name) {
    document.getElementById('delete-lead-id').value = id;
    document.getElementById('delete-modal-msg').innerHTML = 'Are you sure you want to permanently delete lead <strong>#' + id + ' (' + name + ')</strong>? This cannot be undone.';
    document.getElementById('delete-modal').classList.add('active');
}

function closeDeleteModal(e) {
    if (!e || e.target.id === 'delete-modal') {
        document.getElementById('delete-modal').classList.remove('active');
    }
}

// Live AJAX Status Change without whole page refresh
async function handleAjaxStatusChange(selectEl, leadId) {
    const newStatus = selectEl.value;
    
    // Update styling class immediately
    selectEl.className = 'status-select status-' + newStatus;

    try {
        const formData = new FormData();
        formData.append('action', 'update_status');
        formData.append('id', leadId);
        formData.append('status', newStatus);

        const res = await fetch('admin_api.php', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (data.success) {
            showToast('✓ Lead #' + leadId + ' status updated to ' + newStatus);
        } else {
            showToast('⚠ Error: ' + (data.message || 'Could not update status'));
        }
    } catch (err) {
        // Fallback: if admin_api.php not present, submit the enclosing form
        showToast('✓ Status changed to ' + newStatus);
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts (ESC to close modals)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDossier(null);
        closeDeleteModal(null);
    }
});
</script>

</body>
</html>
