@echo off
echo ==========================================
echo Deploying CORS Fix to Netlify
echo ==========================================

echo 1. Installing server dependencies...
cd server
call npm install
cd ..

echo 2. Deploying to Netlify (Production)...
echo You may be asked to authorize or select the site.
set NETLIFY_CMD=netlify
where %NETLIFY_CMD% >nul 2>nul
if %errorlevel% neq 0 (
	echo Netlify CLI not found. Using npx to download it temporarily...
	set NETLIFY_CMD=npx netlify
)

%NETLIFY_CMD% deploy --prod --dir server/public --functions server/netlify/functions

echo.
echo ==========================================
echo Deployment Complete!
echo Please wait 1-2 minutes for changes to propagate.
echo Then try logging in on the frontend.
echo ==========================================
pause
