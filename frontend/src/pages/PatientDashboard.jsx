import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { appointmentAPI } from '../utils/api';
import { 
  Calendar, Clock, CheckCircle, XCircle, User, 
  Stethoscope, MapPin, FileText, AlertCircle, Plus 
} from 'lucide-react';
import '../styles/Dashboard.css';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    department: '',
    doctorId: '',
    date: '',
    timeSlot: '',
    reason: ''
  });

  const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine'
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (formData.department) {
      const filtered = doctors.filter(
        (doctor) => doctor.department === formData.department
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [formData.department, doctors]);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll();
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await appointmentAPI.getDoctors();
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'department') {
      setFormData({ ...formData, department: e.target.value, doctorId: '' });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const response = await appointmentAPI.create(formData);
      
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Appointment booked successfully!' });
        setFormData({
          department: '',
          doctorId: '',
          date: '',
          timeSlot: '',
          reason: ''
        });
        fetchAppointments();
        setTimeout(() => setActiveTab('view'), 2000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to book appointment'
      });
    } finally {
      setLoading(false);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="dashboard-main">
        <Navbar />
        
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1>
                {activeTab === 'book' ? 'Book Appointment' : 'My Appointments'}
              </h1>
              <p>
                {activeTab === 'book' 
                  ? 'Schedule a new appointment with our healthcare professionals'
                  : 'View and manage your appointment history'}
              </p>
            </div>
          </div>

          {activeTab === 'book' && (
            <div className="card">
              <div className="card-header">
                <h2>
                  <Plus size={20} />
                  New Appointment
                </h2>
              </div>
              
              {message.text && (
                <div className={`alert alert-${message.type}`}>
                  <AlertCircle size={18} />
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className="appointment-form">
                <div className="form-group">
                  <label htmlFor="department">
                    <Stethoscope size={16} />
                    Select Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={onChange}
                    className="form-control"
                    required
                  >
                    <option value="">Choose a department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.department && (
                  <div className="form-group">
                    <label htmlFor="doctorId">
                      <User size={16} />
                      Select Doctor *
                    </label>
                    {filteredDoctors.length > 0 ? (
                      <div className="doctor-selection-grid">
                        {filteredDoctors.map((doctor) => (
                          <div
                            key={doctor._id}
                            className={`doctor-card-select ${
                              formData.doctorId === doctor._id ? 'selected' : ''
                            }`}
                            onClick={() =>
                              setFormData({ ...formData, doctorId: doctor._id })
                            }
                          >
                            <div className="doctor-photo">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  doctor.name
                                )}&background=3aafa9&color=fff&size=80&bold=true`}
                                alt={doctor.name}
                              />
                              <div className="doctor-badge">{doctor.department}</div>
                            </div>
                            <div className="doctor-info">
                              <h4>Dr. {doctor.name}</h4>
                              <p className="doctor-specialty">{doctor.department}</p>
                              {formData.doctorId === doctor._id && (
                                <div className="selected-badge">
                                  <CheckCircle size={16} /> Selected
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <small className="form-hint">
                        No doctors available in this department
                      </small>
                    )}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">
                      <Calendar size={16} />
                      Select Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={onChange}
                      className="form-control"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeSlot">
                      <Clock size={16} />
                      Select Time Slot *
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={onChange}
                      className="form-control"
                      required
                    >
                      <option value="">Choose a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reason">
                    <FileText size={16} />
                    Reason for Visit *
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={onChange}
                    className="form-control"
                    rows="4"
                    placeholder="Please describe your symptoms or reason for visit"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Booking...</span>
                  ) : (
                    <>
                      <Calendar size={18} />
                      <span>Book Appointment</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'view' && (
            <div className="card">
              <div className="card-header">
                <h2>
                  <FileText size={20} />
                  Appointment History
                </h2>
                <span className="appointment-count">
                  {appointments.length} {appointments.length === 1 ? 'Appointment' : 'Appointments'}
                </span>
              </div>
              
              {appointments.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Calendar size={48} />
                  </div>
                  <h3>No appointments yet</h3>
                  <p>Book your first appointment to get started</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('book')}
                  >
                    <Plus size={18} />
                    <span>Book Appointment</span>
                  </button>
                </div>
              ) : (
                <div className="appointments-table">
                  {appointments.map((appointment) => (
                    <div key={appointment._id} className="appointment-row patient-appointment">
                      <div className="appointment-doctor">
                        <div className="doctor-avatar">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              appointment.doctorName
                            )}&background=3aafa9&color=fff&size=80&bold=true`}
                            alt={`Dr. ${appointment.doctorName}`}
                          />
                        </div>
                        <div className="doctor-info">
                          <h4>Dr. {appointment.doctorName}</h4>
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
