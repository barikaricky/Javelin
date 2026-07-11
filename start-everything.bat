@echo off
echo ========================================
echo Javelin Associates - Complete Setup
echo ========================================
echo.

echo Step 1: Starting Backend Server...
start cmd /k "cd server && npm start"
timeout /t 3

echo.
echo Step 2: Starting Frontend...
start cmd /k "cd client && npm start"

echo.
echo Step 3: Seeding Gallery (Optional)...
choice /c YN /m "Do you want to seed the gallery with images"
if errorlevel 2 goto :skip_seed
if errorlevel 1 goto :do_seed

:do_seed
start cmd /k "cd server && node seed-gallery.js"
goto :end

:skip_seed
echo Skipping gallery seed...

:end
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Admin Registration: http://localhost:3000/admin/register
echo Admin Login: http://localhost:3000/admin/login
echo Main Site: http://localhost:3000
echo.
echo Available Admin Features:
echo - Dashboard (Overview)
echo - Appointments (Process quote requests)
echo - Team Management
echo - Sites Management
echo - Gallery Management
echo - News Management
echo - Messages
echo - Contact Info
echo.
pause
