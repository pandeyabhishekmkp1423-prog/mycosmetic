# Hostinger Deployment Guide • Dr. R. K. Mishra Leads Backend & Admin Panel

This guide explains how to connect your Hostinger MySQL database, manage patient consultation leads, view complete submission details, and download Microsoft Excel sheets.

---

## 🔐 Configured Hostinger Database Credentials

The backend configuration in [`config.php`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/config.php) is pre-configured with your credentials:

- **MySQL Host:** `localhost` (standard on Hostinger)
- **Database Name:** `u660349605_cosmetic`
- **Database User:** `u660349605_user`
- **Database Password:** `Mycosmetic@123`
- **Admin Portal Username:** `admin`
- **Admin Portal Password:** `Mycosmetic@123` *(also accepts `DrMishra@2026`)*

---

## 📁 Included Backend Files

| File | Purpose |
|------|---------|
| [`config.php`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/config.php) | Database connection, credentials, CORS, and security settings |
| [`submit_lead.php`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/submit_lead.php) | Receives consultation form submissions from website and saves to MySQL |
| [`admin_api.php`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/admin_api.php) | REST API for fetching leads, updating statuses, deleting leads, and syncing with React |
| [`admin.php`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/admin.php) | **Executive Admin Portal** (KPI cards, filters, dossier modal, status updater, WhatsApp/Call) |
| [`export_excel.php`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/export_excel.php) | **One-Click Microsoft Excel Export** with UTF-8 BOM and sanitized telephone formatting |
| [`schema.sql`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/schema.sql) | Table schema for phpMyAdmin |
| [`install.php`](file:///c:/Users/Abhishek%20pandey/Desktop/cosmetic/backend/install.php) | Verification and table auto-installer script |

---

## 🚀 How to Access the Admin Panel

### Option 1: Standalone PHP Executive Portal (Recommended)
Upload the `backend` folder to Hostinger as `public_html/api/` (or `public_html/backend/`).
Visit in your browser:
```
https://yourdomain.com/api/admin.php
```
1. **Login Credentials:**
   - **Username:** `admin`
   - **Password:** `Mycosmetic@123`
2. **Features:**
   - **Live Metric Counters:** Total Inquiries, Today's New Leads (pulsing indicator), Pending Action, Scheduled OPDs, Completed.
   - **Interactive Filters:** Live search (by patient name, phone, email, reference ID, city, or notes), procedure filter, lead status filter, and quick date presets (Today, Last 7 Days, Last 30 Days, All Time).
   - **Direct Connect Buttons:** Instant Click-to-Call (`📞 Call`) and Click-to-WhatsApp (`💬 WhatsApp`) with pre-composed professional Hindi/English messages.
   - **Instant Status Changer:** Update status (`New`, `Contacted`, `Scheduled`, `Completed`, `Cancelled`) via real-time AJAX without page reloads.
   - **Full Patient Dossier Modal (`👁️ View Details`):** Displays all submission details (Full name, phone, email, procedure, consultation mode, preferred date & OPD slot, city, complete patient questions/notes, submission timestamp, and client IP).
   - **Delete Lead Action (`🗑️`):** Safe modal confirmation to remove test or spam submissions.
   - **Download Excel Sheet:** Prominent green button downloads clean Microsoft Excel (.CSV) files with UTF-8 BOM encoding.

---

### Option 2: React Web Application Admin View
On your website, visit:
```
https://yourdomain.com/admin
```
*(Or click **Clinic Admin Portal 🔐** in the footer legal bar)*

- Connects live to `/api/admin_api.php`
- Displays all leads from your Hostinger database
- Allows full search, status updates, full detail modal inspection, and one-click Excel download
