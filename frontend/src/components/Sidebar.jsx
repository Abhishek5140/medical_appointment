import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const patientMenuItems = [
    { id: 'book', label: 'Book Appointment', icon: Calendar },
    { id: 'view', label: 'My Appointments', icon: FileText },
  ];

  const doctorMenuItems = [
    { id: 'all', label: 'All Appointments', icon: FileText },
    { id: 'pending', label: 'Pending', icon: Clock },
    { id: 'approved', label: 'Approved', icon: CheckCircle },
    { id: 'rejected', label: 'Rejected', icon: XCircle },
  ];

  const menuItems = user?.role === 'patient' ? patientMenuItems : doctorMenuItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V17C2 20 12 22 12 22C12 22 22 20 22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="logo-text">
            <h3>MediTrack</h3>
            <span>Healthcare System</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
