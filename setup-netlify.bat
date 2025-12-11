@echo off
REM Netlify Deployment Setup Script for Windows

echo ============================================
echo Javelin Associates - Netlify Setup
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install it first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Install serverless-http in server
echo 📦 Installing serverless-http...
cd server
call npm install serverless-http
if %errorlevel% neq 0 (
    echo ❌ Failed to install serverless-http
    cd ..
    exit /b 1
)
echo ✅ serverless-http installed
cd ..
echo.

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    cd ..
    exit /b 1
)
echo ✅ Client dependencies installed
cd ..
echo.

echo ============================================
echo ✅ Setup Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Review NETLIFY-DEPLOYMENT.md
echo 2. Configure .env files (server/.env)
echo 3. Push to GitHub
echo 4. Connect to Netlify at https://app.netlify.com
echo.
echo To test locally:
echo   Command Prompt 1: cd server ^&^& npm start
echo   Command Prompt 2: cd client ^&^& npm start
echo.
pause
