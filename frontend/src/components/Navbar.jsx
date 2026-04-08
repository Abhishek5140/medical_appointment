import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, User, LogOut, ChevronDown, Calendar, CheckCircle, Clock } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock notifications - in real app, fetch from backend
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: user?.role === 'doctor' ? 'New Appointment Request' : 'Appointment Confirmed',
      message: user?.role === 'doctor' 
        ? 'New appointment request from John Doe' 
        : 'Your appointment with Dr. Smith has been confirmed',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Upcoming Appointment',
      message: user?.role === 'doctor'
        ? 'You have 3 appointments today'
        : 'Your appointment is tomorrow at 2:00 PM',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: user?.role === 'doctor' ? 'Appointment Completed' : 'Appointment Approved',
      message: user?.role === 'doctor'
        ? 'Appointment with Jane Smith marked complete'
        : 'Your cardiology appointment has been approved',
      time: '2 hours ago',
      read: true
    }
  ]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'U';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'appointment': return <Calendar size={16} />;
      case 'reminder': return <Clock size={16} />;
      case 'success': return <CheckCircle size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (notification) => {
    // Handle notification click - could navigate to relevant page
    console.log('Notification clicked:', notification);
    setShowNotifications(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="navbar-title">
              <h2>Dashboard</h2>
              <span className="navbar-subtitle">
                {user?.role === 'patient' ? 'Patient Portal' : 'Doctor Portal'}
              </span>
            </div>
          </div>
          
          <div className="navbar-right">
            <div className="notification-wrapper">
              <button 
                className={`navbar-icon-btn ${showNotifications ? 'active' : ''}`}
                onClick={toggleNotifications}
                title="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="notification-overlay" onClick={() => setShowNotifications(false)}></div>
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h3>Notifications</h3>
                      <span className="notification-count">{unreadCount} unread</span>
                    </div>
                    <div className="notification-list">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                            onClick={() => handleNotificationClick(notif)}
                          >
                            <div className={`notification-icon notification-icon-${notif.type}`}>
                              {getNotificationIcon(notif.type)}
                            </div>
                            <div className="notification-content">
                              <h4>{notif.title}</h4>
                              <p>{notif.message}</p>
                              <span className="notification-time">{notif.time}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="notification-empty">
                          <Bell size={32} />
                          <p>No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="notification-footer">
                      <button className="btn-text">Mark all as read</button>
                      <button className="btn-text">View all</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="navbar-divider"></div>

            <div className="navbar-user">
              <div className="user-avatar">
                <span>{getInitials(user?.name)}</span>
              </div>
              <div className="user-details">
                <span className="user-name">{user?.name}</span>
                <span className={`user-role role-${user?.role}`}>
                  {user?.role === 'patient' ? 'Patient' : 'Doctor'}
                </span>
              </div>
            </div>

            <button onClick={handleLogout} className="btn btn-logout" title="Logout">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
