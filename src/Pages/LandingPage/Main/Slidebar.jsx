import React from 'react';
import { FaTachometerAlt, FaMapMarkerAlt, FaUserTie, FaCar, FaUserShield, FaUsers, FaHistory, FaFileAlt, FaCreditCard } from 'react-icons/fa';
import './Sidebar.css'; // Import the CSS file
import { IoMdSettings } from "react-icons/io";

const data = [
  { title: "DashBoard", icon: <FaTachometerAlt /> },
  { title: "Live Tracking", icon: <FaMapMarkerAlt /> },
  { title: "Driver Management", icon: <FaUserTie /> },
  { title: "Vehicle Management", icon: <FaCar /> },
  { title: "Escort Management", icon: <FaUserShield /> },
  { title: "Employees", icon: <FaUsers /> },
  { title: "Trip History", icon: <FaHistory /> },
  { title: "Reports", icon: <FaFileAlt /> },
  { title: "Payments", icon: <FaCreditCard /> },
  { title: "settings", icon: <IoMdSettings /> },

];

const Dashboard = () => (
  <div className="dashboard-wrapper">
    <h2 className="services-title">Our Services</h2>
  <div className="dashboardd-container">
    {data.map((item, index) => (
      <div className="card1" key={index}>
        <div className="icon">
          {item.icon}
        </div>
        <div>{item.title}</div>
      </div>
    ))}
  </div>
  </div>
);

export default Dashboard;
