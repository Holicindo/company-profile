# Deployment Script for Staging
# Run this script: .\deploy-staging.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Holicindo Staging Deployment Script  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$EC2_HOST = "ubuntu@52.64.193.232"
$PROJECT_PATH = "~/company-profile"

Write-Host "🚀 Starting deployment to staging..." -ForegroundColor Yellow
Write-Host ""

# SSH Command
$sshCommand = @"
cd $PROJECT_PATH/backend && \
echo '📥 Pulling latest code from staging...' && \
git pull origin staging && \
echo '📦 Installing dependencies...' && \
npm install && \
echo '🔨 Building backend...' && \
npm run build && \
echo '🌱 Running database seeder...' && \
npx ts-node -r tsconfig-paths/register src/seeder/seed-pages.ts && \
echo '🔄 Restarting PM2 processes...' && \
pm2 restart all && \
echo '📊 Checking PM2 status...' && \
pm2 list && \
echo '' && \
echo '✅ Backend deployment complete!' && \
echo '' && \
cd $PROJECT_PATH/frontend && \
echo '📥 Pulling latest frontend code...' && \
git pull origin staging && \
echo '📦 Installing frontend dependencies...' && \
npm install && \
echo '🔨 Building frontend...' && \
npm run build && \
echo '🔄 Restarting frontend PM2...' && \
pm2 restart all && \
echo '' && \
echo '✅ Frontend deployment complete!' && \
echo '' && \
echo '🎉 Full deployment successful!' && \
echo '' && \
echo '📊 Final PM2 Status:' && \
pm2 list
"@

Write-Host "Connecting to EC2 and deploying..." -ForegroundColor Green
ssh $EC2_HOST $sshCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ DEPLOYMENT SUCCESSFUL!            " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Staging URLs:" -ForegroundColor Cyan
    Write-Host "   Frontend: https://staging.holicindo.com" -ForegroundColor White
    Write-Host "   Admin:    https://staging.holicindo.com/admin" -ForegroundColor White
    Write-Host "   Backend:  http://52.64.193.232:3011" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ❌ DEPLOYMENT FAILED!                " -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check the error messages above and try again." -ForegroundColor Yellow
    Write-Host ""
}
