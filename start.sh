#!/bin/bash

# ModelSphere - Startup Script for macOS/Linux

echo "========================================"
echo "ModelSphere Application Startup"
echo "========================================"
echo ""

# Start backend
echo "Starting Backend Server..."
python backend.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting Frontend Server..."
npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Application Started"
echo "========================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend API: http://127.0.0.1:8000"
echo "API Docs: http://127.0.0.1:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user to stop
wait

# Cleanup
kill $BACKEND_PID 2>/dev/null
kill $FRONTEND_PID 2>/dev/null
