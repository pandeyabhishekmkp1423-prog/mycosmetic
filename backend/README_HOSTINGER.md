# Hostinger Deployment Guide • Dr. R. K. Mishra Leads Backend

This directory contains the production-ready PHP + MySQL backend for handling patient consultation leads and providing an executive admin panel with Microsoft Excel export.

---

## 📁 Included Files Overview

| File | Purpose |
|------|---------|
| `config.php` | Database configuration, credentials, CORS headers, and security settings |
| `schema.sql` | MySQL table schema for phpMyAdmin manual import (if desired) |
| `install.php` | **One-Click Installer**: Automatically creates the `leads` table and indexes in your database |
| `submit_lead.php` | API endpoint that receives form submissions from the frontend and inserts into MySQL |
| `admin.php` | Executive Admin Portal with lead counters, WhatsApp direct buttons, and status manager |
| `export_excel.php` | Generates clean Microsoft Excel (.CSV) downloads with UTF-8 support |

---

## 🚀 Step-by-Step Hostinger Deployment

### Step 1: Create a MySQL Database in Hostinger
1. Log in to your **Hostinger hPanel**.
2. Go to **Databases** → **MySQL Databases**.
3. Create a new database:
   - Database Name (e.g. `u123456789_cosmetic`)
   - Username (e.g. `u123456789_user`)
   - Password (e.g. `YourStrongPassword123`)
4. Note down the Database Name, Username, and Password.

---

### Step 2: Configure `config.php`
Open `backend/config.php` in any text editor and update lines 34–37:

```php
define('DB_HOST', 'localhost');                // Usually 'localhost' on Hostinger
define('DB_NAME', 'u123456789_cosmetic');      // Your Hostinger Database Name
define('DB_USER', 'u123456789_user');          // Your Hostinger Database Username
define('DB_PASS', 'YourStrongPassword123');    // Your Hostinger Database Password

// Set your Admin Credentials for admin.php:
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'DrMishra@2026');     // Change to your desired password
```

---

### Step 3: Upload to Hostinger File Manager
1. In Hostinger hPanel, go to **Files** → **File Manager**.
2. Open `public_html`.
3. Create a folder named `api` (or upload this entire `backend` folder as `api`).
4. The uploaded files should be located at:
   - `public_html/api/config.php`
   - `public_html/api/submit_lead.php`
   - `public_html/api/admin.php`
   - `public_html/api/export_excel.php`
   - `public_html/api/install.php`

---

### Step 4: Run the One-Click Table Installer
1. Open your browser and visit:
   ```
   https://yourdomain.com/api/install.php
   ```
2. You will see a green **"Setup Successful!"** badge confirming that the MySQL connection is working and the `leads` table has been created with all indexes.
3. *(Optional)* For security, you may delete `install.php` from your File Manager once verified.

---

### Step 5: Access the Admin Panel & Download Excel
1. Visit:
   ```
   https://yourdomain.com/api/admin.php
   ```
2. Log in using your configured username (`admin`) and password (`DrMishra@2026`).
3. Click the green **"Download Leads in Excel"** button in the top right to download all patient leads formatted for Microsoft Excel!
4. Directly click **"Call"** or **"WhatsApp"** on any patient row to open an instant pre-filled chat with the patient.

---

## 🔒 Security Best Practices Implemented
- Prepared statements (`PDO::prepare`) used for all database queries to prevent SQL injection.
- UTF-8 BOM byte order mark included in CSV exports for seamless Microsoft Excel rendering.
- Session-based authentication on `admin.php` and `export_excel.php`.
- XSS sanitization on all incoming user inputs.
