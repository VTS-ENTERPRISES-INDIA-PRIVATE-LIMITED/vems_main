import React, { useState } from 'react';

const Header = ({ onSearch, onFilterChange, onDownload }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    rideStatus: '',
    tripType: '',
    dateRange: '',
    entriesToShow: 25,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    onFilterChange(name, value);
  };

  const handleDownload = () => {
    onDownload(); // Callback to trigger the download
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: '5px', width: '200px' }}
      />

      <select name="rideStatus" onChange={handleFilterChange} value={filters.rideStatus}>
        <option value="">Ride Status</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
        {/* Add more options as needed */}
      </select>

      <select name="tripType" onChange={handleFilterChange} value={filters.tripType}>
        <option value="">Trip Type</option>
        <option value="oneWay">One Way</option>
        <option value="roundTrip">Round Trip</option>
        {/* Add more options as needed */}
      </select>

      <select name="dateRange" onChange={handleFilterChange} value={filters.dateRange}>
        <option value="">Date Range</option>
        <option value="today">Today</option>
        <option value="thisWeek">This Week</option>
        <option value="thisMonth">This Month</option>
        {/* Add more options as needed */}
      </select>

      <select name="entriesToShow" onChange={handleFilterChange} value={filters.entriesToShow}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <button onClick={handleDownload} style={{ padding: '5px', backgroundColor: '#6a4fb3', color: 'white' }}>
        Download CSV
      </button>
    </div>
  );
};

export default Header;
