<?php
/**
 * Executive Admin Panel - Lead Management & Excel Export
 * Sushrut Institute of Plastic Surgery (SIPS) - Dr. R. K. Mishra
 * URL: https://yourdomain.com/api/admin.php
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

    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
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

// Handle Status Update Action
if ($isLoggedIn && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    $leadId = (int)($_POST['lead_id'] ?? 0);
    $newStatus = sanitizeInput($_POST['status'] ?? 'New');

    if ($leadId > 0 && $pdo) {
        $updateStmt = $pdo->prepare("UPDATE `leads` SET `status` = :status WHERE `id` = :id");
        $updateStmt->execute([':status' => $newStatus, ':id' => $leadId]);
        $message = "Lead #{$leadId} status updated to '{$newStatus}'.";
    }
}

// If Not Logged In, Render Modern Luxury Login Screen
if (!$isLoggedIn):
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal Login • Dr. R. K. Mishra</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: radial-gradient(circle at 50% 0%, #00264D 0%, #001428 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; color: #fff; }
        .login-card { background: rgba(255, 255, 255, 0.98); color: #0f172a; width: 100%; max-width: 440px; border-radius: 24px; padding: 40px; box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6); border: 1px solid rgba(255,255,255,0.2); }
        .logo-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: #E0F2FE; color: #0369A1; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
        h1 { font-size: 22px; font-weight: 800; color: #00264D; margin-bottom: 6px; }
        p.subtitle { font-size: 13px; color: #64748B; margin-bottom: 24px; line-height: 1.5; }
        .form-group { margin-bottom: 18px; }
        label { display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.03em; }
        input[type="text"], input[type="password"] { width: 100%; padding: 13px 16px; border: 1.5px solid #CBD5E1; border-radius: 12px; font-size: 14px; font-family: inherit; transition: all 0.2s; background: #F8FAFC; }
        input[type="text"]:focus, input[type="password"]:focus { outline: none; border-color: #003366; background: #fff; box-shadow: 0 0 0 4px rgba(0, 51, 102, 0.1); }
        .btn-submit { width: 100%; padding: 14px; background: linear-gradient(135deg, #00264D 0%, #003366 100%); color: #fff; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; box-shadow: 0 4px 14px rgba(0, 38, 77, 0.35); }
        .btn-submit:hover { background: linear-gradient(135deg, #001A35 0%, #00264D 100%); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0, 38, 77, 0.45); }
        .alert-error { background: #FEF2F2; color: #991B1B; padding: 12px 14px; border-radius: 10px; font-size: 13px; border: 1px solid #F87171; margin-bottom: 18px; font-weight: 600; }
        .footer-note { text-align: center; font-size: 11px; color: #94A3B8; margin-top: 24px; }
    </style>
</head>
<body>

<div class="login-card">
    <div class="logo-badge">
        <span>SIPS Super Specialty Hospital</span>
    </div>
    <h1>Surgeon Portal</h1>
    <p class="subtitle">Secure administrative access for Dr. R. K. Mishra&apos;s surgical consultation desk.</p>

    <?php if (!empty($error)): ?>
        <div class="alert-error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="POST" action="admin.php">
        <input type="hidden" name="login" value="1">
        
        <div class="form-group">
            <label for="username">Admin Username</label>
            <input type="text" id="username" name="username" required autocomplete="username" placeholder="admin" autofocus>
        </div>

        <div class="form-group">
            <label for="password">Security Password</label>
            <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••••••">
        </div>

        <button type="submit" class="btn-submit">Login to Lead Management &rarr;</button>
    </form>

    <div class="footer-note">
        My Cosmetic Surgery • SIPS Hospital, Shah Mina Rd, Lucknow
    </div>
</div>

</body>
</html>
<?php
exit;
endif;

// =========================================================================
// LOGGED IN DASHBOARD VIEW
// =========================================================================

// Search and Filter Handling
$search = trim($_GET['search'] ?? '');
$statusFilter = trim($_GET['status'] ?? '');
$procFilter = trim($_GET['procedure'] ?? '');

$where = ["1=1"];
$params = [];

if (!empty($search)) {
    $where[] = "(name LIKE :s OR phone LIKE :s OR email LIKE :s OR reference_id LIKE :s OR city LIKE :s)";
    $params[':s'] = "%{$search}%";
}

if (!empty($statusFilter)) {
    $where[] = "status = :st";
    $params[':st'] = $statusFilter;
}

if (!empty($procFilter)) {
    $where[] = "procedure_name LIKE :pr";
    $params[':pr'] = "%{$procFilter}%";
}

$whereSql = implode(' AND ', $where);

// Metrics Calculation
$totalLeads = 0;
$todayLeads = 0;
$newLeads = 0;
$scheduledLeads = 0;

if ($pdo) {
    try {
        $totalLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads`")->fetchColumn();
        $todayLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE DATE(created_at) = CURDATE()")->fetchColumn();
        $newLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'New'")->fetchColumn();
        $scheduledLeads = (int)$pdo->query("SELECT COUNT(*) FROM `leads` WHERE status = 'Scheduled'")->fetchColumn();
        
        // Fetch Leads
        $stmt = $pdo->prepare("SELECT * FROM `leads` WHERE {$whereSql} ORDER BY `id` DESC LIMIT 200");
        $stmt->execute($params);
        $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $leads = [];
        $error = "Database error: " . $e->getMessage();
    }
} else {
    $leads = [];
    $error = "Could not connect to database. Please check your credentials in config.php.";
}

// 8 Surgical Procedures for Filter
$coreProcedures = [
    'Gynecomastia (Male Chest Reduction)',
    'Rhinoplasty (Nose Job)',
    '360° HD Liposuction',
    'Tummy Tuck (Abdominoplasty)',
    'Breast Augmentation',
    'Breast Reduction & Lift',
    'Genioplasty (Chin Enhancement)',
    'Blepharoplasty (Baggy Eyelids)'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lead Management Dashboard • Dr. R. K. Mishra</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
    <style>
        :root {
            --navy-primary: #00264D;
            --navy-secondary: #003366;
            --cyan-accent: #00A3E0;
            --bg-page: #F8FAFC;
            --card-border: #E2E8F0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg-page); color: #0F172A; min-height: 100vh; padding-bottom: 60px; }
        
        /* Top Navigation Header */
        header.dashboard-header { background: #001D3D; color: #fff; padding: 16px 28px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #002E5C; position: sticky; top: 0; z-index: 40; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .brand-title { display: flex; align-items: center; gap: 12px; }
        .brand-title h1 { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; letter-spacing: -0.01em; }
        .brand-title span.badge { background: rgba(0, 163, 224, 0.2); color: #00A3E0; border: 1px solid rgba(0, 163, 224, 0.4); font-size: 11px; padding: 3px 8px; border-radius: 6px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; }
        
        .header-actions { display: flex; align-items: center; gap: 14px; }
        .btn-excel { background: #10B981; color: #fff; padding: 9px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); border: none; cursor: pointer; }
        .btn-excel:hover { background: #059669; transform: translateY(-1px); }
        .btn-logout { background: rgba(255,255,255,0.1); color: #E2E8F0; padding: 8px 14px; border-radius: 10px; font-weight: 600; font-size: 12px; text-decoration: none; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.15); }
        .btn-logout:hover { background: rgba(255,255,255,0.2); color: #fff; }

        .container { max-width: 1440px; margin: 28px auto; padding: 0 24px; }

        /* Metric Cards */
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin-bottom: 28px; }
        .metric-card { background: #fff; border: 1px solid var(--card-border); border-radius: 18px; padding: 22px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); position: relative; overflow: hidden; }
        .metric-card .label { font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; }
        .metric-card .number { font-size: 32px; font-weight: 800; color: var(--navy-primary); margin-top: 6px; line-height: 1; }
        .metric-card .sub { font-size: 12px; color: #94A3B8; margin-top: 6px; font-weight: 500; }
        .metric-card.highlight { border-left: 4px solid var(--cyan-accent); }
        .metric-card.today { border-left: 4px solid #10B981; }

        /* Filter Box */
        .filter-card { background: #fff; border: 1px solid var(--card-border); border-radius: 18px; padding: 18px 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .filter-form { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; }
        .filter-field { flex: 1; min-width: 200px; }
        .filter-field label { display: block; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 6px; }
        .filter-field input, .filter-field select { width: 100%; padding: 10px 14px; border: 1px solid #CBD5E1; border-radius: 10px; font-size: 13px; font-family: inherit; background: #F8FAFC; }
        .filter-field input:focus, .filter-field select:focus { outline: none; border-color: var(--navy-secondary); background: #fff; }
        .btn-filter { padding: 10px 20px; background: var(--navy-secondary); color: #fff; border: none; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; height: 42px; }
        .btn-filter:hover { background: var(--navy-primary); }
        .btn-reset { padding: 10px 16px; background: #F1F5F9; color: #475569; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 13px; height: 42px; display: inline-flex; align-items: center; border: 1px solid #E2E8F0; }
        .btn-reset:hover { background: #E2E8F0; }

        /* Table Card */
        .table-card { background: #fff; border: 1px solid var(--card-border); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
        .table-header { padding: 20px 24px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; }
        .table-header h2 { font-size: 17px; font-weight: 800; color: var(--navy-primary); }
        .table-responsive { width: 100%; overflow-x: auto; }

        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
        thead th { background: #F8FAFC; padding: 14px 18px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; border-bottom: 1px solid #E2E8F0; white-space: nowrap; }
        tbody tr { border-bottom: 1px solid #F1F5F9; transition: background 0.15s; }
        tbody tr:hover { background: #F8FAFD; }
        tbody td { padding: 16px 18px; vertical-align: middle; }

        /* Patient Info Styling */
        .patient-name { font-weight: 700; color: var(--navy-primary); font-size: 14px; }
        .patient-ref { font-size: 11px; font-family: monospace; color: #64748B; font-weight: 600; }
        .patient-city { font-size: 11px; color: #94A3B8; margin-top: 2px; }

        /* Action Buttons */
        .phone-group { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
        .btn-call { display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; background: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD; }
        .btn-call:hover { background: #BAE6FD; }
        .btn-wa { display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; background: #DCFCE7; color: #166534; border: 1px solid #BBF7D0; }
        .btn-wa:hover { background: #BBF7D0; }

        /* Badges */
        .proc-badge { display: inline-block; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; background: #EFF6FF; color: #1D4ED8; border: 1px solid #DBEAFE; }
        .format-badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; background: #F1F5F9; color: #475569; margin-top: 3px; }

        /* Status Dropdown */
        .status-select { padding: 5px 8px; border-radius: 8px; font-size: 11px; font-weight: 700; border: 1.5px solid #CBD5E1; font-family: inherit; cursor: pointer; }
        .status-New { background: #FEF3C7; color: #92400E; border-color: #FCD34D; }
        .status-Contacted { background: #E0E7FF; color: #3730A3; border-color: #C7D2FE; }
        .status-Scheduled { background: #DCFCE7; color: #166534; border-color: #86EFAC; }
        .status-Completed { background: #F1F5F9; color: #334155; border-color: #CBD5E1; }
        .status-Cancelled { background: #FEE2E2; color: #991B1B; border-color: #FCA5A5; }

        .empty-state { text-align: center; padding: 60px 20px; color: #64748B; font-size: 14px; }
        .message-preview { max-width: 220px; font-size: 12px; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-style: italic; }

        .alert-success { background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; padding: 12px 18px; border-radius: 12px; margin-bottom: 20px; font-weight: 600; font-size: 13px; }
    </style>
</head>
<body>

<!-- Dashboard Sticky Header -->
<header class="dashboard-header">
    <div class="brand-title">
        <h1>Dr. R. K. Mishra • Leads Management</h1>
        <span class="badge">SIPS Hospital OPD</span>
    </div>

    <div class="header-actions">
        <!-- Direct Excel Download Button -->
        <a href="export_excel.php<?php echo !empty($_SERVER['QUERY_STRING']) ? '?' . htmlspecialchars($_SERVER['QUERY_STRING']) : ''; ?>" class="btn-excel" title="Download all filtered leads in Microsoft Excel (.CSV) format">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download Leads in Excel</span>
        </a>

        <a href="admin.php?action=logout" class="btn-logout">Logout</a>
    </div>
</header>

<div class="container">

    <?php if (!empty($message)): ?>
        <div class="alert-success">✓ <?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>

    <!-- 4 High-Level Key Metrics Cards -->
    <div class="metrics-grid">
        <div class="metric-card highlight">
            <div class="label">Total Inquiries</div>
            <div class="number"><?php echo number_format($totalLeads); ?></div>
            <div class="sub">All time recorded patients</div>
        </div>

        <div class="metric-card today">
            <div class="label">Today&apos;s New Leads</div>
            <div class="number"><?php echo number_format($todayLeads); ?></div>
            <div class="sub"><?php echo date('d M Y'); ?></div>
        </div>

        <div class="metric-card">
            <div class="label">Pending Attention</div>
            <div class="number"><?php echo number_format($newLeads); ?></div>
            <div class="sub">Marked as 'New'</div>
        </div>

        <div class="metric-card">
            <div class="label">Scheduled Consultations</div>
            <div class="number"><?php echo number_format($scheduledLeads); ?></div>
            <div class="sub">OPD bookings confirmed</div>
        </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="filter-card">
        <form method="GET" action="admin.php" class="filter-form">
            
            <div class="filter-field" style="flex: 1.5;">
                <label for="search">Search Patients</label>
                <input type="text" id="search" name="search" value="<?php echo htmlspecialchars($search); ?>" placeholder="Search name, phone, city, reference ID...">
            </div>

            <div class="filter-field">
                <label for="procedure">Procedure Filter</label>
                <select id="procedure" name="procedure">
                    <option value="">All 8 Procedures</option>
                    <?php foreach ($coreProcedures as $p): ?>
                        <option value="<?php echo htmlspecialchars($p); ?>" <?php echo $procFilter === $p ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($p); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="filter-field" style="max-width: 180px;">
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

            <button type="submit" class="btn-filter">Filter Leads</button>
            <?php if (!empty($search) || !empty($statusFilter) || !empty($procFilter)): ?>
                <a href="admin.php" class="btn-reset">Reset</a>
            <?php endif; ?>

        </form>
    </div>

    <!-- Leads Data Table -->
    <div class="table-card">
        <div class="table-header">
            <h2>Patient Consultation Requests (<?php echo count($leads); ?> showing)</h2>
            <div style="font-size: 12px; color: #64748B;">
                Sorted by most recent first
            </div>
        </div>

        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Date &amp; Ref</th>
                        <th>Patient Details</th>
                        <th>Direct Connect</th>
                        <th>Selected Procedure</th>
                        <th>Preferred Slot</th>
                        <th>Mode</th>
                        <th>Patient Questions</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($leads)): ?>
                        <tr>
                            <td colspan="8" class="empty-state">
                                No consultation leads found matching the selected filters.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($leads as $row): 
                            $cleanPhone = preg_replace('/\D/', '', $row['phone']);
                            $waMessage = urlencode("Hello {$row['name']}, this is Dr. R. K. Mishra's surgical clinic at SIPS Hospital, Lucknow regarding your consultation inquiry for {$row['procedure_name']}. How can we assist you today?");
                        ?>
                            <tr>
                                <td>
                                    <div class="patient-ref"><?php echo htmlspecialchars($row['reference_id'] ?? 'SIPS-' . $row['id']); ?></div>
                                    <div style="font-size: 11px; color: #64748B; margin-top: 2px;">
                                        <?php echo date('d M Y, h:i A', strtotime($row['created_at'])); ?>
                                    </div>
                                </td>

                                <td>
                                    <div class="patient-name"><?php echo htmlspecialchars($row['name']); ?></div>
                                    <div class="patient-city"><?php echo htmlspecialchars($row['city'] ?: 'Lucknow'); ?></div>
                                    <?php if (!empty($row['email'])): ?>
                                        <div style="font-size: 11px; color: #64748B;"><?php echo htmlspecialchars($row['email']); ?></div>
                                    <?php endif; ?>
                                </td>

                                <td>
                                    <div style="font-weight: 700; color: #1E293B; font-size: 13px;"><?php echo htmlspecialchars($row['phone']); ?></div>
                                    <div class="phone-group">
                                        <a href="tel:<?php echo htmlspecialchars($cleanPhone); ?>" class="btn-call" title="Call Patient">
                                            📞 Call
                                        </a>
                                        <a href="https://wa.me/91<?php echo htmlspecialchars($cleanPhone); ?>?text=<?php echo $waMessage; ?>" target="_blank" rel="noopener noreferrer" class="btn-wa" title="Open WhatsApp Chat">
                                            💬 WhatsApp
                                        </a>
                                    </div>
                                </td>

                                <td>
                                    <span class="proc-badge">
                                        <?php echo htmlspecialchars($row['procedure_name']); ?>
                                    </span>
                                </td>

                                <td>
                                    <div style="font-weight: 600; color: #1E293B;">
                                        <?php echo !empty($row['preferred_date']) ? date('d-M-Y', strtotime($row['preferred_date'])) : 'Flexible'; ?>
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
                                        <div class="message-preview" title="<?php echo htmlspecialchars($row['message']); ?>">
                                            &ldquo;<?php echo htmlspecialchars($row['message']); ?>&rdquo;
                                        </div>
                                    <?php else: ?>
                                        <span style="color: #CBD5E1;">—</span>
                                    <?php endif; ?>
                                </td>

                                <td>
                                    <form method="POST" action="admin.php" style="display: inline;">
                                        <input type="hidden" name="update_status" value="1">
                                        <input type="hidden" name="lead_id" value="<?php echo $row['id']; ?>">
                                        <select name="status" class="status-select status-<?php echo htmlspecialchars($row['status']); ?>" onchange="this.form.submit()">
                                            <option value="New" <?php echo $row['status'] === 'New' ? 'selected' : ''; ?>>New</option>
                                            <option value="Contacted" <?php echo $row['status'] === 'Contacted' ? 'selected' : ''; ?>>Contacted</option>
                                            <option value="Scheduled" <?php echo $row['status'] === 'Scheduled' ? 'selected' : ''; ?>>Scheduled</option>
                                            <option value="Completed" <?php echo $row['status'] === 'Completed' ? 'selected' : ''; ?>>Completed</option>
                                            <option value="Cancelled" <?php echo $row['status'] === 'Cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                                        </select>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

</body>
</html>
