<?php

/**
 * Database & Application Configuration
 *
 * Sushrut Institute of Plastic Surgery (SIPS) - Dr. R. K. Mishra
 *
 * Designed for deployment on Hostinger MySQL & PHP
 */

// -------------------------------------------------------------
// SECURITY HEADERS
// -------------------------------------------------------------

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');


// -------------------------------------------------------------
// CORS CONFIGURATION
// -------------------------------------------------------------

$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:3001',

    // Main website
    'https://mycosmeticsurgery.in',
    'https://www.mycosmeticsurgery.in',

    // Consultation application
    'https://consult.mycosmeticsurgery.in'
];

$origin = isset($_SERVER['HTTP_ORIGIN'])
    ? $_SERVER['HTTP_ORIGIN']
    : '';

if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


// -------------------------------------------------------------
// HANDLE PREFLIGHT OPTIONS REQUEST
// -------------------------------------------------------------

if (
    isset($_SERVER['REQUEST_METHOD']) &&
    $_SERVER['REQUEST_METHOD'] === 'OPTIONS'
) {
    http_response_code(200);
    exit;
}


// -------------------------------------------------------------
// 1. HOSTINGER DATABASE SETTINGS
// -------------------------------------------------------------

/*
 * IMPORTANT:
 * This database is hosted on a DIFFERENT Hostinger account.
 *
 * Therefore DB_HOST must NOT be localhost.
 *
 * Remote MySQL hostname:
 * srv1743.hstgr.io
 */

define('DB_HOST', 'srv1743.hstgr.io');

define('DB_PORT', 3306);

define('DB_NAME', 'u660349605_cosmetic');

define('DB_USER', 'u660349605_user');

/*
 * IMPORTANT:
 * Put the NEW database password here.
 *
 * Do NOT use the old password that was previously exposed.
 */
define('DB_PASS', 'Mycosmetic@123');

define('DB_CHARSET', 'utf8mb4');


// -------------------------------------------------------------
// 2. ADMIN PANEL SECURITY SETTINGS
// -------------------------------------------------------------

define('ADMIN_USERNAME', 'admin');

/*
 * Use a DIFFERENT password from the database password.
 */
define('ADMIN_PASSWORD', 'Mycosmetic@123');

/*
 * Secondary fallback password.
 *
 * Recommended: use another strong, unique password.
 */
define(
    'ADMIN_SECONDARY_PASSWORD',
    'Mycosmetic@254'
);

define('SESSION_LIFETIME', 86400); // 24 hours


// -------------------------------------------------------------
// 3. CLINIC NOTIFICATION & EMAIL SETTINGS
// -------------------------------------------------------------

define('CLINIC_EMAIL', 'MyCosmeticSurgery@gmail.com');

define('CLINIC_PHONE', '9795800800');

define(
    'ENABLE_EMAIL_NOTIFICATION',
    true
);


// -------------------------------------------------------------
// GMAIL / HOSTINGER SMTP CONFIGURATION
// -------------------------------------------------------------

/*
 * Gmail App Password configured & SMTP enabled.
 */

define('USE_SMTP', true);

define('SMTP_HOST', 'smtp.gmail.com');

define('SMTP_PORT', 587);

define('SMTP_USER', 'MyCosmeticSurgery@gmail.com');

define(
    'SMTP_PASS',
    'zmjsbogwvpiomkwv'
);

define('SMTP_SECURE', 'tls');


// -------------------------------------------------------------
// ADMIN PORTAL URL
// -------------------------------------------------------------

/*
 * New application is hosted at:
 *
 * https://consult.mycosmeticsurgery.in
 *
 * Backend is inside:
 *
 * /public_html/consult/api/
 */

define(
    'ADMIN_PORTAL_URL',
    'https://consult.mycosmeticsurgery.in/api/admin.php'
);


// -------------------------------------------------------------
// 4. PDO DATABASE CONNECTION FUNCTION
// -------------------------------------------------------------

