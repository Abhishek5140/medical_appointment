import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { appointmentAPI } from '../utils/api';
import { 
  Calendar, Clock, CheckCircle, XCircle, User, 
  FileText, AlertCircle, TrendingUp, Filter 
} from 'lucide-react';
import '../styles/Dashboard.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll();
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      const response = await appointmentAPI.updateStatus(appointmentId, status);
      
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: `Appointment ${status} successfully!`
        });
        fetchAppointments();
        
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update appointment'
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { icon: Clock, color: 'warning', label: 'Pending' },
      approved: { icon: CheckCircle, color: 'success', label: 'Approved' },
      rejected: { icon: XCircle, color: 'danger', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`badge badge-${config.color}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    approved: appointments.filter((a) => a.status === 'approved').length,
    rejected: appointments.filter((a) => a.status === 'rejected').length
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar activeTab={filter} setActiveTab={setFilter} />
        <div className="dashboard-main">
          <Navbar />
          <div className="dashboard-content">
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading appointments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={filter} setActiveTab={setFilter} />
      
      <div className="dashboard-main">
        <Navbar />
        
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div className="dashboard-welcome">
              <div className="welcome-content">
                <h1>Appointments Overview</h1>
                <p>Manage and review patient appointment requests</p>
              </div>
              <div className="doctor-profile-badge">
                <div className="doctor-profile-photo">
                  <img
                    src="https://ui-avatars.com/api/?name=Doctor&background=0f4c75&color=fff&size=120&bold=true"
                    alt="Doctor"
                  />
                </div>
              </div>
            </div>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type}`}>
              <AlertCircle size={18} />
              <span>{message.text}</span>
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-card stat-card-primary">
              <div className="stat-icon">
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.total}</h3>
                <p>Total Appointments</p>
              </div>
              <div className="stat-trend">
                <TrendingUp size={16} />
                <span>+12%</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-warning">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.pending}</h3>
                <p>Pending Review</p>
              </div>
              <div className="stat-trend">
                <span>{stats.pending} awaiting</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-success">
              <div className="stat-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.approved}</h3>
                <p>Approved</p>
              </div>
              <div className="stat-trend">
                <span>{Math.round((stats.approved / stats.total) * 100) || 0}% rate</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-danger">
              <div className="stat-icon">
                <XCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats.rejected}</h3>
                <p>Rejected</p>
              </div>
              <div className="stat-trend">
                <span>{Math.round((stats.rejected / stats.total) * 100) || 0}% rate</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>
                <FileText size={20} />
                Appointment Requests
              </h2>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({appointments.length})
                </button>
                <button
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
                  onClick={() => setFilter('approved')}
                >
                  Approved ({stats.approved})
                </button>
                <button
                  className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
                  onClick={() => setFilter('rejected')}
                >
                  Rejected ({stats.rejected})
                </button>
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Calendar size={48} />
                </div>
                <h3>No appointments found</h3>
                <p>
                  {filter === 'all'
                    ? 'You have no appointment requests yet'
                    : `No ${filter} appointments at the moment`}
                </p>
              </div>
            ) : (
              <div className="appointments-table">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment._id} className="appointment-row">
                    <div className="appointment-patient">
                      <div className="patient-avatar">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            appointment.patientName
                          )}&background=0f4c75&color=fff&size=80&bold=true`}
                          alt={appointment.patientName}
                        />
                      </div>
                      <div className="patient-info">
                        <h4>{appointment.patientName}</h4>
                        <span className="department-badge">{appointment.department}</span>
                      </div>
                    </div>

                    <div className="appointment-details">
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="detail-item">
                        <Clock size={16} />
                        <span>{appointment.timeSlot}</span>
                      </div>
                    </div>

                    <div className="appointment-reason">
                      <p>{appointment.reason}</p>
                    </div>

                    <div className="appointment-status">
                      {getStatusBadge(appointment.status)}
                    </div>

                    {appointment.status === 'pending' && (
                      <div className="appointment-actions">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            handleStatusUpdate(appointment._id, 'approved')
                          }
                          title="Approve appointment"
                        >
                          <CheckCircle size={16} />
                          <span>Approve</span>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleStatusUpdate(appointment._id, 'rejected')
                          }
                          title="Reject appointment"
                        >
                          <XCircle size={16} />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
