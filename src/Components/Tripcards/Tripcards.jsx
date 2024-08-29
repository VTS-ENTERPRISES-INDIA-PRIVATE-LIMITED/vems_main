import React, { useState } from "react";
import "./Tripcards.css";
import { FaSearch, FaFilter } from "react-icons/fa";

function Tripcards() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState([
    {
      tripId: "#CAB12345",
      vehicleNumber: "KA-01-AB-1234",
      vehicleModel: "Toyota Innova",
      employeeCount: 4,
      startTime: "08:00 AM",
      currentSpeed: "60 km/h",
      startLocation: "Electronic City, Bangalore",
      driverImg: "https://res.cloudinary.com/djbz2ydtp/image/upload/v1724731330/5283021_lsaool.png",
    },
    {
      tripId: "#CAB12346",
      vehicleNumber: "KA-02-CD-5678",
      vehicleModel: "Hyundai Creta",
      employeeCount: 3,
      startTime: "08:30 AM",
      currentSpeed: "50 km/h",
      startLocation: "Whitefield, Bangalore",
      driverImg: "https://res.cloudinary.com/djbz2ydtp/image/upload/v1724731297/4344552_grk6w6.png",
    },
    {
      tripId: "#CAB12346",
      vehicleNumber: "KA-02-CD-5678",
      vehicleModel: "Hyundai Creta",
      employeeCount: 3,
      startTime: "08:30 AM",
      currentSpeed: "50 km/h",
      startLocation: "Whitefield, Bangalore",
      driverImg: "https://res.cloudinary.com/djbz2ydtp/image/upload/v1724731297/4344552_grk6w6.png",
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTrips = trips.filter(trip =>
    trip.tripId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.startLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="trip--cards">
      <div className="active-trips">
        <div className="search-filter">
          <div className="search-bar">
          
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="filter-button">
              <FaFilter className="filter-icon" />
            </button>
          </div>
        </div>

        <div className="trips-list">
          {filteredTrips.map((trip, index) => (
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
