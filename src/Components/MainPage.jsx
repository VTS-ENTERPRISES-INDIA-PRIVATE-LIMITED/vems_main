import React, { useState } from 'react';
import { FaSignOutAlt, FaTachometerAlt, FaMapMarkerAlt, FaUserTie, FaCar, FaUsers, FaUserFriends, FaHistory, FaFileAlt } from 'react-icons/fa';
import { GiSteeringWheel } from "react-icons/gi";
import { LiaHomeSolid } from "react-icons/lia";
import Dasboard from './Dasboard';
import Employee from '../Pages/Employee/Employee';
import LiveTracking from '../Pages/LiveTracking/LiveTracking';
import ViewVehicle from '../Pages/VechileManagement/ViewVehicle/ViewVehicle'
import TripManagement from '../Pages/TripManagement/TripManagement'
import { IoStarHalf } from 'react-icons/io5';
import ViewEscort from '../Pages/Escort/ViewEscort';
import Driverslist from '../Pages/DriverManagement/Driverslist';
import User from './vendor/User';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Clients = () => <div>Clients Content</div>;
const Reports = () => <div>Reports Content</div>;

const MainPage = () => {
	const [activeMenu, setActiveMenu] = useState('Dashboard');
	const navigate = useNavigate();
	
	const handleLogout = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				// Clear local storage
				localStorage.removeItem('adminData');
				localStorage.removeItem('isAuthenticated');

				// Redirect to login page
				navigate('/login');
			} else {
				console.error('Logout failed');
			}
		} catch (err) {
			console.error('Logout error:', err);
		}
	};

	return (
		<div className="dashboardcomponents">
			<div className="sidebar">
				<div className="logo-container">
					<img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1724663475/logo_xd5tyb.jpg" alt="Logo" className="logoImg" />
					<h2 className="logo-text">VTS</h2>
				</div>
				<div className="logout-container">
					Logout <FaSignOutAlt className="logout-icon" onClick={handleLogout}/>
				</div>
				<div className="menu-container">
					<div className={`menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('Dashboard')}>
						<div className="icon-container icon-dashboard">
							<FaTachometerAlt className="iconSvg" />
						</div>
						<span>Dashboard</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Live Tracking' ? 'active' : ''}`} onClick={() => setActiveMenu('Live Tracking')}>
						<div className="icon-container icon-live-tracking">
							<FaMapMarkerAlt className="iconSvg" />
						</div>
						<span>Live Tracking</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Vendor Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Vendor Management')}>
						<div className="icon-container icon-vendor-management">
							<FaUserTie className="iconSvg" />
						</div>
						<span>Vendor Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Driver Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Driver Management')}>
						<div className="icon-container icon-driver-management">
							<GiSteeringWheel className="iconSvg" />
						</div>
						<span>Driver Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Vehicle Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Vehicle Management')}>
						<div className="icon-container icon-vehicle-management">
							<FaCar className="iconSvg" />
						</div>
						<span>Vehicle Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Employees' ? 'active' : ''}`} onClick={() => setActiveMenu('Employees')}>
						<div className="icon-container icon-employees">
							<FaUsers className="iconSvg" />
						</div>
						<span>Employees</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Clients' ? 'active' : ''}`} onClick={() => setActiveMenu('Clients')}>
						<div className="icon-container icon-clients">
							<FaUserFriends className="iconSvg" />
						</div>
						<span>Clients</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Trip Management' ? 'active' : ''}`} onClick={() => setActiveMenu('Trip Management')}>
						<div className="icon-container icon-trip-history">
							<FaHistory className="iconSvg" />
						</div>
						<span>Trip Management</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Escort' ? 'active' : ''}`} onClick={() => setActiveMenu('Escort')}>
						<div className="icon-container icon-escort">
							<IoStarHalf className="iconSvg" />
						</div>
						<span>Escort</span>
					</div>
					<div className={`menu-item ${activeMenu === 'Reports' ? 'active' : ''}`} onClick={() => setActiveMenu('Reports')}>
						<div className="icon-container icon-reports">
							<FaFileAlt className="iconSvg" />
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
				{activeMenu === 'Vendor Management' && <User />}
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

export default MainPage;
