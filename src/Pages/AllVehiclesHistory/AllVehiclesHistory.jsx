import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './AllVehiclesHistory.css';
import { Button, InputAdornment, TextField, MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message } from 'antd';

const TripHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('All');
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/trip/showtrips`);
        const data = await response.json();

        const processedTrips = data.map((trip) => ({
          tripId: trip.TripId,
          vehicleId: trip.VehicleNumber,
          driverName: trip.DriverName,
          numberOfEmployees: 1, // Hardcoded for now, update this logic as needed
          startTime: `${trip.TripDate} ${trip.LoginTime}`, // Combining TripDate and LoginTime
          endTime: `${trip.TripDate} ${trip.LogoutTime}`, // Combining TripDate and LogoutTime
          status: trip.LogoutTime ? 'Completed' : 'Ongoing',
        }));

        setTrips(processedTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  // Helper function to parse DD/MM/YYYY format to Date object
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  // Helper functions to filter based on dates
  const isToday = (dateStr) => {
    const today = new Date();
    const tripDate = parseDate(dateStr);
    return tripDate.toDateString() === today.toDateString();
  };

  const isLastWeek = (dateStr) => {
    const today = new Date();
    const tripDate = parseDate(dateStr);
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    return tripDate >= oneWeekAgo && tripDate <= today;
  };

  const isLastMonth = (dateStr) => {
    const today = new Date();
    const tripDate = parseDate(dateStr);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    return tripDate >= oneMonthAgo && tripDate <= today;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  // Filter trips based on search term and date filter
  const filteredTrips = trips
    .filter((trip) => {
      if (filterBy === 'Today' && !isToday(trip.startTime)) return false;
      if (filterBy === 'LastWeek' && !isLastWeek(trip.startTime)) return false;
      if (filterBy === 'LastMonth' && !isLastMonth(trip.startTime)) return false;
      return (
        trip.vehicleId.toLowerCase().includes(searchTerm) ||
        trip.driverName.toLowerCase().includes(searchTerm) ||
        trip.tripId.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (a.status === 'Ongoing' && b.status !== 'Ongoing') return -1;
      if (a.status !== 'Ongoing' && b.status === 'Ongoing') return 1;
      return 0;
    });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Trip History', 14, 16);

    const headers = ['Trip ID', 'Vehicle ID', 'Driver Name', 'No. of Employees', 'Start Time', 'End Time', 'Status'];
    const data = trips.map((trip) => [
      trip.tripId,
      trip.vehicleId,
      trip.driverName,
      trip.numberOfEmployees,
      trip.startTime,
      trip.endTime,
      trip.status,
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20,
    });

    doc.save('TripHistory.pdf');
  };

  const pickUpItems = [
    {
      label: '9 AM',
      key: '09:00:00',
    },
    {
      label: '3 PM',
      key: '15:00:00',
    },
  ];
  
  const dropItems = [
    {
      label: '9 AM',
      key: '09:00:00',
    },
    {
      label: '3 PM',
      key: '15:00:00',
    },
  ];

  const handlePickUpClick = (e) => {
    handleAllocation('pickup', e.key)
  };

  const handleDropClick = (e) => {
    handleAllocation('drop', e.key)
  }

  const pickUpProps = {
    items: pickUpItems,
    onClick: handlePickUpClick,
  };

  const dropProps = {
    items: dropItems,
    onClick: handleDropClick,
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/trip/sendEmails`);
      if (response.status === 200) {
        alert('Emails sent and table truncated successfully!');
      } else {
        alert('Failed to send emails: ' + response.data.message);
      }
    } catch (error) {
      console.log(error);
      
      if (error.response && error.response.status === 404) {
        alert('No users found to send emails to.');
      } else {
        console.error('There was an error sending the emails!', error);
        alert('There was an error sending the emails!');
      }
    }
  };

  const handleAllocation = async (type, time) => {
    message.info('Allocating....')
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_2}/${type}/?time=${time}`, [])
      message.success("Cab Allocated")
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during POST request:', error);
      message.error("Failed to allocate")
    }
  }

  return (
    <div className="trip-history1">
      <div className="controls">
        <div>
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            sx={{ width: 150, borderRadius: '20px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          {/* Filter by Date */}
          <FormControl size="small" sx={{ marginLeft: 2 }}>
            <Select value={filterBy} onChange={handleFilterChange}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="LastWeek">Last Week</MenuItem>
              <MenuItem value="LastMonth">Last Month</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{display: 'flex'}}>
          <Button
            variant="outlined"
            style={{
              borderColor: 'green',
              color: 'green',
              borderRadius: '20px'
            }}
            onClick={downloadPDF}
          >
            Download As PDF
          </Button>
          <Button
            variant="outlined"
            style={{
              borderColor: 'blue',
              color: 'blue',
              marginLeft: 20,
              borderRadius: '20px'
            }}
            onClick={handleSubmit}
          >
            Send Mails
          </Button>
          <div style={{display:"flex"}}>
            <Dropdown.Button
              menu={pickUpProps}
              placement="bottom"
              icon={<DownOutlined />}
              style={{
                borderColor: 'blue',
                color: 'blue',
                marginLeft: 20,
                borderRadius: '20px',
                width: 'fitContent'
              }}
            >
              Pickup
            </Dropdown.Button>
            <Dropdown.Button
              menu={dropProps}
              placement="bottom"
              icon={<DownOutlined />}
              style={{
                borderColor: 'blue',
                color: 'blue',
                marginLeft: 20,
                borderRadius: '20px',
                width: 'fitContent'
              }}
            >
              Drop
            </Dropdown.Button>
          </div>
        </div>
      </div>

      <table className="trip-table">
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Vehicle ID</th>
            <th>Driver Name</th>
            <th>No. of Employees</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.tripId}>
              <td>{trip.tripId}</td>
              <td>{trip.vehicleId}</td>
              <td>{trip.driverName}</td>
              <td>{trip.numberOfEmployees}</td>
              <td>{trip.startTime}</td>
              <td>{trip.endTime}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripHistory;
