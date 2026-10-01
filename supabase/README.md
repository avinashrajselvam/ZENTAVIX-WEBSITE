# Supabase Backend Setup for Zentavix

This project uses **Supabase** (PostgreSQL + Auth + Row Level Security) as its cloud-hosted backend.

---

## 🚀 Quick Setup (5 Minutes)

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **New Project** and name it `zentavix-db`.
3. Choose your database password and region (e.g., South Asia / Singapore / India if available).

---

### 2. Run the Database Migration SQL
1. In your Supabase project dashboard, navigate to the **SQL Editor** (left sidebar).
2. Open the [schema.sql](file:///d:/zentavix/supabase/schema.sql) file located in this repository.
3. Copy all SQL commands and paste them into the Supabase SQL Editor.
4. Click **Run**.
   - This creates the `enquiries` table, sets up indices, enables Row Level Security (RLS), and establishes security policies so visitors can submit enquiries while only authenticated admins can view and manage them.

---

### 3. Create your Admin Account
1. In your Supabase dashboard, go to **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter your admin email (e.g., `admin@zentavix.com` or `zentavix@gmail.com`) and choose a strong password.
4. Toggle "Auto Confirm User" to `ON` so you don't need email verification.

---

### 4. Configure Environment Variables
1. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your_anon_key_here...
   ```
2. You can find these values in Supabase under **Project Settings** > **API**.

---

## ⚡ Features Included

1. **Live Enquiry Submission:**
   - When visitors submit the form on `/contact`, it directly saves into Supabase `public.enquiries`.
2. **Admin Portal (`/admin`):**
   - Access at `http://localhost:5173/admin` (or your production URL).
   - Log in with your Supabase admin credentials at `/admin/login`.
   - Real-time lead metrics (Total Leads, New, In Review, Converted).
   - Search by name, email, company, or service.
   - Filter by status (`new`, `in_review`, `contacted`, `converted`, `closed`).
   - One-click **Export to CSV**.
   - Direct Email & WhatsApp reply buttons.
