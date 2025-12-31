@echo off
echo ========================================
echo  INFRA FORGE - Starting Services
echo ========================================
echo.

echo [1/2] Starting Backend (FastAPI)...
start "INFRA FORGE Backend" cmd /k "cd apps\api && venv\Scripts\activate && uvicorn app.main:app --reload"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend (Next.js)...
start "INFRA FORGE Frontend" cmd /k "cd apps\web && npm run dev"

echo.
echo ========================================
echo  Services Started!
echo ========================================
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:3008
echo  API Docs: http://localhost:8000/docs
echo ========================================
echo.
echo Press any key to exit (services will keep running)...
pause >nul
