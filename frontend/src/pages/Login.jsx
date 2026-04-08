import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { Mail, Lock, ArrowRight, AlertCircle, Heart } from 'lucide-react';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      
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
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
            <h1>Quality Healthcare at Your Fingertips</h1>
            <p>Connect with experienced doctors and manage your appointments seamlessly</p>
            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Book appointments online</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Connect with specialists</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Manage your health records</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-circle">
              <Heart size={32} strokeWidth={2} />
            </div>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue to MediTrack Healthcare System</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="auth-form">
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
                placeholder="Enter your password"
                required
                minLength="6"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Create one now</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
