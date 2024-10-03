import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cards.css';
import AllvehiclesRoute from '../../Pages/Trip/AllvehiclesRoute';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Cards = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trip/rides`); 
        const vehicleData = response.data;
        
        const groupedVehicles = vehicleData.reduce((acc, vehicle) => {
          if (!acc[vehicle.VehicleId]) {
            acc[vehicle.VehicleId] = {
              VehicleId: vehicle.VehicleId,
              numEmployees: 0,
            };
          }
          acc[vehicle.VehicleId].numEmployees += 1;
          return acc;
        }, {});

        console.log('qwer',groupedVehicles);
        

        const vehicleList = Object.values(groupedVehicles);
        setVehicles(vehicleList);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
  }, []);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.VehicleId && vehicle.VehicleId.toString().includes(searchTerm)
  );

  return (
    <div className="cards-container">
      <div className="search-bar-container">
        <TextField
          size="small"
          placeholder="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { width: 250, borderRadius: '20px', marginBottom: '10px' },
          }}
        />
      </div>

      <div className='cards-and-routemap'>
        <div className='cards--cards'>
          {filteredVehicles.map(vehicle => (
            <div
              key={vehicle.VehicleId}
              className={`card ${selectedVehicle && selectedVehicle.VehicleId === vehicle.VehicleId ? 'active-card' : ''}`}
              onClick={() => handleSelectVehicle(vehicle)}
            >
              <h3 className='heading3'>Vehicle ID: {vehicle.VehicleId}</h3>
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