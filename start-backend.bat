@echo off
echo ========================================
echo   MediTrack - Medical Appointment System
echo ========================================
echo.
echo This will start the BACKEND server...
echo.
echo Make sure MongoDB is running first!
echo.
cd backend
echo Starting backend on http://localhost:5000
npm run dev
