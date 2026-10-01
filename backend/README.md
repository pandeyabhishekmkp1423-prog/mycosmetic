# Dr. R. K. Mishra • Patient Lead & Consultation Management System
### Complete PHP + MySQL Backend & Admin Panel Documentation for Hostinger

This folder contains the complete, production-ready backend designed to receive patient leads from the website, store them securely in a MySQL database, and provide an executive **Admin Portal** where Dr. R. K. Mishra and his clinical team can manage inquiries, initiate instant WhatsApp/Call follow-ups, and **export leads directly to Microsoft Excel**.

---

## 📋 Table of Contents
1. [System Overview & Features](#1-system-overview--features)
2. [File Directory Structure](#2-file-directory-structure)
3. [The 8 Clinical Procedures Supported](#3-the-8-clinical-procedures-supported)
4. [Step-by-Step Hostinger Deployment Guide](#4-step-by-step-hostinger-deployment-guide)
   - [Step 1: Create MySQL Database on Hostinger](#step-1-create-mysql-database-on-hostinger)
   - [Step 2: Configure `config.php`](#step-2-configure-configphp)
   - [Step 3: Upload Backend to Hostinger (`public_html/api/`)](#step-3-upload-backend-to-hostinger-public_htmlapi)
   - [Step 4: Run the One-Click Table Installer](#step-4-run-the-one-click-table-installer)
   - [Step 5: Test the Frontend Lead Form](#step-5-test-the-frontend-lead-form)
5. [Using the Admin Panel (`admin.php`)](#5-using-the-admin-panel-adminphp)
6. [Exporting Leads to Microsoft Excel (`export_excel.php`)](#6-exporting-leads-to-microsoft-excel-export_excelphp)
7. [API Endpoint Documentation (`submit_lead.php`)](#7-api-endpoint-documentation-submit_leadphp)
8. [Database Schema (`schema.sql`)](#8-database-schema-schemasql)
9. [Security Best Practices & Production Hardening](#9-security-best-practices--production-hardening)
10. [Troubleshooting & Frequently Asked Questions](#10-troubleshooting--frequently-asked-questions)

---

## 1. System Overview & Features

- **Direct MySQL Storage**: Every consultation request submitted on the website is permanently stored in MySQL via secure PHP Data Objects (PDO) prepared statements.
- **8 Core Procedures**: Pre-configured with the exact 8 procedures featured across the website.
- **Reference Tracking**: Each lead receives a unique medical inquiry tracking number (e.g. `SIPS-782914`).
- **Executive Admin Dashboard**: Protected with session-based authentication, real-time KPI counter cards (*Total Leads*, *Today's Leads*, *Pending Attention*, *Scheduled OPD*), patient search, and status filters.
- **One-Click Patient Connect**: Direct **📞 Call** and **💬 WhatsApp** action buttons on every patient row with pre-filled surgical inquiry greetings.
- **Microsoft Excel (.CSV) Export**: Formatted with UTF-8 BOM (`\xEF\xBB\xBF`) and apostrophe-prefixed phone numbers to prevent Microsoft Excel from converting phone numbers into scientific notation (e.g. `9.79E+09`).
- **Zero Framework Overhead**: Runs natively on standard Hostinger PHP 7.4 / 8.0 / 8.1 / 8.2 / 8.3 environments with zero Composer or npm dependencies.

---

## 2. File Directory Structure

When deploying to Hostinger, all files in this `backend/` folder should be placed into your `public_html/api/` directory:

```text
public_html/
│
└── api/
    ├── config.php          <-- MySQL credentials, admin password & security helper
    ├── submit_lead.php     <-- Form submission API endpoint (POST handler)
    ├── admin.php           <-- Executive Admin Dashboard & Lead Manager
    ├── export_excel.php    <-- One-click Excel (.CSV) download endpoint
    ├── install.php         <-- One-click browser database installer
    ├── schema.sql          <-- SQL table schema (for manual phpMyAdmin import)
    └── README.md           <-- This complete instruction manual
```

---

## 3. The 8 Clinical Procedures Supported

Both the frontend form dropdown and backend database filters are aligned to the exact 8 clinical procedures:

1. **Gynecomastia (Male Chest Reduction)**
2. **Rhinoplasty (Nose Job)**
3. ****
4. **Tummy Tuck (Abdominoplasty)**
5. **Breast Augmentation**
6. **Breast Reduction & Lift**
7. **Genioplasty (Chin Enhancement)**
8. **Blepharoplasty (Baggy Eyelids)**

---

## 4. Step-by-Step Hostinger Deployment Guide

### Step 1: Create MySQL Database on Hostinger
1. Log in to your **Hostinger hPanel** (`https://hpanel.hostinger.com`).
2. In the left navigation menu, navigate to **Databases** → **MySQL Databases**.
3. Under **Create a New MySQL Database and Database User**, fill in:
   - **Database name**: e.g., `u123456789_cosmetic` (Hostinger adds a prefix automatically).
   - **Database username**: e.g., `u123456789_admin`.
   - **Password**: Enter a strong password (e.g., `SIPS_Hospital@2026`).
4. Click **Create**.
5. Copy down the exact **Database Name**, **Username**, and **Password**.

---

### Step 2: Configure `config.php`
Open `backend/config.php` on your computer in VS Code, Notepad, or any editor. Locate lines 34 to 46 and update them with your Hostinger database details:

```php
// =========================================================================
// 1. HOSTINGER MYSQL DATABASE CREDENTIALS
// =========================================================================
define('DB_HOST', 'localhost');                  // Always 'localhost' on Hostinger
define('DB_NAME', 'u123456789_cosmetic');        // Your Hostinger DB Name from Step 1
define('DB_USER', 'u123456789_admin');           // Your Hostinger DB Username from Step 1
define('DB_PASS', 'SIPS_Hospital@2026');         // Your Hostinger DB Password from Step 1
define('DB_PORT', '3306');
define('DB_CHARSET', 'utf8mb4');

// =========================================================================
// 2. ADMIN PANEL LOGIN CREDENTIALS (Change this to your desired password)
// =========================================================================
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'DrMishra@2026');       // Enter your secure admin password
```
Save the file.

---

### Step 3: Upload Backend to Hostinger (`public_html/api/`)
1. In Hostinger hPanel, go to **Files** → **File Manager** (or connect via FileZilla / FTP).
2. Enter the **`public_html`** directory.
3. If not already present, click **New Folder** and name it **`api`**.
4. Open the `public_html/api` folder.
5. Upload all files from this `backend` folder into `public_html/api/`:
   - `config.php`
   - `submit_lead.php`
   - `admin.php`
   - `export_excel.php`
   - `install.php`
   - `schema.sql`

Your final file paths on Hostinger should look like:
- `https://yourdomain.com/api/submit_lead.php`
- `https://yourdomain.com/api/admin.php`
- `https://yourdomain.com/api/export_excel.php`
- `https://yourdomain.com/api/install.php`

---

### Step 4: Run the One-Click Table Installer
Instead of manually opening phpMyAdmin and copying SQL code, run the built-in installer:

1. Open your web browser and navigate to:
   ```
   https://yourdomain.com/api/install.php
   ```
   *(Replace `yourdomain.com` with your real website domain).*
2. The installer will test your database connection and automatically execute the SQL schema.
3. You will see a green confirmation badge:
   > **Setup Successful!**
   > Table `leads` created / verified with all performance indexes.
4. **Security Tip**: Once confirmed, you can delete `install.php` from your `public_html/api/` folder using Hostinger File Manager.

*(Alternative: If you prefer manual setup, open phpMyAdmin from Hostinger hPanel, select your database, click the **Import** tab, choose `schema.sql`, and click **Go**).*

---

### Step 5: Test the Frontend Lead Form
1. Visit your live website: `https://yourdomain.com/#consultation`.
2. Enter a test lead:
   - **Name**: `Test Patient`
   - **Phone**: `9795800800`
   - **Procedure**: `Gynecomastia (Male Chest Reduction)`
   - **City**: `Lucknow`
3. Click **"Confirm Consultation Request"**.
4. You will immediately see the success card with a reference code (e.g. `SIPS-XXXXXX`).
5. Open `https://yourdomain.com/api/admin.php` to verify that your test lead appears instantly at the top of the table.

---

## 5. Using the Admin Panel (`admin.php`)

### Accessing the Portal
- **URL**: `https://yourdomain.com/api/admin.php`
- **Default Username**: `admin`
- **Default Password**: `DrMishra@2026` *(or whatever you configured in `config.php`)*

### Key Features on the Dashboard
1. **Executive Metric Cards**:
   - **Total Inquiries**: All-time count of leads captured.
   - **Today's Inquiries**: Inquiries submitted since midnight.
   - **Pending Attention**: Leads currently marked with status `New`.
   - **Scheduled Consultations**: Patients booked for in-person or video OPD.
2. **Search Bar**: Type any patient name, phone number, city, or reference ID to filter instantly.
3. **Procedure Filter**: Filter inquiries by any of the 8 clinical procedures.
4. **Status Filter**: View leads by status (`New`, `Contacted`, `Scheduled`, `Completed`, `Cancelled`).
5. **One-Tap Patient Contact**:
   - Click the green **💬 WhatsApp** button: Launches WhatsApp Web/App with a pre-filled greeting:
     `"Hello Rahul, this is Dr. R. K. Mishra's clinical team from SIPS Hospital regarding your Gynecomastia inquiry..."`
   - Click the blue **📞 Call** button: Immediately dials the patient's phone number on mobile or PC softphone.
6. **Instant Status Updater**: Change a lead from `New` to `Contacted` or `Scheduled` with one click directly from the table.

---

## 6. Exporting Leads to Microsoft Excel (`export_excel.php`)

### How to Download
In the Admin Dashboard, click the prominent green button in the top header:
> **"Download Leads in Excel"**

Or visit directly when logged in:
```
https://yourdomain.com/api/export_excel.php
```

### Why This Excel Export is Superior to Basic CSV
1. **UTF-8 Byte Order Mark (`\xEF\xBB\xBF`)**: Microsoft Excel often corrupts non-ASCII characters or Indian names in standard CSVs. Our export prepends the official UTF-8 BOM, ensuring Excel opens the file with crisp, accurate typography.
2. **Phone Number Formatting**: In standard CSVs, Excel converts `9795800800` to `9.80E+09` (scientific notation). Our export formats the phone column so Excel treats it as a clean text string.
3. **Clean Column Headers**:
   - `ID`
   - `Reference ID`
   - `Date Submitted`
   - `Time`
   - `Patient Name`
   - `Phone Number`
   - `Email Address`
   - `Procedure / Treatment`
   - `Consultation Mode` (In-Person / Virtual)
   - `Preferred Date`
   - `OPD Slot`
   - `City / Location`
   - `Patient Questions / Notes`
   - `Lead Status`
   - `IP Address`

---

## 7. API Endpoint Documentation (`submit_lead.php`)

The website frontend submits consultation data to this endpoint.

- **Method**: `POST`
- **URL**: `/api/submit_lead.php`
- **Content-Type**: `application/json` (or standard `application/x-www-form-urlencoded`)

### Request Payload Example:
```json
{
  "name": "Rahul Sharma",
  "phone": "9795800800",
  "email": "rahul.sharma@example.com",
  "procedure": "Gynecomastia (Male Chest Reduction)",
  "consultationType": "In-Person (SIPS Hospital)",
  "preferredDate": "2026-10-02",
  "timeSlot": "Morning OPD (10:30 AM – 1:00 PM)",
  "city": "Lucknow",
  "notes": "Interested in scarless procedure"
}
```

### Successful JSON Response (`200 OK`):
```json
{
  "success": true,
  "message": "Consultation request registered successfully.",
  "reference_id": "SIPS-482910",
  "lead_id": 142
}
```

### Error JSON Response (`400 Bad Request`):
```json
{
  "success": false,
  "message": "Please enter a valid 10-digit mobile number."
}
```

---

## 8. Database Schema (`schema.sql`)

The `leads` table structure created in your MySQL database:

```sql
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reference_id` VARCHAR(32) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `email` VARCHAR(150) NULL,
  `procedure_name` VARCHAR(150) NOT NULL,
  `consultation_type` ENUM('In-Person (SIPS Hospital)', 'Virtual Video OPD') DEFAULT 'In-Person (SIPS Hospital)',
  `preferred_date` DATE NULL,
  `preferred_time` VARCHAR(100) NULL,
  `city` VARCHAR(100) DEFAULT 'Lucknow',
  `message` TEXT NULL,
  `status` ENUM('New', 'Contacted', 'Scheduled', 'Completed', 'Cancelled') NOT NULL DEFAULT 'New',
  `admin_notes` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_phone` (`phone`),
  INDEX `idx_status` (`status`),
  INDEX `idx_procedure` (`procedure_name`),
  INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 9. Security Best Practices & Production Hardening

1. **SQL Injection Protection**: All queries in `submit_lead.php`, `admin.php`, and `export_excel.php` utilize parameterized PDO prepared statements (`$stmt->prepare(...)`). No raw user strings are concatenated into SQL queries.
2. **XSS Protection**: All output rendered in the HTML table is passed through `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`.
3. **Session Authentication**: Only authenticated administrators with active PHP sessions (or valid time-based token) can view the admin dashboard or export data.
4. **Delete Installer After Setup**: Once `install.php` has created your database table, delete `install.php` from `public_html/api/` via Hostinger File Manager to prevent unauthorized re-runs.
5. **Change Default Password**: Never leave the password as default in production. Update `ADMIN_PASSWORD` in `config.php` to a strong unique password.

---

## 10. Troubleshooting & Frequently Asked Questions

### Q1: I see "Database connection failed" when testing `install.php`.
- **Solution**: Check `config.php`. Verify that:
  - `DB_HOST` is set to `'localhost'`.
  - `DB_NAME` includes your Hostinger prefix (e.g. `u123456789_cosmetic`, not just `cosmetic`).
  - `DB_USER` includes your Hostinger prefix (e.g. `u123456789_admin`).
  - `DB_PASS` matches the password you created under MySQL Databases in hPanel.

### Q2: When submitting the form on the website, it fails with 404 Not Found.
- **Solution**: Ensure your backend folder was uploaded to `public_html/api/` so the file is accessible at `https://yourdomain.com/api/submit_lead.php`. If your React app is in the root and routing all URLs through React, ensure the web server lets requests to `/api/` pass directly to PHP (Hostinger does this by default).

### Q3: How do I change the admin credentials?
- Open `config.php` in Hostinger File Manager (or locally before uploading).
- Edit `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
- Save the file. Changes take effect immediately.

### Q4: Can I access the leads on my smartphone?
- **Yes.** `admin.php` is fully responsive and optimized for mobile screens. You can log in on your phone, view patient inquiries, and tap **WhatsApp** or **Call** to reach patients instantly while on rounds at SIPS Hospital.

---

**Developed for**: Dr. R. K. Mishra • Senior Plastic & Cosmetic Surgeon  
**Hospital Location**: Sushrut Institute of Plastic Surgery (SIPS) Hospital, 29, Shah Mina Rd, Lucknow, Uttar Pradesh 226003, India  
**Emergency & Direct Clinic Helpline**: `+91 97958 00800`
