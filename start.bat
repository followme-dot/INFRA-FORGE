@echo off
echo ======================================
echo    INFRA FORGE - Quick Start
echo    "Where Smart Contracts Are Born"
echo ======================================
echo.

echo Checking environment...
if not exist ".env" (
    echo [ERROR] .env file not found!
    echo Please copy .env.example to .env and configure it.
    pause
    exit /b 1
)

echo.
echo Starting INFRA FORGE...
echo.

echo [1/2] Starting Frontend (Next.js)...
start "INFRA FORGE - Frontend" cmd /k "cd apps\web && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Backend (FastAPI)...
start "INFRA FORGE - Backend" cmd /k "cd apps\api && venv\Scripts\activate && uvicorn app.main:app --reload"

echo.
echo ======================================
echo INFRA FORGE is starting...
echo ======================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to open the application...
pause > nul

start http://localhost:3000

exit
