-- --------------------------------------------------------
-- Hostinger MySQL Database Schema
-- Project: My Cosmetic Surgery - Dr. R. K. Mishra
-- Table Structure for `leads`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `leads` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional sample lead record for testing
INSERT INTO `leads` (`reference_id`, `name`, `phone`, `email`, `procedure_name`, `consultation_type`, `preferred_date`, `preferred_time`, `city`, `message`, `status`)
VALUES 
('SIPS-DEMO-001', 'Sample Patient', '9795800800', 'patient@example.com', 'Gynecomastia (Male Chest Reduction)', 'In-Person (SIPS Hospital)', CURDATE(), '10:30 AM - 1:00 PM', 'Lucknow', 'Looking for personal evaluation with Dr. R.K. Mishra.', 'New')
ON DUPLICATE KEY UPDATE `name`=`name`;
