import React, { useState } from 'react';
import './TripHistory.css';

const TripHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  
  const trips = [
    {
      tripId: "T001",
      vehicleId: "V001",
      driverName: "John Doe",
      numberOfEmployees: 4,
      startTime: "2024-09-01T08:00:00Z",
      endTime: "2024-09-01T10:00:00Z",
      status: "Completed"
    },
    {
      tripId: "T002",
      vehicleId: "V002",
      driverName: "Jane Smith",
      numberOfEmployees: 3,
      startTime: "2024-09-01T09:00:00Z",
      endTime: "2024-09-01T11:00:00Z",
      status: "Ongoing"
    },
    {
      tripId: "T003",
      vehicleId: "V003",
      driverName: "ABCDEFGH",
      numberOfEmployees: 3,
      startTime: "2024-09-01T08:00:00Z",
      endTime: "2024-09-01T10:00:00Z",
      status: "Ongoing"
    },
    {
      tripId: "T004",
      vehicleId: "V004",
      driverName: "XYZ",
      numberOfEmployees: 4,
      startTime: "2024-09-01T09:00:00Z",
      endTime: "2024-09-01T11:00:00Z",
      status: "Ongoing"
    },
    {
      tripId: "T005",
      vehicleId: "V005",
      driverName: "VSFRUNDM",
      numberOfEmployees: 4,
      startTime: "2024-09-01T08:00:00Z",
      endTime: "2024-09-01T10:00:00Z",
      status: "Completed"
    },
    {
      tripId: "T006",
      vehicleId: "V006",
      driverName: "ABGDYSXCZ",
      numberOfEmployees: 3,
      startTime: "2024-09-01T09:00:00Z",
      endTime: "2024-09-01T11:00:00Z",
      status: "Ongoing"
    }
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
            <th>No.of Employees Travelled</th>
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
              <td>{new Date(trip.startTime).toLocaleString()}</td>
              <td>{new Date(trip.endTime).toLocaleString()}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripHistory;
