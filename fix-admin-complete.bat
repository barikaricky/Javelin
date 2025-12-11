@echo off
echo ====================================
echo   JAVELIN ADMIN - COMPLETE FIX
echo ====================================
echo.

echo Step 1: Fixing user roles in database...
cd /d "%~dp0server"
node fix-user-role.js
echo.

echo Step 2: Instructions for clearing browser session...
echo.
echo =====================================
echo   IMPORTANT: Clear Your Browser
echo =====================================
echo.
echo Option 1: Use the clear session page
echo    1. Open http://localhost:3000/clear-session.html
echo    2. Click "Clear Session Data"
echo.
echo Option 2: Manual browser clear
echo    1. Press F12 in your browser
echo    2. Go to Console tab
echo    3. Type: localStorage.clear()
echo    4. Press Enter
echo    5. Refresh the page (F5)
echo.
echo Option 3: Browser DevTools Application tab
echo    1. Press F12 in your browser
echo    2. Go to Application tab
echo    3. Click "Local Storage" -^> "http://localhost:3000"
echo    4. Right-click and select "Clear"
echo.
echo =====================================
echo.
echo After clearing browser session:
echo    1. Go to http://localhost:3000/admin/login
echo    2. Login with your email and password
echo    3. You should now have full admin access!
echo.
pause
