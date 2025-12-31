#!/bin/bash

echo "======================================"
echo "   INFRA FORGE - Quick Start"
echo "   \"Where Smart Contracts Are Born\""
echo "======================================"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "[ERROR] .env file not found!"
    echo "Please copy .env.example to .env and configure it."
    exit 1
fi

echo "Starting INFRA FORGE..."
echo ""

# Start Frontend
echo "[1/2] Starting Frontend (Next.js)..."
cd apps/web
gnome-terminal --title="INFRA FORGE - Frontend" -- bash -c "npm run dev; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && npm run dev"' 2>/dev/null || \
(npm run dev &)
cd ../..

sleep 3

# Start Backend
echo "[2/2] Starting Backend (FastAPI)..."
cd apps/api
gnome-terminal --title="INFRA FORGE - Backend" -- bash -c "source venv/bin/activate && uvicorn app.main:app --reload; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && source venv/bin/activate && uvicorn app.main:app --reload"' 2>/dev/null || \
(source venv/bin/activate && uvicorn app.main:app --reload &)
cd ../..

echo ""
echo "======================================"
echo "INFRA FORGE is starting..."
echo "======================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Opening application in browser..."

# Open browser
sleep 5
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000
elif command -v open > /dev/null; then
    open http://localhost:3000
fi

echo ""
echo "Press Ctrl+C to stop the servers"
