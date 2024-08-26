import React from "react";
import {
  FaCar,
  FaMapMarkedAlt,
  FaRoute,
  FaTachometerAlt,
} from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li>
          <FaTachometerAlt className="menu-icon" />
          <span>Dashboard</span>
        </li>
        <li>
          <FaCar className="menu-icon" />
          <span>Vehicle Management</span>
        </li>
        <li>
          <FaMapMarkedAlt className="menu-icon" />
          <span>Trip Management</span>
        </li>
        <li>
          <FaRoute className="menu-icon" />
          <span>Route Management</span>
        </li>
        <li>
          <FaTachometerAlt className="menu-icon" />
          <span>Live Tracking</span>
        </li>
      </ul>
    </nav>
  );
}

export default Dashboard;
