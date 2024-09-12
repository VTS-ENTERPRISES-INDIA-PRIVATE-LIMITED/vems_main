import React, { useState } from 'react';
import './TripHistory.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '-' : date.toLocaleString();
};

const TripHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const trips = [
    {
      tripId: "T003",
      vehicleId: "6",
      driverName: "John Doe",
      numberOfEmployees: 4,
      startTime: "2024-09-11T08:00:00Z",
      endTime: "-", 
      status: "Ongoing"
    },
    {
      tripId: "T002",
      vehicleId: "6",
      driverName: "John Doe",
      numberOfEmployees: 4,
      startTime: "2024-09-10T08:00:00Z",
      endTime: "2024-09-10T10:00:00Z",
      status: "Completed"
    },
    {
      tripId: "T001",
      vehicleId: "6",
      driverName: "John Doe",
      numberOfEmployees: 4,
      startTime: "2024-09-09T08:00:00Z",
      endTime: "2024-09-09T10:00:00Z",
      status: "Completed"
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredTrips = trips
    .filter(trip =>
      trip.vehicleId.toLowerCase().includes(searchTerm) ||
      trip.driverName.toLowerCase().includes(searchTerm) ||
      trip.tripId.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (a.status === 'Ongoing' && b.status !== 'Ongoing') return -1;
      if (a.status !== 'Ongoing' && b.status === 'Ongoing') return 1;
      return 0;
    });

  return (
    <div className="trip-history">
      <div className="search-bar12">
        <input
          type="text"
          placeholder="Search by Trip ID, Vehicle ID, or Driver Name..."
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Vehicle ID</th>
            <th>Driver Name</th>
            <th>No. of Employees Travelled</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.map((trip) => (
            <tr key={trip.tripId}>
              <td>{trip.tripId}</td>
              <td>{trip.vehicleId}</td>
              <td>{trip.driverName}</td>
              <td>{trip.numberOfEmployees}</td>
              <td>{formatDate(trip.startTime)}</td>
              <td>
                {trip.status === 'Ongoing' ? '-' : formatDate(trip.endTime)}
              </td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripHistory;
