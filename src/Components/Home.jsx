import React, { useState } from 'react';
import { FaSignOutAlt, FaTachometerAlt, FaMapMarkerAlt, FaUserTie, FaCar, FaUsers, FaUserFriends, FaHistory, FaMoneyCheckAlt, FaFileAlt } from 'react-icons/fa';
import { GiSteeringWheel } from "react-icons/gi";
import { LiaHomeSolid } from "react-icons/lia";
import './Sidebar.css';
// import Dasboard from './Dasboard';
// import Employee from './Employee/Employee';
import Employee from '../Pages/Employee/Employee';
import LiveTracking from '../Pages/LiveTracking/LiveTracking';
import ViewVehicle from '../Pages/VechileManagement/ViewVehicle/ViewVehicle'
import TripManagement from '../Pages/TripManagement/TripManagement'
import { IoStarHalf } from 'react-icons/io5';
import ViewEscort from '../Pages/Escort/ViewEscort';
import Driverslist from '../Pages/DriverManagement/Driverslist';
import User from './vendor/User';

const Clients = () => <div>Clients Content</div>;
const Reports = () => <div>Reports Content</div>;
const Dasboard = () => <div>Dasboard Content</div>;

const Home = () => {
	const [activeMenu, setActiveMenu] = useState('Dashboard');

	return (
		<div className="dashboardcomponents">
			<div className="sidebar">
				<div className="logo-container">
					<img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1724663475/logo_xd5tyb.jpg" alt="Logo" className="logo" />
					<h2 className="logo-text">VTS</h2>
				</div>
				<div className="logout-container">
					<FaSignOutAlt className="logout-icon" />
				</div>
				<div className="menu-container">
					<div className={`menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('Dashboard')}>
						<div className="icon-container icon-dashboard">
							<FaTachometerAlt className="icon" />
						</div>
						<span>Dashboard</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Live Tracking' ? 'active' : ''}`} onClick={() => setActiveMenu('Live Tracking')}>
						<div className="icon-container icon-live-tracking">
							<FaMapMarkerAlt className="icon" />
						</div>
						<span>Live Tracking</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Vender Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Vender Management')}>
						<div className="icon-container icon-vender-management">
							<FaUserTie className="icon" />
						</div>
						<span>Vender Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Driver Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Driver Management')}>
						<div className="icon-container icon-driver-management">
							<GiSteeringWheel className="icon" />
						</div>
						<span>Driver Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Vehicle Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Vehicle Management')}>
						<div className="icon-container icon-vehicle-management">
							<FaCar className="icon" />
						</div>
						<span>Vehicle Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Employees' ? 'active' : ''}`} onClick={() => setActiveMenu('Employees')}>
						<div className="icon-container icon-employees">
							<FaUsers className="icon" />
						</div>
						<span>Employees</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Clients' ? 'active' : ''}`} onClick={() => setActiveMenu('Clients')}>
						<div className="icon-container icon-clients">
							<FaUserFriends className="icon" />
						</div>
						<span>Clients</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Trip Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Trip Management')}>
						<div className="icon-container icon-trip-history">
							<FaHistory className="icon" />
						</div>
						<span>Trip Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Escort' ? 'active' : ''}`} onClick={() => setActiveMenu('Escort')}>
						<div className="icon-container icon-escort">
							<IoStarHalf className="icon" />
						</div>
						<span>Escort</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Reports' ? 'active' : ''}`} onClick={() => setActiveMenu('Reports')}>
						<div className="icon-container icon-reports">
							<FaFileAlt className="icon" />
						</div>
						<span>Reports</span>
					</div>
				</div>
			</div>
			<div className='sideContent'>
				<header className="dashboard-header">
					<div className="header-info">
						<span className="header-date">Dec 01 2022 | 10:00 AM</span>
					</div>
					<div className="user-info">
						<div className="user-text">
							<span className="user-name">koundinya</span>
							<span className="user-role">Admin</span>
						</div>
						<div className="avatar-container">
							<img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1718121215/samples/man-portrait.jpg" alt="User Avatar" className="user-avatar" />
						</div>
					</div>
				</header>
				<div className="navPath"><LiaHomeSolid />/<span>{activeMenu}</span></div>
				{activeMenu === 'Dashboard' && <Dasboard />}
				{activeMenu === 'Live Tracking' && <LiveTracking />}
				{activeMenu === 'Vender Management' && <User />}
				{activeMenu === 'Driver Management' && <Driverslist />}
				{activeMenu === 'Vehicle Management' && <ViewVehicle />}
				{activeMenu === 'Employees' && <Employee />}
				{activeMenu === 'Clients' && <Clients />}
				{activeMenu === 'Trip Management' && <TripManagement />}
				{activeMenu === 'Escort' && <ViewEscort />}
				{activeMenu === 'Reports' && <Reports />}
			</div>
		</div>
	);
};

export default Home;
