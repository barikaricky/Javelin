@echo off
echo ==========================================
echo Javelin - Clear Invalid Tokens
echo ==========================================
echo.

echo This script will clear your browser's localStorage
echo to fix JWT token errors.
echo.
echo After running this:
echo 1. Close all browser windows
echo 2. Open browser developer tools (F12)
echo 3. Go to Console tab
echo 4. Run: localStorage.clear()
echo 5. Refresh the page
echo.
echo Or simply clear browser cache and cookies for localhost:3000
echo.
echo ==========================================
echo.

echo Opening browser to localhost:3000...
start http://localhost:3000

echo.
echo Press F12 and run: localStorage.clear()
echo Then refresh the page
echo.
pause
