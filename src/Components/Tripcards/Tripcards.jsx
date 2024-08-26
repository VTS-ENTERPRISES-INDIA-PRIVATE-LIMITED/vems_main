import React from "react";
import "./Tripcards.css";
import { FaSearch, FaFilter } from "react-icons/fa";
import { FaMapMarkerAlt, FaTachometerAlt, FaRoute } from "react-icons/fa";

function Tripcards() {
  const trips = [
    {
      tripId: "#CAB12345",
      vehicleNumber: "KA-01-AB-1234",
      vehicleModel: "Toyota Innova",
      employeeCount: 4,
      startTime: "08:00 AM",
      currentSpeed: "60 km/h",
      startLocation: "Electronic City, Bangalore",
      driverImg: "driver1.jpg",
    },
    {
      tripId: "#CAB12346",
      vehicleNumber: "KA-02-CD-5678",
      vehicleModel: "Hyundai Creta",
      employeeCount: 3,
      startTime: "08:30 AM",
      currentSpeed: "50 km/h",
      startLocation: "Whitefield, Bangalore",
      driverImg: "driver2.jpg",
    },
  ];

  return (
    <div className="trip--cards">
      <div className="active-trips">
        <div className="search-filter">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
            <button className="filter-button">
              <FaFilter className="filter-icon" />
            </button>
          </div>
        </div>

        <div className="trips-list">
          {trips.map((trip, index) => (
            <div className="trip-card" key={index}>
              <div className="trip-header">
                <span className="trip-id">{trip.tripId}</span>
                <span className="vehicle-number">{trip.vehicleNumber}</span>
              </div>
              <div className="trip-info">
                <div className="vehicle-model">
                  <strong>Model:</strong> {trip.vehicleModel}
                </div>
                <div className="employee-count">
                  <strong>Employees:</strong> {trip.employeeCount}
                </div>
                <div className="start-time">
                  <strong>Started At:</strong> {trip.startTime}
                </div>
                <div className="current-speed">
                  <strong>Speed:</strong> {trip.currentSpeed}
                </div>
                <div className="start-location">
                  <strong>Start Location:</strong> {trip.startLocation}
                </div>
              </div>
              <div className="driver-info">
                <img src={trip.driverImg} alt="Driver" className="driver-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tripcards;
