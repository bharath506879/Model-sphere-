@echo off
REM ModelSphere - Startup Script for Windows

echo ========================================
echo ModelSphere Application Startup
echo ========================================
echo.

REM Check if backend is already running
timeout /t 2 /nobreak

echo Starting Backend Server...
start "ModelSphere Backend" python backend.py

REM Wait for backend to start
timeout /t 3 /nobreak

echo Starting Frontend Server...
start "ModelSphere Frontend" npm start

echo.
echo ========================================
echo Application Starting
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://127.0.0.1:8000
echo API Docs: http://127.0.0.1:8000/docs
echo.
echo Close the terminal windows to stop the servers
echo.
