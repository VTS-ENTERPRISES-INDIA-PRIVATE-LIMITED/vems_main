import React, { useState, useEffect } from 'react';
import './Cards.css';
import vehicleData from '../vehicleData.json';
import Allvehicles from '../../Pages/Trip/Allvehicles';

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
    <div className="container1">
      <div className="cards-container1">
        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder="Search Vehicle ID..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="search-bar"
          />
        </div>
        <h1 className='heading'>Ongoing Trips</h1>

        <div className='cards--cards'>
          {filteredVehicles.map(vehicle => (
            <div 
              key={vehicle.cab_id} 
              className={`card1 ${selectedVehicle && selectedVehicle.cab_id === vehicle.cab_id ? 'active-card' : ''}`}
              onClick={() => handleSelectVehicle(vehicle)}
            >
              <h3 className='heading3'>Vehicle ID: {vehicle.cab_id}</h3>
              <p>Employees: {vehicle.numEmployees}</p>
            </div>
          ))}
        </div>
      </div>

      <Allvehicles
        customClass="map" 
        selectedVehicle={selectedVehicle} 
      />
    </div>
  );
};

export default Cards;
