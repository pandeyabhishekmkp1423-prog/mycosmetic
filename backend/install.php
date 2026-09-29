<?php
/**
 * One-Click Table Installer
 * Visit https://yourdomain.com/api/install.php once to create the database table automatically.
 */
require_once __DIR__ . '/config.php';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Installer • Dr. R.K. Mishra Leads System</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #001D3D; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: #fff; color: #1e293b; max-width: 580px; width: 100%; border-radius: 20px; padding: 36px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4); }
        h1 { color: #003366; font-size: 24px; margin-top: 0; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
        .success { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
        .error { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
        .code-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-family: monospace; font-size: 13px; line-height: 1.5; color: #334155; overflow-x: auto; margin: 16px 0; }
        .btn { display: inline-block; padding: 12px 24px; background: #003366; color: #fff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 14px; margin-top: 10px; }
        .btn:hover { background: #002244; }
    </style>
</head>
<body>

<div class="card">
    <h1>Database Initialization</h1>
    <p>Target Database: <strong><?php echo htmlspecialchars(DB_NAME); ?></strong> on <strong><?php echo htmlspecialchars(DB_HOST); ?></strong></p>

    <?php
    $pdo = getDbConnection();

    if (!$pdo) {
        echo '<div class="badge error">Connection Failed</div>';
        echo '<p style="color: #dc2626;">Unable to connect to MySQL database with the credentials provided in <code>config.php</code>.</p>';
        echo '<div class="code-box">';
        echo "Please check:\n";
        echo "1. DB_NAME in config.php\n";
        echo "2. DB_USER in config.php\n";
        echo "3. DB_PASS in config.php\n";
        echo "4. That your Hostinger database and user are assigned proper privileges.";
        echo '</div>';
        echo '<p>Edit <code>config.php</code> with your Hostinger database details, then refresh this page.</p>';
    } else {
        try {
            $sql = "CREATE TABLE IF NOT EXISTS `leads` (
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

            $pdo->exec($sql);

            echo '<div class="badge success">Setup Successful!</div>';
            echo '<p style="color: #16a34a; font-weight: bold;">The `leads` table is verified and ready to accept consultation requests.</p>';
            
            // Count existing leads
            $countStmt = $pdo->query("SELECT COUNT(*) AS total FROM `leads`");
            $total = $countStmt->fetchColumn();

            echo '<div class="code-box">';
            echo "Status: Connected & Ready\n";
            echo "Table: `leads`\n";
            echo "Current Records: " . intval($total) . "\n";
            echo "Submission API Endpoint: /api/submit_lead.php\n";
            echo "Admin Dashboard: /api/admin.php\n";
            echo "Excel Export: /api/export_excel.php\n";
            echo '</div>';

            echo '<div style="margin-top: 20px;">';
            echo '<a href="admin.php" class="btn">Open Admin Dashboard &rarr;</a>';
            echo '</div>';

            echo '<p style="font-size: 12px; color: #64748b; margin-top: 24px;">For security, you may delete or rename <code>install.php</code> after running this once.</p>';

        } catch (PDOException $e) {
            echo '<div class="badge error">Execution Error</div>';
            echo '<p style="color: #dc2626;">Error creating table: ' . htmlspecialchars($e->getMessage()) . '</p>';
        }
    }
    ?>
</div>

</body>
</html>
