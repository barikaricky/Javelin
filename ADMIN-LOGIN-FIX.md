# Admin Portal Access - Complete Fix Guide

## Problem
The admin portal at `https://www.javelinassociates.org/admin/login` shows 404 error.

## Root Cause
The `.htaccess` file for React SPA routing is not being deployed to cPanel.

## Solution - Step by Step

### Step 1: Clean Build
```bash
cd client
npm run build
```
This will include the `.htaccess` file in the build folder.

### Step 2: Delete Old Build on cPanel
1. Go to cPanel File Manager
2. Navigate to your public_html or domain root
3. Delete ALL existing files (index.html, static/, etc.)

### Step 3: Upload New Build
1. Upload EVERYTHING from `client/build/` to your cPanel public_html:
   - index.html
   - **`.htaccess`** (IMPORTANT - make sure this file is uploaded)
   - static/ folder
   - All other files

### Step 4: Verify .htaccess
In cPanel, check that `.htaccess` exists in your public_html root:
- Show hidden files in File Manager (settings icon)
- Look for `.htaccess` file
- Content should contain the rewrite rules

### Step 5: Test Access
Visit: `https://www.javelinassociates.org/admin/login`
- Should now load the login page (not 404)
- No page refresh = React is handling routing correctly

### Step 6: Verify Backend API
1. Open DevTools (F12)
2. Go to Network tab
3. Try login with test credentials
4. Check that API calls go to: `https://javelinassocaite.netlify.app/api/...`
5. Response should be 200 (success) or 401 (wrong password), NOT 404

## Quick Checklist
- [ ] Ran `npm run build` locally
- [ ] Deleted old files from cPanel
- [ ] Uploaded entire `client/build/` folder
- [ ] Confirmed `.htaccess` is in public_html
- [ ] Can access `/admin/login` without 404
- [ ] DevTools shows API calls to backend
- [ ] Backend has all env vars set

## If Still Not Working

### Option A: Check Server Logs
cPanel → Error Log (watch for rewrite errors)

### Option B: Force Apache to Load Rules
Add to `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Option C: Contact cPanel Support
Ask if mod_rewrite is enabled (usually is by default).

---

## Admin Login Credentials
- URL: `https://www.javelinassociates.org/admin/login`
- Backend: `https://javelinassocaite.netlify.app/api`
- Once logged in, you can upload images in Gallery/Team/News managers

## Upload Images Path
After login:
1. Go to Admin Dashboard
2. Select: Gallery Manager, Team Manager, or News Manager
3. Upload images (Cloudinary handles storage)
