# INFRA FORGE - PowerShell Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " INFRA FORGE - Starting Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Backend
Write-Host "[1/2] Starting Backend (FastAPI)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\Holdingns\INFRA-FORGE\apps\api'; .\venv\Scripts\Activate.ps1; uvicorn app.main:app --reload"

Start-Sleep -Seconds 3

# Frontend
Write-Host "[2/2] Starting Frontend (Next.js)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\Holdingns\INFRA-FORGE\apps\web'; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Services Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  " -NoNewline; Write-Host "http://localhost:8000" -ForegroundColor Blue
Write-Host "Frontend: " -NoNewline; Write-Host "http://localhost:3008" -ForegroundColor Blue
Write-Host "API Docs: " -NoNewline; Write-Host "http://localhost:8000/docs" -ForegroundColor Blue
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window (services will keep running)..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
