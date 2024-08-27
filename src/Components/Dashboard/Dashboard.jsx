import React, { useState } from "react";
import {
  FaCar,
  FaMapMarkedAlt,
  FaRoute,
  FaTachometerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import AddVehicle from "../../Pages/VechileManagement/AddVehicle/AddVehicle";
import ViewVehicle from "../../Pages/VechileManagement/ViewVehicle/ViewVehicle";
import TripManagement from "../../Pages/TripManagement/TripManagement";
import RouteManagement from "../../Pages/RouteManagement/RouteManagement/RouteManagement";
import "./Dashboard.css";

function Dashboard() {
  const [isVehicleMenuOpen, setVehicleMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const toggleVehicleMenu = () => {
    setVehicleMenuOpen(!isVehicleMenuOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="logo">
          <img src="/path-to-your-logo.png" alt="Logo" />
        </div>
        <ul className="menu">
          <li onClick={() => handleMenuClick("Dashboard")}>
            <FaTachometerAlt className="menu-icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={toggleVehicleMenu} className="menu-item">
            <FaCar className="menu-icon" />
            <span>Vehicle Management</span>
            {isVehicleMenuOpen ? (
              <FaChevronUp className="chevron-icon" />
            ) : (
              <FaChevronDown className="chevron-icon" />
            )}
          </li>
          {isVehicleMenuOpen && (
            <ul className="submenu">
              <li
                className="submenu-item"
                onClick={() => handleMenuClick("AddVehicle")}
              >
                Add Vehicle
              </li>
              <li
                className="submenu-item"
                onClick={() => handleMenuClick("ViewVehicle")}
              >
                View Vehicles
              </li>
            </ul>
          )}
          <li onClick={() => handleMenuClick("TripManagement")}>
            <FaMapMarkedAlt className="menu-icon" />
            <span>Trip Management</span>
          </li>
          <li onClick={() => handleMenuClick("RouteManagement")}>
            <FaRoute className="menu-icon" />
            <span>Route Management</span>
          </li>
          <li onClick={() => handleMenuClick("LiveTracking")}>
            <FaTachometerAlt className="menu-icon" />
            <span>Live Tracking</span>
          </li>
        </ul>
      </nav>
      <div className="content">
        {selectedMenu === "AddVehicle" && <AddVehicle />}
        {selectedMenu === "ViewVehicle" && <ViewVehicle />}
        {selectedMenu === "TripManagement" && <TripManagement />}
        {selectedMenu === "RouteManagement" && <RouteManagement />}

        
      </div>
    </div>
  );
}

export default Dashboard;
