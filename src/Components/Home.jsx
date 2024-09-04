import React, { useState } from 'react';
import { FaSignOutAlt, FaTachometerAlt, FaMapMarkerAlt, FaUserTie, FaCar, FaRegCalendarAlt, FaBuilding, FaUsers, FaUserFriends, FaHistory, FaMoneyCheckAlt, FaFileAlt, FaDatabase, FaCog } from 'react-icons/fa';
import './Sidebar.css';
import Dasboard from './Dasboard';
import Employee from './Employee/Employee';

const LiveTracking = () => <div>Live Tracking Content</div>;
const DriverManagement = () => <div>Driver Management Content</div>;
const VehicleManagement = () => <div>Vehicle Management Content</div>;
const RegularRides = () => <div>Regular Rides Content</div>;
const OfficeRides = () => <div>Office Rides Content</div>;
const Clients = () => <div>Clients Content</div>;
const TripHistory = () => <div>Trip History Content</div>;
const Payments = () => <div>Payments Content</div>;
const Reports = () => <div>Reports Content</div>;
const FareDatabase = () => <div>Fare Database Content</div>;
const Settings = () => <div>Settings Content</div>;

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
					<div className={`menu-item ${activeMenu === 'Driver Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Driver Management')}>
						<div className="icon-container icon-driver-management">
							<FaUserTie className="icon" />
						</div>
						<span>Driver Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Vehicle Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Vehicle Management')}>
						<div className="icon-container icon-vehicle-management">
							<FaCar className="icon" />
						</div>
						<span>Vehicle Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Regular Rides' ? 'active' : ''}`} onClick={() => setActiveMenu('Regular Rides')}>
						<div className="icon-container icon-regular-rides">
							<FaRegCalendarAlt className="icon" />
						</div>
						<span>Regular Rides</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Office Rides' ? 'active' : ''}`} onClick={() => setActiveMenu('Office Rides')}>
						<div className="icon-container icon-office-rides">
							<FaBuilding className="icon" />
						</div>
						<span>Office Rides</span>
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
					<div className={`menu-item ${activeMenu === 'Trip History' ? 'active' : ''}`} onClick={() => setActiveMenu('Trip History')}>
						<div className="icon-container icon-trip-history">
							<FaHistory className="icon" />
						</div>
						<span>Trip History</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Payments' ? 'active' : ''}`} onClick={() => setActiveMenu('Payments')}>
						<div className="icon-container icon-payments">
							<FaMoneyCheckAlt className="icon" />
						</div>
						<span>Payments</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Reports' ? 'active' : ''}`} onClick={() => setActiveMenu('Reports')}>
						<div className="icon-container icon-reports">
							<FaFileAlt className="icon" />
						</div>
						<span>Reports</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Fare Database' ? 'active' : ''}`} onClick={() => setActiveMenu('Fare Database')}>
						<div className="icon-container icon-fare-database">
							<FaDatabase className="icon" />
						</div>
						<span>Fare Database</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Settings' ? 'active' : ''}`} onClick={() => setActiveMenu('Settings')}>
						<div className="icon-container icon-settings">
							<FaCog className="icon" />
						</div>
						<span>Settings</span>
					</div>
				</div>
			</div>
				{activeMenu === 'Dashboard' && <Dasboard/>}
				{activeMenu === 'Live Tracking' && <LiveTracking />}
				{activeMenu === 'Driver Management' && <DriverManagement />}
				{activeMenu === 'Vehicle Management' && <VehicleManagement />}
				{activeMenu === 'Regular Rides' && <RegularRides />}
				{activeMenu === 'Office Rides' && <OfficeRides />}
				{activeMenu === 'Employees' && <Employee/>}
				{activeMenu === 'Clients' && <Clients />}
				{activeMenu === 'Trip History' && <TripHistory />}
				{activeMenu === 'Payments' && <Payments />}
				{activeMenu === 'Reports' && <Reports />}
				{activeMenu === 'Fare Database' && <FareDatabase />}
				{activeMenu === 'Settings' && <Settings />}
		</div>
	);
};

export default Home;
