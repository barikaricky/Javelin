@echo off
echo ================================
echo Javelin Associates - Gallery Setup
echo ================================
echo.

cd server

echo Installing dependencies...
call npm install

echo.
echo Seeding gallery with images...
node seed-gallery.js

echo.
echo ================================
echo Gallery setup complete!
echo ================================
echo.
echo You can now:
echo 1. Login to admin panel at http://localhost:3000/admin/login
echo 2. View gallery items in Gallery Manager
echo 3. Process appointments in Appointments Manager
echo.
pause
