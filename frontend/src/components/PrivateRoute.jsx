import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Redirect to their own dashboard
    const redirectPath = user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard';
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default PrivateRoute;
