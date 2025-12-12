# Complete Setup Guide - Admin Portal & Image Upload

## Current Status
- ✅ Backend: `https://javelinassocaite.netlify.app`
- ✅ Frontend API URL: Updated to point to backend
- ✅ Admin routing: Configured in React
- ⚠️ Issue: `.htaccess` may not be deployed to cPanel

---

## SOLUTION: Deploy Admin Portal to cPanel

### Step 1: Rebuild Frontend Locally
```bash
cd client
npm install
npm run build
```

This creates `client/build/` with ALL files including `.htaccess`

### Step 2: Delete Old Files from cPanel
1. Login to cPanel
2. Open **File Manager**
3. Navigate to `public_html` (your domain root)
4. **DELETE EVERYTHING** in public_html:
   - index.html
   - static/ folder
   - manifest.json
   - favicon.ico
   - robots.txt
   - **.htaccess** (if exists)
   - Any other files

### Step 3: Upload New Build
1. Open `client/build/` folder on your computer
2. **Select ALL files** (Ctrl+A on Windows/Cmd+A on Mac):
   - index.html
   - static/ (folder)
   - public/ files
   - **`.htaccess`** ← MOST IMPORTANT (this enables admin routes)
   - manifest.json
   - favicon.ico
   - robots.txt
3. **Upload all to cPanel public_html**

### Step 4: Verify .htaccess Uploaded
In cPanel File Manager:
1. Click **Settings icon** (top right)
2. Check **"Show Hidden Files"**
3. Look in public_html for `.htaccess` file
4. If found ✅, you're good
5. If NOT found ❌, re-upload it manually

### Step 5: Clear Browser Cache
```
Ctrl+Shift+Delete (Chrome/Firefox)
Cmd+Shift+Delete (Mac Chrome)
```

Then visit: **https://www.javelinassociates.org/admin/login**

---

## Expected Results

✅ **If Working:**
- URL shows: `https://www.javelinassociates.org/admin/login`
- Page loads (not 404)
- Login form appears

❌ **If Still 404:**
1. Check `.htaccess` exists in public_html
2. Try clearing browser cache again
3. Wait 5 minutes (cPanel cache)
4. Try in incognito/private window

---

## Admin Login

**URL:** `https://www.javelinassociates.org/admin/login`

**Default Admin Credentials:**
- Email: `admin@javelinassociates.com`
- Password: Check your MongoDB admin user (or create one via backend)

**Or Register New Admin:**
1. Go to: `https://www.javelinassociates.org/admin/register`
2. Create admin account
3. Login

---

## Upload Images After Login

Once logged in:

### For Gallery:
1. Click **Gallery Manager** (left sidebar)
2. Click **Add Image** button
3. Select image from computer
4. Add title, category, description
5. Click **Upload**
6. Cloudinary handles storage automatically

### For Team:
1. Click **Team Manager**
2. Add team member name, role, image
3. Click **Upload**

### For News:
1. Click **News Manager**
2. Create article title, content, featured image
3. Click **Upload**

---

## Troubleshooting

### Issue: Still Getting 404 on `/admin/login`

**Solution A: Re-upload .htaccess manually**
```
File Name: .htaccess
Content:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

**Solution B: Check cPanel Error Logs**
- Go to cPanel > Error Log
- Look for rewrite errors
- Share errors with support

### Issue: API Calls Return 404

**Check:**
1. DevTools (F12) → Network tab
2. Check request URL shows: `https://javelinassocaite.netlify.app/api/...`
3. If shows wrong URL, rebuild frontend again

**Check Backend Env Vars:**
- Go to: `https://app.netlify.com/sites/javelinassocaite/settings/deploys#environment`
- Verify all variables are set (MONGODB_URI, JWT_SECRET, etc.)

### Issue: Login Fails After Entering Credentials

**Possible Causes:**
1. Backend not deployed
2. Wrong credentials
3. Database connection issue
4. CORS headers blocked

**Fix:**
1. Check backend at: `https://javelinassocaite.netlify.app/api/health`
   - Should show: `{"status":"ok","message":"Server is running on Netlify"}`
2. Verify admin user exists in MongoDB
3. Check browser DevTools Console for error messages

---

## Quick Checklist
- [ ] Ran `npm run build` in client folder
- [ ] Deleted old files from cPanel public_html
- [ ] Uploaded entire `client/build/` to public_html
- [ ] Confirmed `.htaccess` exists in public_html
- [ ] Cleared browser cache (Ctrl+Shift+Delete)
- [ ] Can access `https://www.javelinassociates.org/admin/login`
- [ ] Login works with valid credentials
- [ ] Can upload images in Gallery/Team managers
- [ ] Images appear on public website

---

## Success Indicators

✅ Admin portal works when:
1. `/admin/login` loads without 404
2. Login redirects to dashboard after successful auth
3. Images upload to Cloudinary successfully
4. Images appear on public pages (gallery, team, etc.)

All set! You now have a fully functional admin portal for managing your security company website.
