import React from 'react';
import { FaCalendarAlt, FaRoute, FaSatelliteDish, FaShieldAlt, FaFileInvoiceDollar, FaFileAlt, FaClipboardCheck, FaUserTie, FaRegSun, FaPeopleCarry } from 'react-icons/fa'; // Import necessary icons
import './TopFeatures.css'; // Import external CSS

const features = [
  { id: 1, icon: <FaCalendarAlt />, title: 'Scheduling', description: 'Rostering - Automatic/Manual Simplified Login' },
  { id: 2, icon: <FaRoute />, title: 'Routing', description: 'Geo Fencing Intelligent Routing Economize the Escorts' },
  { id: 3, icon: <FaSatelliteDish />, title: 'Tracking', description: 'Live Tracking Vendor Tracking Portal Late Arrival Analysis' },
  { id: 4, icon: <FaShieldAlt />, title: 'Security', description: 'Systemized Security Alerts 6+ Safety Alerts' },
  { id: 5, icon: <FaFileInvoiceDollar />, title: 'Billing', description: 'Automated Bill Generation Pending Bills - Due Alerts' },
  { id: 6, icon: <FaFileAlt />, title: 'Reports', description: 'Vehicle Compliance Drive Compliance Automated Alerts & EHS' },
  { id: 7, icon: <FaClipboardCheck />, title: 'Compliance', description: 'Vehicle Compliance Drive Compliance Automated Alerts & EHS' },
  { id: 8, icon: <FaUserTie />, title: 'Driver Application', description: 'OTP based Login App Notification Trips (Future, History)' },
  { id: 9, icon: <FaPeopleCarry />, title: 'Employee Application', description: 'Pre & Instant Trip Booking Live Tracking | ETA Safety Features (SOS etc..)' },
  { id: 10, icon: <FaRegSun />, title: 'Vendor Management', description: 'Prioritize Dashboards Tracking & Scheduling Both App & Web View' },
];

const TopFeatures = () => {
  return (
    <div className="top-features-container">
      <h2><span className="highlight">Top</span> Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={feature.id} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <span className="feature-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopFeatures;