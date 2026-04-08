@echo off
color 0A
echo ========================================
echo   MediTrack Setup Complete! 
echo ========================================
echo.
echo ✅ Backend installed successfully
echo ✅ Frontend installed successfully
echo.
echo ========================================
echo   HOW TO RUN THE APPLICATION
echo ========================================
echo.
echo STEP 1: Start MongoDB
echo   - Open Command Prompt and run: mongod
echo   - Keep that window open
echo.
echo STEP 2: Start Backend Server
echo   - Double-click: start-backend.bat
echo   - OR manually run:
echo     cd backend
echo     npm run dev
echo.
echo STEP 3: Start Frontend Server
echo   - Double-click: start-frontend.bat  
echo   - OR manually run:
echo     cd frontend
echo     npm run dev
echo.
echo STEP 4: Open Browser
echo   - Go to: http://localhost:3000
echo.
echo ========================================
echo   QUICK REFERENCE
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo MongoDB:  mongodb://localhost:27017/meditrack
echo.
echo Demo Accounts (Create these first):
echo   Patient: patient@demo.com / password123
echo   Doctor:  doctor@demo.com / password123
echo.
echo ========================================
echo   FEATURES
echo ========================================
echo.
echo ✓ User Registration and Login
echo ✓ Patient: Book Appointments
echo ✓ Patient: View Appointment Status
echo ✓ Doctor: View Appointments
echo ✓ Doctor: Approve/Reject Appointments
echo ✓ Department Management
echo ✓ Time Slot Selection
echo ✓ Role-Based Access Control
echo.
echo For detailed instructions, see:
echo   - README.md
echo   - QUICKSTART.md
echo.
pause
