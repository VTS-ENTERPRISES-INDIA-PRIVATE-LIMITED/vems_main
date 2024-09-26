import React, { useState } from 'react';
import LiveTracking from '../../Pages/LiveTracking/LiveTracking.jsx';
import TripManagement from '../../Pages/TripManagement/TripManagement.jsx';
import RouteManagement from '../../Pages/RouteManagement/RouteManagement/RouteManagement.jsx';
import AddVehicle from "../../Pages/VechileManagement/AddVehicle/AddVehicle.jsx";
import ViewVehicle from "../../Pages/VechileManagement/ViewVehicle/ViewVehicle.jsx";
import VehicleDashboard from "../../Pages/VechileManagement/VehicleDashboard/VehicleDashboard.jsx";
import './Sidebar.css';
import EscortRegister from '../../Pages/Escort/EscortRegister.jsx';
import ViewEscort from '../../Pages/Escort/ViewEscort.jsx';
import Employee from '../../Pages/Employee/Employee.jsx';
import UserReg from "../vendor/User.js";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subMenu, setSubMenu] = useState(null);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setSubMenu(null); 
  };

  const handleSubMenu = (menu) => {
    setSubMenu(subMenu === menu ? null : menu); 
  };

  return (
    <div className='heroSection'>
      <div className='slideBar'>
        <div className="logoCont">
          <img src={process.env.PUBLIC_URL + '/assets/logo.jpg'} alt="Logo" width={'200px'} height={'auto'} />
        </div>
        <span className="navLine"></span>
        <ul className="slideBarLinks">
          <li className={`slideBarLink ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavClick('dashboard')}>
            Dashboard
          </li>
          <li className={`slideBarLink ${activeTab === 'liveTracking' ? 'active' : ''}`} onClick={() => handleNavClick('liveTracking')}>
            Live Tracking
          </li>
          <li className={`slideBarLink ${activeTab === 'vehiclemgmt' ? 'active' : ''}`} onClick={() => handleNavClick('viewVehicle')}>
            Vehicle Management
          </li>
          <li className={`slideBarLink ${activeTab === 'UserReg' ? 'active' : ''}`} onClick={() => handleNavClick('UserReg')}>
          Vendor
          </li>
          <li className={`slideBarLink ${activeTab === 'Employee' ? 'active' : ''}`} onClick={() => handleNavClick('Employee')}>
          Employee
          </li>
          {/* <li className={`slideBarLink ${activeTab === 'vehicleMgmt' ? 'active' : ''}`} onMouseEnter={() => handleSubMenu('vehicleMgmt')} onClick={() => handleNavClick('vehicleMgmt')}>
            Vehicle Management
          </li>
          {subMenu === 'vehicleMgmt' && (
            <ul className="subMenu">
              <li onClick={() => handleNavClick('addVehicle')}>Add Vehicle</li>
              <li onClick={() => handleNavClick('viewVehicle')}>View Vehicle</li>
            </ul>
          )} */}
          <li className={`slideBarLink ${activeTab === 'tripMgmt' ? 'active' : ''}`} onClick={() => handleNavClick('tripMgmt')}>
            Trip Management
          </li>
          {/* <li className={`slideBarLink ${activeTab === 'routeMgmt' ? 'active' : ''}`} onClick={() => handleNavClick('routeMgmt')}>
            Route Management
          </li> */}
          <li className={`slideBarLink ${activeTab === 'escortMgmt' ? 'active' : ''}`} onClick={() => handleNavClick('escortMgmt')}>
            Escort Management
          </li>
        </ul>
      </div>
      <div className="heroContent">
        {activeTab === 'dashboard' && 'Dashboard Component'}
        {activeTab === 'liveTracking' && <LiveTracking />}
        {activeTab === 'addVehicle' && <AddVehicle/>}
        {activeTab === 'viewVehicle' && <ViewVehicle/>}
        {activeTab === 'tripMgmt' && <TripManagement/>}
        {activeTab === 'routeMgmt' && <RouteManagement/>}
        {activeTab === 'escortMgmt1' && <EscortRegister/>}
        {activeTab === 'escortMgmt' && <ViewEscort/>}
        {activeTab === 'Employee' && <Employee/>}
        {activeTab === 'UserReg' && <UserReg/>}
      </div>
    </div>
  );
};

export default Dashboard;
