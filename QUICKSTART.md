# 🚀 Quick Start Guide for MediTrack

## Prerequisites Check
Before starting, ensure you have:
- ✅ Node.js installed (check: `node --version`)
- ✅ MongoDB installed and running (check: `mongod --version`)

## Step-by-Step Launch Instructions

### Step 1: Start MongoDB
Open a terminal and run:
```bash
mongod
```
Keep this terminal open. MongoDB should be running on `mongodb://localhost:27017`

### Step 2: Start Backend Server
Open a NEW terminal and run:
```bash
cd "c:\Users\Nitsh raj\Desktop\PROJECT\Medical Health System\backend"
npm run dev
```
✅ Backend will start on: http://localhost:5000
Keep this terminal open.

### Step 3: Start Frontend Server
Open ANOTHER NEW terminal and run:
```bash
cd "c:\Users\Nitsh raj\Desktop\PROJECT\Medical Health System\frontend"
npm run dev
```
✅ Frontend will start on: http://localhost:3000

### Step 4: Access the Application
Open your browser and go to: **http://localhost:3000**

## 🎯 First Time Setup - Create Test Accounts

### Create a Doctor Account:
1. Click "Register here"
2. Fill in:
   - Name: Dr. Sarah Johnson
   - Email: doctor@demo.com
   - Role: Doctor
   - Department: Cardiology
   - Password: password123
   - Confirm Password: password123
3. Click Register

### Create a Patient Account:
1. Logout (if logged in)
2. Click "Register here"
3. Fill in:
   - Name: John Patient
   - Email: patient@demo.com
   - Role: Patient
   - Password: password123
   - Confirm Password: password123
4. Click Register

## 📋 Testing the Complete Flow

### As Patient:
1. Login with patient@demo.com / password123
2. Go to "Book Appointment" tab
3. Select Department: Cardiology
4. Select Doctor: Dr. Sarah Johnson
5. Choose a future date
6. Select a time slot
7. Enter reason: "Regular checkup"
8. Click "Book Appointment"
9. Go to "My Appointments" tab to see status

### As Doctor:
1. Logout from patient account
2. Login with doctor@demo.com / password123
3. View dashboard statistics
4. See pending appointments
5. Click "Approve" or "Reject" on appointments
6. Use filters to view different status appointments

## 🛠️ Troubleshooting

### MongoDB Not Running?
```bash
# Windows: Start MongoDB service
net start MongoDB

# Or run manually:
mongod
```

### Port Already in Use?
- Backend (5000): Change PORT in backend/.env
- Frontend (3000): Change port in frontend/vite.config.js

### Cannot Connect to Backend?
- Ensure backend is running on port 5000
- Check terminal for any error messages
- Verify MongoDB is running

### CORS Errors?
- Make sure both servers are running
- Backend should be on localhost:5000
- Frontend should be on localhost:3000

## 📌 Important URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MongoDB:** mongodb://localhost:27017/meditrack

## 🔑 Environment Variables

Backend `.env` file is already configured with:
- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/meditrack
- JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

## 📦 Project Features

✅ User Registration & Login
✅ Role-Based Access (Patient/Doctor)
✅ JWT Authentication
✅ Book Appointments (Patient)
✅ View Appointments
✅ Approve/Reject Appointments (Doctor)
✅ Department Selection
✅ Time Slot Management
✅ Real-time Status Updates
✅ Responsive Design
✅ Professional UI/UX

## 🎨 Departments Available
- Cardiology
- Neurology
- Orthopedics
- Pediatrics
- Dermatology
- General Medicine

## ⏰ Time Slots Available
9:00 AM - 12:00 PM, 2:00 PM - 5:00 PM
(8 slots total)

---

**Need Help?** Check the main README.md for detailed documentation.

**Happy Testing! 🏥**
