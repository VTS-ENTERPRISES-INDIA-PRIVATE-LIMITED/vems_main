import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCar, FaUser, FaEnvelope, FaPhone, FaTransgender, FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Dashboard.css'; 

const VehicleDashboard = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle; 

  if (!vehicle) {
    return <div>No vehicle data available.</div>;
  }

  return (
    <div className="box-container">
      <div className="dashboard-main-container">
        <div className="header-container">
          <div className="header">
            <div className="header-image">
              <img
                src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724230890/2024-EQB250-SUV-AVP-DR_mywna5.webp"
                alt="Car"
                className="car-image"
              />
            </div>
            <div className="header-info">
              <h2>{vehicle.registrationNumber}</h2>
              <p>{vehicle.vendorName}</p>
            </div>
          </div>

          <div className="main-content">
            <div className="statistics">
              <div className="stat-item">
                <h3>Total Distance</h3>
                <p>3000 km</p>
              </div>
              <div className="stat-item">
                <h3>Total Hours</h3>
                <p>108h 30m</p>
              </div>
              <div className="stat-item">
                <h3>Total Trips</h3>
                <p>64</p>
              </div>
            </div>

            <div className="buttons-box">
              <div className="buttons">
                <button className="button">Vehicle Details</button>
                <button className="button">Live Tracking</button>
                <button className="button">Trip History</button>
                <button className="button">Service History</button>
                <button className="button">Drivers Used</button>
              </div>
            </div>

            <div className="vehicle-info">
              <h3>Vehicle Info</h3>
              <div className="vehicle-info-content">
                <img
                  src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724230890/2024-EQB250-SUV-AVP-DR_mywna5.webp"
                  alt="Vehicle"
                  className="vehicle-image"
                />
                <div className="vehicle-details">
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Vehicle Name:</span> <span className="value">{vehicle.vehicleName}</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaUser className="icon" /><span className="label">Vendor Name:</span> <span className="value">{vehicle.vendorName}</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Vehicle Type:</span> <span className="value">SUV</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaRegCalendarAlt className="icon" /><span className="label">Model:</span> <span className="value">2024</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaRegCalendarAlt className="icon" /><span className="label">Year of Manufacture:</span> <span className="value">2003</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Registration Number:</span> <span className="value">{vehicle.registrationNumber}</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Engine Number:</span> <span className="value">1234</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Chassis Number:</span> <span className="value">5678</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Fuel Type:</span> <span className="value">Petrol</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Seat Capacity:</span> <span className="value">4</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <FaCar className="icon" /><span className="label">Mileage:</span> <span className="value">15-20 km/l</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="driver-info-container1">
              <div className="driver-info1">
                <h3>Driver Information</h3>
                <div className="driver-info-content1">
                  <img
                    className="driver-image1"
                    src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724600306/car-driver-icon-isolated-on-white-background-vector_qh1cnx.jpg"
                    alt="Driver Image"
                  />
                  <div className="driver-details1">
                    <div className="driver-detail-item1">
                      <FaUser className="icon" /><span className="label1">Name:</span> <span className="value1">John Doe</span>
                    </div>
                    <div className="driver-detail-item1">
                      <FaEnvelope className="icon" /><span className="label1">Email:</span> <span className="value1">john.doe@example.com</span>
                    </div>
                    <div className="driver-detail-item1">
                      <FaPhone className="icon" /><span className="label1">Phone:</span> <span className="value1">123-456-7890</span>
                    </div>
                    <div className="driver-detail-item1">
                      <FaTransgender className="icon" /><span className="label1">Gender:</span> <span className="value1">Male</span>
                    </div>
                    <div className="driver-detail-item1">
                      <FaRegCalendarAlt className="icon" /><span className="label1">Age:</span> <span className="value1">35</span>
                    </div>
                    <div className="driver-detail-item1">
                      <FaMapMarkerAlt className="icon" /><span className="label1">Address:</span> <span className="value1">123 Main St, Anytown, USA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDashboard;
