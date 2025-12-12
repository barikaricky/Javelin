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
call netlify deploy --prod --dir server/public --functions server/netlify/functions

echo.
echo ==========================================
echo Deployment Complete!
echo Please wait 1-2 minutes for changes to propagate.
echo Then try logging in on the frontend.
echo ==========================================
pause
