import React from 'react';
import { FaTachometerAlt, FaMapMarkerAlt, FaUserTie, FaCar, FaRegCalendarAlt, FaBuilding, FaUsers, FaUserFriends, FaHistory, FaMoneyCheckAlt, FaFileAlt, FaDatabase, FaTicketAlt, FaCog,FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1724663475/logo_xd5tyb.jpg" alt="Logo" className="logo" />
                <h2 className="logo-text">VTS</h2>
            </div>
            <div className="logout-container">
                <FaSignOutAlt className="logout-icon" />
            </div>
            <div className="menu-container">
                <div className="menu-item">
                    <div className="icon-container icon-dashboard">
                        <FaTachometerAlt className="icon" />
                    </div>
                    <span>Dashboard</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-live-tracking">
                        <FaMapMarkerAlt className="icon" />
                    </div>
                    <span>Live Tracking</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-driver-management">
                        <FaUserTie className="icon" />
                    </div>
                    <span>Driver Management</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-vehicle-management">
                        <FaCar className="icon" />
                    </div>
                    <span>Vehicle Management</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-regular-rides">
                        <FaRegCalendarAlt className="icon" />
                    </div>
                    <span>Regular Rides</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-office-rides">
                        <FaBuilding className="icon" />
                    </div>
                    <span>Office Rides</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-employees">
                        <FaUsers className="icon" />
                    </div>
                    <span>Employees</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-clients">
                        <FaUserFriends className="icon" />
                    </div>
                    <span>Clients</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-trip-history">
                        <FaHistory className="icon" />
                    </div>
                    <span>Trip History</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-payments">
                        <FaMoneyCheckAlt className="icon" />
                    </div>
                    <span>Payments</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-reports">
                        <FaFileAlt className="icon" />
                    </div>
                    <span>Reports</span>
                </div>
                <div className="menu-item">
                    <div className="icon-container icon-fare-database">
                        <FaDatabase className="icon" />
                    </div>
                    <span>Fare Database</span>
                </div>
                {/* <div className="menu-item">
                    <div className="icon-container icon-support-tickets">
                        <FaTicketAlt className="icon" />
                    </div>
                    <span>Support Tickets</span>
                </div> */}
                <div className="menu-item">
                    <div className="icon-container icon-settings">
                        <FaCog className="icon" />
                    </div>
                    <span>Settings</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
