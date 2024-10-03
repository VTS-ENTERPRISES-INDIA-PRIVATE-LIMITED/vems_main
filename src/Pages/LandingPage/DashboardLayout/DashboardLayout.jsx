import React from 'react';
import './DashboardLayout.css';
import dashboardImage from '../DashboardLayout/Dashboard.jpg';

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Main Modules</h2>
        <ul className="menu">
          <li className="menu-item active">Dashboard</li>
          <li className="menu-item">Live Tracking</li>
          <li className="menu-item">Driver Management</li>
          <li className="menu-item">Vehicle Management</li>
          <li className="menu-item">Trip Management</li>
          <li className="menu-item">Operator Management</li>
          <li className="menu-item">Vendor Management</li>
          <li className="menu-item">Client Management</li>
          <li className="menu-item">Payment Management</li>
        </ul>
      </div>
      <div className="content">
        <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
      </div>
    </div>
  );
};

export default DashboardLayout;
