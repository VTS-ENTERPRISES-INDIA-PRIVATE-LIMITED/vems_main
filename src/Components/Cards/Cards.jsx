import React, { useState, useEffect } from 'react';
import './Cards.css';
import vehicleData from '../vehicleData.json';
import AllvehiclesRoute from '../../Pages/Trip/AllvehiclesRoute';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Cards = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const groupedVehicles = vehicleData.reduce((acc, vehicle) => {
      if (!acc[vehicle.cab_id]) {
        acc[vehicle.cab_id] = {
          cab_id: vehicle.cab_id,
          numEmployees: 0,
        };
      }
      acc[vehicle.cab_id].numEmployees += 1;
      return acc;
    }, {});

    const vehicleList = Object.values(groupedVehicles);
    setVehicles(vehicleList);
  }, []);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.cab_id.toString().includes(searchTerm)
  );

  return (
    <div className="cards-container">
      <div className="search-bar-container">
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
          sx: { width: 250, borderRadius: '20px' ,marginBottom:'10px'}, // Rounded corners
        }}
      />
      </div>
      {/* <h1 className='heading'>Ongoing Trips</h1> */}
<div className='cards-and-routemap'>
      <div className='cards--cards'>
        {filteredVehicles.map(vehicle => (
          <div 
            key={vehicle.cab_id} 
            className={`card ${selectedVehicle && selectedVehicle.cab_id === vehicle.cab_id ? 'active-card' : ''}`}
            onClick={() => handleSelectVehicle(vehicle)}
          >
            <h3 className='heading3'>Vehicle ID: {vehicle.cab_id}</h3>
            <p>Employees: {vehicle.numEmployees}</p>
          </div>
        ))}
      </div>
      <AllvehiclesRoute
        customClass="map" 
        selectedVehicle={selectedVehicle} 
      />
</div>
    </div>
  );
};

export default Cards;