function getDbConnection()
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $port = defined('DB_PORT') ? (int) DB_PORT : 3306;

    $dsn =
        "mysql:host=" . DB_HOST .
        ";port=" . $port .
        ";dbname=" . DB_NAME .
        ";charset=" . DB_CHARSET;

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {

        $pdo = new PDO(
            $dsn,
            DB_USER,
            DB_PASS,
            $options
        );

        return $pdo;

    } catch (PDOException $e) {

        $GLOBALS['db_last_error'] = $e->getMessage();

        error_log(
            "DB Connection Error: " . $e->getMessage()
        );

        return null;
    }
}


// -------------------------------------------------------------
// 5. HELPER UTILITIES
// -------------------------------------------------------------

function sendJsonResponse(
    $data,
    $statusCode = 200
) {
    http_response_code($statusCode);

    header(
        'Content-Type: application/json; charset=utf-8'
    );

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE |
        JSON_PRETTY_PRINT
    );

    exit;
}


function sanitizeInput($data)
{
    if (is_array($data)) {
        return array_map(
            'sanitizeInput',
            $data
        );
    }

    return htmlspecialchars(
        trim((string) $data),
        ENT_QUOTES,
        'UTF-8'
    );
}


// -------------------------------------------------------------
// 6. CLINICAL & PATIENT EMAIL NOTIFICATION SYSTEM
// -------------------------------------------------------------

/**
 * Universal Email Dispatcher
 * Sends via Google/Hostinger SMTP if configured, with silent fallback to native mail().
 */
function dispatchEmail(
    $to,
    $subject,
    $htmlBody,
    $replyTo = '',
    $senderName = 'Dr. R.K. Mishra Surgical Desk'
) {
    if (empty($to) || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    $smtpPasswordProvided = (
        defined('SMTP_PASS') &&
        SMTP_PASS !== 'UPDATE_WITH_GMAIL_APP_PASSWORD_LATER' &&
        !empty(SMTP_PASS)
    );

    $useSmtp = defined('USE_SMTP') && USE_SMTP && $smtpPasswordProvided;

    if ($useSmtp) {
        $sent = sendSmtpEmail($to, $subject, $htmlBody, $replyTo, $senderName);
        if ($sent) {
            return true;
        }
        // Fallback to PHP native mail() if SMTP fails
    }

    $fromDomain = preg_replace(
        '/^www\./',
        '',
        ($_SERVER['HTTP_HOST'] ?? 'mycosmeticsurgery.in')
    );
    $fromEmail = "no-reply@" . $fromDomain;

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$senderName} <{$fromEmail}>\r\n";

    if (!empty($replyTo) && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: " . trim($replyTo) . "\r\n";
    }

    $headers .= "X-Mailer: SIPS-Hospital-Portal/2.0\r\n";

    $mailSent = @mail($to, $subject, $htmlBody, $headers, "-f {$fromEmail}");
    if (!$mailSent) {
        $mailSent = @mail($to, $subject, $htmlBody, $headers);
    }

    return (bool) $mailSent;
}


/**
 * 1. CLINIC ADMIN DOSSIER EMAIL
 * Sent immediately to the clinic desk (MyCosmeticSurgery@gmail.com) upon patient submission.
 */
