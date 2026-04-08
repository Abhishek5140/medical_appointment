import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute role="patient">
                <PatientDashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute role="doctor">
                <DoctorDashboard />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
