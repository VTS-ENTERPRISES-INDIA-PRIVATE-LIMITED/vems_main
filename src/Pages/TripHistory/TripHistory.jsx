import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './TripHistory.css';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Trip History', 14, 16);
    
    const headers = ['Trip ID', 'Vehicle ID', 'Driver Name', 'No. of Employees Travelled', 'Start Time', 'End Time', 'Status'];
    const data = filteredTrips.map(trip => [
      trip.tripId,
      trip.vehicleId,
      trip.driverName,
      trip.numberOfEmployees,
      formatDate(trip.startTime),
      trip.status === 'Ongoing' ? '-' : formatDate(trip.endTime),
      trip.status
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20,
    });

    doc.save('TripHistory.pdf');
  };

  return (
    <div className="trip-history">
      <div className="search-bar12">
        <TextField
          size="small"
          placeholder="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { width: 150, borderRadius: '20px' },
          }}
          onChange={handleSearch}
        />
        <Button
          variant="outlined"
          startIcon={<DownloadOutlined />}
          style={{
            borderColor: 'green',
            color: 'green',
            marginLeft: 100,
            borderRadius: '20px',
          }}
          onClick={downloadPDF} 
        >
          Download As PDF
        </Button>
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
              <td>{trip.status === 'Ongoing' ? '-' : formatDate(trip.endTime)}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripHistory;
