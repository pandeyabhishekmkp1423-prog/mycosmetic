<?php
/**
 * Consultation Lead Submission Endpoint
 * Endpoint: POST /api/submit_lead.php
 */
require_once __DIR__ . '/config.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'error' => 'Method not allowed. Only POST is accepted.'], 405);
}

// Read payload: support both application/json and form-encoded data
$rawBody = file_get_contents('php://input');
$data = [];

if (!empty($rawBody)) {
    $decoded = json_decode($rawBody, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $data = $decoded;
    }
}

// Fallback to standard $_POST if not parsed from JSON
if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}

// Extract and sanitize input parameters
$name = isset($data['name']) ? trim(sanitizeInput($data['name'])) : '';
$phone = isset($data['phone']) ? trim(sanitizeInput($data['phone'])) : '';
$email = isset($data['email']) ? trim(sanitizeInput($data['email'])) : '';
$procedure = isset($data['procedure']) ? trim(sanitizeInput($data['procedure'])) : (isset($data['procedure_name']) ? trim(sanitizeInput($data['procedure_name'])) : '');
$consultationType = isset($data['consultationType']) ? trim(sanitizeInput($data['consultationType'])) : (isset($data['consultation_type']) ? trim(sanitizeInput($data['consultation_type'])) : 'In-Person (SIPS Hospital)');
$preferredDate = isset($data['preferredDate']) ? trim(sanitizeInput($data['preferredDate'])) : (isset($data['preferred_date']) ? trim(sanitizeInput($data['preferred_date'])) : null);
$preferredTime = isset($data['timeSlot']) ? trim(sanitizeInput($data['timeSlot'])) : (isset($data['preferred_time']) ? trim(sanitizeInput($data['preferred_time'])) : 'Morning OPD');
$city = isset($data['city']) ? trim(sanitizeInput($data['city'])) : 'Lucknow';
$message = isset($data['notes']) ? trim(sanitizeInput($data['notes'])) : (isset($data['message']) ? trim(sanitizeInput($data['message'])) : '');

// -------------------------------------------------------------
// Validation
// -------------------------------------------------------------
$errors = [];

if (empty($name)) {
    $errors[] = 'Full patient name is required.';
}

// Validate phone number: minimum 10 digits
$digitsOnly = preg_replace('/\D/', '', $phone);
if (empty($phone) || strlen($digitsOnly) < 10) {
    $errors[] = 'A valid 10-digit WhatsApp or phone number is required.';
}

if (empty($procedure)) {
    $procedure = 'Aesthetic Consultation';
}

if (!empty($errors)) {
    sendJsonResponse([
        'success' => false,
        'errors'  => $errors,
        'message' => implode(' ', $errors)
    ], 422);
}

// Client IP address detection
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    $ip = trim($ipList[0]);
}

// Format reference ID
$randomDigits = strtoupper(substr(uniqid(), -5));
$referenceId = 'SIPS-' . date('ym') . '-' . $randomDigits;

// Database Connection
$pdo = getDbConnection();

if (!$pdo) {
    // If DB is temporarily unavailable, still return a successful reference
    // so the patient isn't alarmed and can continue via WhatsApp
    sendJsonResponse([
        'success'      => true,
        'offline_mode' => true,
        'reference_id' => $referenceId,
        'message'      => 'Request received. Our coordinator will contact you shortly.',
        'details'      => [
            'name'      => $name,
            'phone'     => $phone,
            'procedure' => $procedure
        ]
    ], 200);
}

try {
    // Ensure table exists on the fly
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

    // Insert lead
    $stmt = $pdo->prepare("INSERT INTO `leads` (
        `reference_id`,
        `name`,
        `phone`,
        `email`,
        `procedure_name`,
        `consultation_type`,
        `preferred_date`,
        `preferred_time`,
        `city`,
        `message`,
        `ip_address`,
        `status`
    ) VALUES (
        :ref_id,
        :name,
        :phone,
        :email,
        :procedure_name,
        :consultation_type,
        :preferred_date,
        :preferred_time,
        :city,
        :message,
        :ip_address,
        'New'
    )");

    $stmt->execute([
        ':ref_id'            => $referenceId,
        ':name'              => $name,
        ':phone'             => $phone,
        ':email'             => !empty($email) ? $email : null,
        ':procedure_name'    => $procedure,
        ':consultation_type' => $consultationType,
        ':preferred_date'    => !empty($preferredDate) ? $preferredDate : null,
        ':preferred_time'    => $preferredTime,
        ':city'              => !empty($city) ? $city : 'Lucknow',
        ':message'           => !empty($message) ? $message : null,
        ':ip_address'        => $ip
    ]);

    $leadId = $pdo->lastInsertId();

    // Optional email notification to clinic desk
    if (defined('ENABLE_EMAIL_NOTIFICATION') && ENABLE_EMAIL_NOTIFICATION && !empty(CLINIC_EMAIL)) {
        $subject = "[New Consultation Lead] {$name} - {$procedure} ({$referenceId})";
        $emailContent = "New Patient Consultation Lead Received:\n\n" .
            "Reference ID: {$referenceId}\n" .
            "Name: {$name}\n" .
            "Phone: {$phone}\n" .
            "Email: {$email}\n" .
            "Procedure: {$procedure}\n" .
            "Mode: {$consultationType}\n" .
            "Preferred Date: {$preferredDate} ({$preferredTime})\n" .
            "City: {$city}\n" .
            "Notes: {$message}\n" .
            "Submitted: " . date('Y-m-d H:i:s') . "\n";
        
        @mail(CLINIC_EMAIL, $subject, $emailContent, "From: no-reply@mycosmeticsurgery.in\r\nReply-To: " . ($email ?: CLINIC_EMAIL));
    }

    sendJsonResponse([
        'success'      => true,
        'message'      => 'Consultation request registered successfully.',
        'reference_id' => $referenceId,
        'lead_id'      => (int)$leadId,
        'data'         => [
            'name'             => $name,
            'phone'            => $phone,
            'procedure'        => $procedure,
            'consultationType' => $consultationType,
            'preferredDate'    => $preferredDate,
            'timeSlot'         => $preferredTime
        ]
    ], 200);

} catch (PDOException $e) {
    sendJsonResponse([
        'success' => false,
        'error'   => 'Database error recording lead: ' . $e->getMessage()
    ], 500);
}