function sendLeadNotificationEmail($lead)
{
    if (
        !defined('ENABLE_EMAIL_NOTIFICATION') ||
        !ENABLE_EMAIL_NOTIFICATION ||
        empty(CLINIC_EMAIL)
    ) {
        return false;
    }

    $to = CLINIC_EMAIL;
    $refId = $lead['reference_id'] ?? ('SIPS-' . strtoupper(substr(uniqid(), -5)));
    $name = htmlspecialchars($lead['name'] ?? 'Patient');
    $rawPhone = $lead['phone'] ?? '';
    $cleanPhone = preg_replace('/\D/', '', $rawPhone);
    if (strpos($cleanPhone, '91') === 0 && strlen($cleanPhone) === 12) {
        $cleanPhone = substr($cleanPhone, 2);
    }

    $email = htmlspecialchars($lead['email'] ?? 'Not provided');
    $patientReplyTo = (!empty($lead['email']) && filter_var($lead['email'], FILTER_VALIDATE_EMAIL))
        ? trim($lead['email'])
        : '';

    $procedure = htmlspecialchars(
        $lead['procedure']
        ?? $lead['procedure_name']
        ?? 'General Aesthetic Consultation'
    );

    $mode = htmlspecialchars(
        $lead['consultation_type']
        ?? 'In-Person (SIPS Hospital)'
    );

    $date = !empty($lead['preferred_date'])
        ? date('d-M-Y', strtotime($lead['preferred_date']))
        : 'Flexible / Earliest';

    $time = htmlspecialchars(
        $lead['preferred_time']
        ?? $lead['timeSlot']
        ?? 'Morning OPD (10:30 AM – 1:00 PM)'
    );

    $city = htmlspecialchars($lead['city'] ?? 'Lucknow');
    $rawNotes = $lead['message'] ?? $lead['notes'] ?? '';
    $notes = !empty($rawNotes)
        ? nl2br(htmlspecialchars($rawNotes))
        : '<em>No additional concerns noted by patient.</em>';

    $ip = htmlspecialchars($lead['ip_address'] ?? ($_SERVER['REMOTE_ADDR'] ?? 'Recorded via web'));
    $submittedAt = date('d-M-Y, h:i A') . ' (IST)';

    $subject = "🏥 [New Consultation Lead] {$name} - {$procedure} ({$refId})";

    $waMessage = urlencode(
        "Namaste {$name} ji, this is Dr. R. K. Mishra's surgical consultation desk at SIPS Super Specialty Hospital, Lucknow regarding your inquiry for {$procedure} (Ref: {$refId}). When would you like to schedule your consultation?"
    );

    $adminUrl = defined('ADMIN_PORTAL_URL')
        ? ADMIN_PORTAL_URL
        : 'https://consult.mycosmeticsurgery.in/api/admin.php';

    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFD; margin: 0; padding: 20px; color: #0F172A; }
.card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.header { background: #00264D; padding: 26px 30px; color: #ffffff; text-align: left; }
.header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; color: #ffffff; }
.header p { margin: 6px 0 0; font-size: 12px; color: #94A3B8; }
.badge { display: inline-block; background: rgba(0,163,224,0.2); color: #38BDF8; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
.content { padding: 28px 30px; }
.section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748B; letter-spacing: 0.06em; margin-bottom: 14px; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px; }
.grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
.grid td { padding: 8px 0; font-size: 13px; vertical-align: top; }
.grid td.label { width: 38%; color: #64748B; font-weight: 600; }
.grid td.value { width: 62%; color: #0F172A; font-weight: 700; }
.highlight { color: #003366 !important; font-size: 14px !important; }
.notes-box { background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 14px 16px; margin-bottom: 24px; font-size: 13px; color: #1E293B; line-height: 1.5; }
.btn { display: inline-block; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; text-align: center; }
.btn-wa { background: #10B981; color: #ffffff !important; }
.btn-call { background: #003366; color: #ffffff !important; }
.btn-admin { background: #F1F5F9; color: #003366 !important; border: 1px solid #CBD5E1; display: block; text-align: center; margin-top: 10px; }
.footer { background: #F8FAFC; padding: 18px 30px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #94A3B8; line-height: 1.5; }
</style>
</head>
<body>
<div class="card">
    <div class="header">
        <span class="badge">SIPS Super Specialty Hospital • Priority Lead</span>
        <h1>New Patient Consultation Inquiry</h1>
        <p>Reference: <strong>#{$refId}</strong> • Received: {$submittedAt}</p>
    </div>

    <div class="content">
        <div class="section-title">Patient Contact Details</div>
        <table class="grid">
            <tr>
                <td class="label">Patient Full Name:</td>
                <td class="value highlight">{$name}</td>
            </tr>
            <tr>
                <td class="label">Mobile Number:</td>
                <td class="value highlight">+91 {$cleanPhone}</td>
            </tr>
            <tr>
                <td class="label">Email Address:</td>
                <td class="value">{$email}</td>
            </tr>
            <tr>
                <td class="label">City / Location:</td>
                <td class="value">{$city}</td>
            </tr>
        </table>

        <div class="section-title">Clinical Appointment Preferences</div>
        <table class="grid">
            <tr>
                <td class="label">Requested Procedure:</td>
                <td class="value" style="color: #0369A1;">{$procedure}</td>
            </tr>
            <tr>
                <td class="label">Consultation Mode:</td>
                <td class="value">{$mode}</td>
            </tr>
            <tr>
                <td class="label">Preferred Date:</td>
                <td class="value">{$date}</td>
            </tr>
            <tr>
                <td class="label">OPD Time Slot:</td>
                <td class="value">{$time}</td>
            </tr>
        </table>

        <div class="section-title">Patient's Questions / Clinical Notes</div>
        <div class="notes-box">
            {$notes}
        </div>

        <div class="section-title">Immediate Coordinator Action</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
            <tr>
                <td width="48%" style="padding-right: 6px;">
                    <a href="https://wa.me/91{$cleanPhone}?text={$waMessage}" class="btn btn-wa" style="display: block;">
                        💬 WhatsApp Patient
                    </a>
                </td>
                <td width="48%" style="padding-left: 6px;">
                    <a href="tel:+91{$cleanPhone}" class="btn btn-call" style="display: block;">
                        📞 Call Patient
                    </a>
                </td>
            </tr>
        </table>

        <a href="{$adminUrl}" class="btn btn-admin">
            🔐 Open Surgeon Admin Portal &rarr;
        </a>
    </div>

    <div class="footer">
        My Cosmetic Surgery Desk • Dr. R. K. Mishra (ASPS Member, M.Ch Plastic Surgery)
        <br>
        Sushrut Institute of Plastic Surgery (SIPS Hospital), 29 Shah Mina Rd, Chowk, Lucknow
        <br>
        Submission IP: {$ip}
    </div>
</div>
</body>
</html>
HTML;

    return dispatchEmail($to, $subject, $html, $patientReplyTo, "SIPS Clinic Lead Desk");
}


/**
 * 2. PATIENT CONFIRMATION EMAIL
 * Sent directly to the patient acknowledging their consultation inquiry with doctor credentials,
 * booking reference number, appointment request summary, and coordinator next steps.
 */
function sendPatientConfirmationEmail($lead)
{
    $to = trim($lead['email'] ?? '');
    if (empty($to) || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
        // Patient did not provide a valid email, skip email gracefully
        return false;
    }

    $refId = $lead['reference_id'] ?? ('SIPS-' . strtoupper(substr(uniqid(), -5)));
    $name = htmlspecialchars($lead['name'] ?? 'Valued Patient');
    $rawPhone = $lead['phone'] ?? '';
    $cleanPhone = preg_replace('/\D/', '', $rawPhone);
    if (strpos($cleanPhone, '91') === 0 && strlen($cleanPhone) === 12) {
        $cleanPhone = substr($cleanPhone, 2);
    }

    $procedure = htmlspecialchars(
        $lead['procedure']
        ?? $lead['procedure_name']
        ?? 'Aesthetic & Plastic Surgery Consultation'
    );

    $mode = htmlspecialchars(
        $lead['consultation_type']
        ?? 'In-Person (SIPS Hospital)'
    );

    $date = !empty($lead['preferred_date'])
        ? date('d-M-Y', strtotime($lead['preferred_date']))
        : 'Flexible / Earliest Available';

    $time = htmlspecialchars(
        $lead['preferred_time']
        ?? $lead['timeSlot']
        ?? 'Morning OPD (10:30 AM – 1:00 PM)'
    );

    $city = htmlspecialchars($lead['city'] ?? 'Lucknow');
    $clinicPhone = defined('CLINIC_PHONE') ? CLINIC_PHONE : '9795800800';
    $clinicEmail = defined('CLINIC_EMAIL') ? CLINIC_EMAIL : 'MyCosmeticSurgery@gmail.com';

    $patientWaLink = "https://wa.me/91{$clinicPhone}?text=" . urlencode(
        "Namaste Dr. Mishra's Desk, I have submitted a consultation request for {$procedure} (Ref: {$refId}). Please confirm my appointment slot."
    );

    $subject = "✨ Consultation Request Received: Dr. R. K. Mishra | SIPS Hospital (#{$refId})";

    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFD; margin: 0; padding: 20px; color: #0F172A; }
.card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 6px 24px rgba(0,0,0,0.06); }
.header { background: linear-gradient(135deg, #002244 0%, #003366 100%); padding: 32px 32px 28px; color: #ffffff; text-align: left; }
.brand-pill { display: inline-block; background: rgba(255,255,255,0.12); color: #38BDF8; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.06em; text-transform: uppercase; }
.header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.01em; color: #ffffff; line-height: 1.3; }
.header p { margin: 8px 0 0; font-size: 13px; color: #94A3B8; line-height: 1.4; }
.ref-badge { display: inline-block; background: #0284C7; color: #ffffff; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-top: 14px; letter-spacing: 0.03em; }
.content { padding: 32px; }
.intro-text { font-size: 15px; color: #1E293B; line-height: 1.6; margin-bottom: 24px; }
.summary-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; margin-bottom: 28px; }
.summary-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748B; letter-spacing: 0.08em; margin-bottom: 14px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; }
.grid { width: 100%; border-collapse: collapse; }
.grid td { padding: 8px 0; font-size: 13.5px; vertical-align: top; }
.grid td.label { width: 40%; color: #64748B; font-weight: 600; }
.grid td.value { width: 60%; color: #0F172A; font-weight: 700; }
.steps-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 22px; margin-bottom: 28px; }
.step-num { width: 24px; height: 24px; border-radius: 50%; background: #003366; color: #fff; font-size: 12px; font-weight: 800; text-align: center; line-height: 24px; margin-right: 12px; }
.btn-row { margin-bottom: 24px; }
.btn { display: inline-block; padding: 13px 22px; border-radius: 10px; font-size: 13.5px; font-weight: 700; text-decoration: none; text-align: center; }
.btn-wa { background: #10B981; color: #ffffff !important; }
.btn-call { background: #003366; color: #ffffff !important; }
.venue-card { background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; font-size: 12.5px; color: #1E293B; line-height: 1.6; }
.privacy-badge { background: #F1F5F9; border-radius: 8px; padding: 12px 16px; font-size: 12px; color: #64748B; margin-bottom: 24px; text-align: center; line-height: 1.5; }
.doctor-block { border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 13px; color: #475569; line-height: 1.6; }
.doctor-block strong { color: #002244; font-size: 15px; }
.footer { background: #F8FAFC; padding: 20px 32px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #94A3B8; line-height: 1.6; }
</style>
</head>
<body>
<div class="card">
    <div class="header">
        <span class="brand-pill">Sushrut Institute of Plastic Surgery (SIPS)</span>
        <h1>Consultation Request Acknowledged</h1>
        <p>Dr. R. K. Mishra • Senior Consultant Plastic & Cosmetic Surgeon</p>
        <span class="ref-badge">Booking Reference: #{$refId}</span>
    </div>

    <div class="content">
        <div class="intro-text">
            Dear <strong>{$name}</strong>,<br><br>
            Thank you for consulting Dr. R. K. Mishra at <strong>Sushrut Institute of Plastic Surgery (SIPS Hospital), Lucknow</strong>.
            We have safely received your consultation request regarding <strong>{$procedure}</strong>.
        </div>

        <div class="summary-card">
            <div class="summary-title">Your Consultation Details</div>
            <table class="grid">
                <tr>
                    <td class="label">Reference ID:</td>
                    <td class="value" style="color: #0284C7;">#{$refId}</td>
                </tr>
                <tr>
                    <td class="label">Procedure of Interest:</td>
                    <td class="value" style="color: #003366;">{$procedure}</td>
                </tr>
                <tr>
                    <td class="label">Consultation Mode:</td>
                    <td class="value">{$mode}</td>
                </tr>
                <tr>
                    <td class="label">Requested Date:</td>
                    <td class="value">{$date}</td>
                </tr>
                <tr>
                    <td class="label">Preferred OPD Slot:</td>
                    <td class="value">{$time}</td>
                </tr>
                <tr>
                    <td class="label">Patient Mobile:</td>
                    <td class="value">+91 {$cleanPhone}</td>
                </tr>
                <tr>
                    <td class="label">Location / City:</td>
                    <td class="value">{$city}</td>
                </tr>
            </table>
        </div>

        <div class="summary-title" style="margin-bottom: 12px;">What Happens Next?</div>
        <div class="steps-card">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td width="36" style="vertical-align: top; padding-bottom: 14px;">
                        <div class="step-num">1</div>
                    </td>
                    <td style="vertical-align: top; padding-bottom: 14px; font-size: 13px; color: #334155; line-height: 1.5;">
                        <strong>Clinical Schedule Review:</strong> Our senior surgical coordinator is reviewing your consultation request against Dr. Mishra's surgical and OPD calendar.
                    </td>
                </tr>
                <tr>
                    <td width="36" style="vertical-align: top; padding-bottom: 14px;">
                        <div class="step-num">2</div>
                    </td>
                    <td style="vertical-align: top; padding-bottom: 14px; font-size: 13px; color: #334155; line-height: 1.5;">
                        <strong>Direct Coordination Call / WhatsApp:</strong> A patient care executive will connect with you at <strong>+91 {$cleanPhone}</strong> during OPD hours to confirm your final appointment time.
                    </td>
                </tr>
                <tr>
                    <td width="36" style="vertical-align: top;">
                        <div class="step-num">3</div>
                    </td>
                    <td style="vertical-align: top; font-size: 13px; color: #334155; line-height: 1.5;">
                        <strong>Doctor Consultation:</strong> Personalized, unhurried consultation with Dr. Mishra to thoroughly discuss procedural details, candidate suitability, recovery timeline, and expected outcomes.
                    </td>
                </tr>
            </table>
        </div>

        <div class="summary-title" style="margin-bottom: 12px;">Need Immediate Assistance or Priority Booking?</div>
        <table width="100%" cellpadding="0" cellspacing="0" class="btn-row">
            <tr>
                <td width="50%" style="padding-right: 6px;">
                    <a href="{$patientWaLink}" class="btn btn-wa" style="display: block;">
                        💬 WhatsApp Clinic Desk
                    </a>
                </td>
                <td width="50%" style="padding-left: 6px;">
                    <a href="tel:+91{$clinicPhone}" class="btn btn-call" style="display: block;">
                        📞 Call: +91 {$clinicPhone}
                    </a>
                </td>
            </tr>
        </table>

        <div class="venue-card">
            <strong>🏥 Hospital Location & OPD Hours:</strong><br>
            <strong>Sushrut Institute of Plastic Surgery (SIPS Hospital)</strong><br>
            29 Shah Mina Road, Opp. King George's Medical University (KGMU), Chowk, Lucknow, UP 226003<br>
            <em>OPD Timings: Monday – Saturday (10:30 AM – 4:00 PM)</em>
        </div>

        <div class="privacy-badge">
            🔒 <strong>Strict Medical Confidentiality:</strong> Your health inquiry, contact information, and consultation details are protected under standard medical privacy ethics.
        </div>

        <div class="doctor-block">
            <strong>Dr. R. K. Mishra</strong><br>
            <em>M.B.B.S., M.S., M.Ch. (Plastic Surgery)</em><br>
            Senior Consultant Plastic & Cosmetic Surgeon<br>
            Active Member, American Society of Plastic Surgeons (ASPS) & APSI<br>
            Sushrut Institute of Plastic Surgery (SIPS), Lucknow
        </div>
    </div>

    <div class="footer">
        My Cosmetic Surgery Desk • SIPS Hospital, Lucknow<br>
        Direct Desk Helpline: +91 9795 800 800 • Email: {$clinicEmail}<br>
        This email was sent to confirm your consultation booking inquiry.
    </div>
</div>
</body>
</html>
HTML;

    return dispatchEmail($to, $subject, $html, $clinicEmail, "Dr. R.K. Mishra | SIPS Hospital");
}


/**
 * Socket-based SMTP transport for Gmail / Hostinger
 * Zero composer dependencies.
 */
function sendSmtpEmail(
    $to,
    $subject,
    $htmlBody,
    $replyTo = '',
    $senderName = 'Dr. R.K. Mishra Surgical Desk'
) {
    if (
        !defined('SMTP_HOST') ||
        !defined('SMTP_PORT') ||
        !defined('SMTP_USER') ||
        !defined('SMTP_PASS')
    ) {
        return false;
    }

    $host = SMTP_HOST;
    $port = (int) SMTP_PORT;
    $username = SMTP_USER;
    $password = SMTP_PASS;
    $timeout = 15;

    $context = stream_context_create([
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true
        ]
    ]);

    $socket = @stream_socket_client(
        "tcp://{$host}:{$port}",
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!$socket) {
        error_log("SMTP connection failed: {$errstr} ({$errno})");
        return false;
    }

    $read = function () use ($socket) {
        $res = '';
        while ($line = fgets($socket, 515)) {
            $res .= $line;
            if (substr($line, 3, 1) === ' ') {
                break;
            }
        }
        return $res;
    };

    $write = function ($cmd) use ($socket) {
        fputs($socket, $cmd . "\r\n");
    };

    $read();
    $write("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    $read();

    if ($port == 587 || (defined('SMTP_SECURE') && SMTP_SECURE === 'tls')) {
        $write("STARTTLS");
        $tlsRes = $read();
        if (strpos($tlsRes, '220') === 0) {
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            $write("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
            $read();
        }
    }

    $write("AUTH LOGIN");
    $read();

    $write(base64_encode($username));
    $read();

    $write(base64_encode($password));
    $authRes = $read();

    if (strpos($authRes, '235') !== 0) {
        error_log("SMTP Authentication failed: " . $authRes);
        fclose($socket);
        return false;
    }

    $write("MAIL FROM: <{$username}>");
    $read();

    $write("RCPT TO: <{$to}>");
    $rcptRes = $read();
    if (strpos($rcptRes, '250') !== 0) {
        error_log("SMTP RCPT failed: " . $rcptRes);
        fclose($socket);
        return false;
    }

    $write("DATA");
    $read();

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: \"{$senderName}\" <{$username}>\r\n";

    if (!empty($replyTo) && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$replyTo}\r\n";
    }

    $headers .= "To: {$to}\r\n";
    $headers .= "Subject: {$subject}\r\n";
    $headers .= "Date: " . date('r') . "\r\n";

    $write($headers . "\r\n" . $htmlBody . "\r\n.");
    $read();

    $write("QUIT");
    fclose($socket);

    return true;
}