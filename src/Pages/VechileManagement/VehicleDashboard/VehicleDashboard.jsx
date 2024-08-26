import React from 'react';
import './Dashboard.css';

const VehicleDashboard = () => {
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
              <h2>TN 01AB 1234</h2>
              <p>Maruti Suzuki</p>
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
                    <span className="label">Vehicle Name:</span> <span className="value">Maruti Suzuki</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Vendor Name:</span> <span className="value">Maruti</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Vehicle Type:</span> <span className="value">SUV</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Model:</span> <span className="value">2024</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Year of Manufacture:</span> <span className="value">2003</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Registration Number:</span> <span className="value">TN 01AB 1234</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Engine Number:</span> <span className="value">1234</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Chassis Number:</span> <span className="value">5678</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Fuel Type:</span> <span className="value">Petrol</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Seat Capacity:</span> <span className="value">4</span>
                  </div>
                  <div className="vehicle-detail-item">
                    <span className="label">Mileage:</span> <span className="value">15-20 km/l</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="driver-info-container">
              <div className="driver-info">
                <h3>Driver Information</h3>
                <div className="driver-info-content">
                  <img className="driver-image" src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724600306/car-driver-icon-isolated-on-white-background-vector_qh1cnx.jpg" alt="Driver Image" />
                  <div className="driver-details">
                    <div className="driver-detail-item">
                      <span className="label">Name:</span> 
                      <span className="value">John Doe</span>
                    </div>
                    <div className="driver-detail-item">
                      <span className="label">Email:</span> 
                      <span className="value">john.doe@example.com</span>
                    </div>
                    <div className="driver-detail-item">
                      <span className="label">Phone:</span> 
                      <span className="value">123-456-7890</span>
                    </div>
                    <div className="driver-detail-item">
                      <span className="label">Gender:</span> 
                      <span className="value">Male</span>
                    </div>
                    <div className="driver-detail-item">
                      <span className="label">Age:</span> 
                      <span className="value">35</span>
                    </div>
                    <div className="driver-detail-item">
                      <span className="label">Address:</span> 
                      <span className="value">123 Main St, Anytown, USA</span>
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
