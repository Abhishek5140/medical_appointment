import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { Mail, Lock, User as UserIcon, Briefcase, ArrowRight, AlertCircle, Heart } from 'lucide-react';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    department: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword, role, department } = formData;

  const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine'
  ];

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (role === 'doctor' && !department) {
      setError('Please select a department for doctor registration');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name,
        email,
        password,
        role
      };

      if (role === 'doctor') {
        userData.department = department;
      }

      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        const { data } = response.data;
        login(data, data.token);
        
        // Redirect based on role
        if (data.role === 'patient') {
          navigate('/patient/dashboard');
        } else if (data.role === 'doctor') {
          navigate('/doctor/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-pattern"></div>
        <div className="hospital-image-overlay"></div>
      </div>
      
      <div className="auth-split-layout">
        <div className="auth-hero">
          <div className="hero-content">
            <div className="hospital-badge">
              <Heart size={24} className="pulse-icon" />
              <span>MediTrack Healthcare</span>
            </div>
            <h1>Join Our Healthcare Community</h1>
            <p>Register as a patient or healthcare provider and experience modern medical care</p>
            <div className="hero-stats">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Doctors</p>
              </div>
              <div className="stat-item">
                <h3>10k+</h3>
                <p>Patients</p>
              </div>
              <div className="stat-item">
                <h3>50k+</h3>
                <p>Appointments</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="auth-card auth-card-register">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-circle">
              <Heart size={32} strokeWidth={2} />
            </div>
          </div>
          <h1>Create Account</h1>
          <p>Join MediTrack for seamless healthcare management</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <UserIcon size={20} className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Register As</label>
            <div className="input-with-icon">
              <Briefcase size={20} className="input-icon" />
              <select
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                className="form-control"
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>

          {role === 'doctor' && (
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <div className="input-with-icon">
                <Briefcase size={20} className="input-icon" />
                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={onChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Enter password"
                  required
                  minLength="6"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  className="form-control"
                  placeholder="Confirm password"
                  required
                  minLength="6"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
