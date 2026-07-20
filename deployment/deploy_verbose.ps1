Write-Host "Starting Firebase Deployment..." -ForegroundColor Green
$env:GOOGLE_APPLICATION_CREDENTIALS = "c:\Users\prabh\Downloads\safety-net-18e70-firebase-adminsdk-fbsvc-f3a2414814.json"

Write-Host "Deploying to Firebase Hosting..." -ForegroundColor Yellow
firebase deploy --only hosting --project safety-net-18e70

Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Visit: https://safety-net-18e70.web.app" -ForegroundColor Cyan
