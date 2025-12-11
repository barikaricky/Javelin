@echo off
echo ==========================================
echo Javelin Associates - System Test
echo ==========================================
echo.

echo Checking if servers are running...
echo.

REM Test backend
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Backend server is not running!
    echo Please start: cd server ^&^& npm start
    echo.
) else (
    echo [OK] Backend server is running
)

REM Test frontend
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Frontend server is not running!
    echo Please start: cd client ^&^& npm start
    echo.
) else (
    echo [OK] Frontend server is running
)

echo.
echo ==========================================
echo Testing API Endpoints
echo ==========================================
echo.

echo Testing Team API...
curl -s http://localhost:5000/api/team | findstr "success" >nul
if %errorlevel% equ 0 (echo [OK] Team API working) else (echo [WARN] Team API issue)

echo Testing Sites API...
curl -s http://localhost:5000/api/sites | findstr "success" >nul
if %errorlevel% equ 0 (echo [OK] Sites API working) else (echo [WARN] Sites API issue)

echo Testing Gallery API...
curl -s http://localhost:5000/api/gallery | findstr "success" >nul
if %errorlevel% equ 0 (echo [OK] Gallery API working) else (echo [WARN] Gallery API issue)

echo Testing News API...
curl -s http://localhost:5000/api/news | findstr "success" >nul
if %errorlevel% equ 0 (echo [OK] News API working) else (echo [WARN] News API issue)

echo.
echo ==========================================
echo Public Pages (Frontend)
echo ==========================================
echo.
echo Team Page: http://localhost:3000/team
echo Sites Page: http://localhost:3000/our-sites
echo Gallery Page: http://localhost:3000/gallery
echo News Page: http://localhost:3000/news
echo.
echo ==========================================
echo Admin Panel
echo ==========================================
echo.
echo Register: http://localhost:3000/admin/register
echo Login: http://localhost:3000/admin/login
echo.
echo After login, manage:
echo - Team: http://localhost:3000/admin/team
echo - Sites: http://localhost:3000/admin/sites
echo - Gallery: http://localhost:3000/admin/gallery
echo - News: http://localhost:3000/admin/news
echo.
echo ==========================================
echo.
pause
