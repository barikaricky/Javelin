# 🔧 FIX: 403 Forbidden Admin Dashboard Errors

## Problem
Admin dashboard showing 403 Forbidden errors on all API calls, preventing data upload and management.

## Root Cause
1. **JWT Token Mismatch**: Old/invalid tokens stored in browser
2. **User Role Issue**: User might not have 'admin' role set in database
3. **Inactive Account**: User account might be marked as inactive

## ✅ SOLUTION - Follow These Steps:

### Step 1: Fix User Roles in Database

Run this command in terminal:
```bash
cd server
node fix-user-role.js
```

This script will:
- Connect to MongoDB
- Find all users
- Set their role to 'admin'
- Activate all accounts
- Show you the results

### Step 2: Clear Browser Session

**OPTION A: Use the Clear Session Page (Easiest)**
1. Open in browser: `http://localhost:3000/clear-session.html`
2. Click "Clear Session Data" button
3. You'll be redirected to login

**OPTION B: Manual Browser Clear**
1. Open `http://localhost:3000/admin/login`
2. Press `F12` (open DevTools)
3. Click `Console` tab
4. Type: `localStorage.clear()`
5. Press `Enter`
6. Refresh page (`F5`)

**OPTION C: DevTools Application Tab**
1. Press `F12` in browser
2. Go to `Application` tab
3. Expand `Local Storage` → `http://localhost:3000`
4. Right-click → `Clear`
5. Refresh page

### Step 3: Restart Backend Server

1. In your server terminal, press `Ctrl+C`
2. Run: `npm start`
3. Wait for "Server running on port 5000"

### Step 4: Login Again

1. Go to `http://localhost:3000/admin/login`
2. Enter your email and password
3. Click Login

**✨ All 403 errors should now be gone!**

## Verify It's Working

After login, check the backend terminal. You should see:
```
🔐 Token received, verifying...
✅ Token verified, user ID: xxxxx
✅ User found: your-email@example.com Role: admin
✅ Admin access granted
```

If you still see errors, check:
1. MongoDB is running
2. Backend server is running (port 5000)
3. Frontend is running (port 3000)
4. Browser localStorage is completely cleared

## What This Fixed

1. ✅ Updated user role to 'admin' in database
2. ✅ Cleared invalid JWT tokens from browser
3. ✅ Added better error logging in backend
4. ✅ Ensured JWT secret consistency
5. ✅ Activated user account

## Backend Changes Made

### `server/middleware/auth.js`
- Fixed JWT secret consistency
- Added detailed console logging
- Better error messages showing user role vs required role

### `server/fix-user-role.js` (NEW)
- Script to fix user roles in database
- Makes all users 'admin' and active

### `client/public/clear-session.html` (NEW)
- Web page to clear browser session
- Shows current session status
- One-click clear button

## Common Issues

### "No users found in database"
➜ You need to register first at `/admin/register`

### Still getting 403 after fix
➜ Make sure you:
   1. Cleared browser localStorage completely
   2. Restarted backend server
   3. Logged in again with fresh credentials

### Token still invalid
➜ Check backend terminal for JWT errors
➜ Make sure you're using the same JWT_SECRET

## Next Steps

Once login works:
1. ✅ Upload team members
2. ✅ Add operational sites
3. ✅ Upload gallery images
4. ✅ Create news posts
5. ✅ Manage appointments
6. ✅ View messages

## Need Help?

Check backend terminal for these logs:
- 🔐 Token received, verifying...
- ✅ Token verified
- ✅ User found: [email] Role: [role]
- ✅ Admin access granted

If you see ❌ errors, they will tell you exactly what's wrong.
