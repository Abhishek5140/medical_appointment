# 🏥 MediTrack - Medical Appointment Management System

A full-stack MERN application for managing medical appointments with role-based access control for Patients and Doctors.

## 📋 Project Overview

MediTrack is a professional Medical Appointment Management System that allows:
- **Patients** to book appointments with doctors and view their appointment history
- **Doctors** to view, approve, or reject appointment requests

## 🛠️ Technologies Used

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- CSS3 (Custom Styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js

## ✨ Features

### Authentication
- User registration with role selection (Patient/Doctor)
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Protected routes based on user roles

### Patient Features
- Book appointments with doctors
- Select department and doctor
- Choose date and time slot
- View all appointments with status
- Real-time appointment status updates

### Doctor Features
- View all assigned appointments
- Approve or reject appointment requests
- Dashboard with statistics
- Filter appointments by status
- Department-based assignment

### Security
- JWT-based authentication
- Role-based access control
- Protected API routes
- Password encryption

## 📁 Project Structure

```
Medical Health System/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── appointmentRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── PatientDashboard.jsx
    │   │   └── DoctorDashboard.jsx
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   └── Navbar.css
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone or Navigate to Project Directory
```bash
cd "c:\Users\Nitsh raj\Desktop\PROJECT\Medical Health System"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file and update MongoDB URI if needed
# Default: mongodb://localhost:27017/meditrack

# Start the backend server
npm run dev
```

The backend will run on **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:3000**

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Make sure MongoDB is installed and running
mongod
```

#### Option B: MongoDB Atlas
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `backend/.env`

## 📝 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Appointment Routes
- `POST /api/appointments` - Create appointment (Patient only)
- `GET /api/appointments` - Get appointments (Patient & Doctor)
- `PUT /api/appointments/:id` - Update appointment status (Doctor only)
- `GET /api/appointments/doctors` - Get all doctors
- `GET /api/appointments/doctors/:department` - Get doctors by department

## 👥 User Roles

### Patient
- Can register and login
- Can book appointments
- Can view their own appointments
- Cannot approve/reject appointments

### Doctor
- Can register with department
- Can login
- Can view appointments assigned to them
- Can approve or reject appointments
- Cannot book appointments

## 🎨 Features Demonstration

### Registration
1. Go to `/register`
2. Fill in details
3. Select role (Patient or Doctor)
4. If Doctor, select department
5. Submit to create account

### Patient Workflow
1. Login as patient
2. Click "Book Appointment"
3. Select department
4. Choose doctor
5. Select date and time slot
6. Enter reason for visit
7. Submit appointment
8. View status in "My Appointments"

### Doctor Workflow
1. Login as doctor
2. View dashboard with statistics
3. See all appointment requests
4. Filter by status (Pending/Approved/Rejected)
5. Approve or reject pending appointments

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes on both frontend and backend
- Role-based access control middleware
- Input validation
- Secure HTTP headers

## 📦 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: Enum ['patient', 'doctor'],
  department: String (required for doctors),
  timestamps: true
}
```

### Appointment Schema
```javascript
{
  patientId: ObjectId (ref: User),
  patientName: String,
  doctorId: ObjectId (ref: User),
  doctorName: String,
  department: Enum,
  date: String,
  timeSlot: Enum,
  status: Enum ['pending', 'approved', 'rejected'],
  reason: String,
  timestamps: true
}
```

## 🎯 Available Departments
- Cardiology
- Neurology
- Orthopedics
- Pediatrics
- Dermatology
- General Medicine

## 🎯 Available Time Slots
- 09:00 AM
- 10:00 AM
- 11:00 AM
- 12:00 PM
- 02:00 PM
- 03:00 PM
- 04:00 PM
- 05:00 PM

## 🧪 Testing the Application

### Create Test Users

1. **Register a Doctor**
   - Name: Dr. John Smith
   - Email: doctor@test.com
   - Password: password123
   - Role: Doctor
   - Department: Cardiology

2. **Register a Patient**
   - Name: Jane Doe
   - Email: patient@test.com
   - Password: password123
   - Role: Patient

3. **Test Appointment Flow**
   - Login as patient
   - Book appointment with the doctor
   - Logout
   - Login as doctor
   - View and approve/reject the appointment

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the MONGODB_URI in .env file
- Verify network connectivity

### Port Already in Use
- Backend (5000): Change PORT in .env
- Frontend (3000): Change port in vite.config.js

### CORS Errors
- Ensure backend is running on port 5000
- Check CORS configuration in server.js

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created for the MediTrack Graded Project

## 📞 Support

For issues or questions, please check:
1. MongoDB is running
2. All dependencies are installed
3. Environment variables are correctly set
4. Both frontend and backend servers are running

---

**Happy Coding! 🚀**
