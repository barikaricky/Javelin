@echo off
title Javelin Admin - Quick Authentication Fix
color 0A
echo.
echo ========================================
echo   JAVELIN ADMIN AUTHENTICATION FIX
echo ========================================
echo.
echo This script will fix the 403 Forbidden errors
echo.

REM Step 1: Fix user roles in database
echo [1/3] Fixing user roles in MongoDB...
cd /d "%~dp0server"
node fix-user-role.js

if errorlevel 1 (
    echo.
    echo ERROR: Failed to update database!
    echo Make sure MongoDB is running.
    echo.
    pause
    exit /b 1
)

echo.
echo [2/3] Restarting backend server...
echo.
echo NOTE: You need to restart your backend server manually
echo       Press Ctrl+C in the server terminal and run: npm start
echo.

REM Step 3: Clear browser session
echo [3/3] Clear browser session:
echo.
echo ========================================
echo   ACTION REQUIRED - CLEAR YOUR BROWSER
echo ========================================
echo.
echo EASIEST METHOD: Open this link in your browser:
echo http://localhost:3000/clear-session.html
echo.
echo OR MANUAL METHOD:
echo   1. Open http://localhost:3000/admin/login
echo   2. Press F12 (open DevTools)
echo   3. Click Console tab
echo   4. Type: localStorage.clear()
echo   5. Press Enter
echo   6. Refresh the page (F5)
echo.
echo ========================================
echo.
echo After clearing, you can login with your credentials!
echo The 403 errors should be gone.
echo.
pause
