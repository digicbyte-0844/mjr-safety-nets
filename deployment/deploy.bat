@echo off
echo ================================
echo Firebase Hosting Deployment
echo ================================
echo.

set GOOGLE_APPLICATION_CREDENTIALS=c:\Users\prabh\Downloads\safety-net-18e70-firebase-adminsdk-fbsvc-f3a2414814.json

echo Setting up environment...
echo Project: safety-net-18e70
echo.

echo Starting deployment...
call npx firebase deploy --only hosting --project safety-net-18e70 --non-interactive

echo.
echo ================================
echo Deployment script finished!
echo Visit: https://safety-net-18e70.web.app
echo ================================
pause
