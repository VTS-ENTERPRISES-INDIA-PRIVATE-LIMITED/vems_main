import React, { useState, useEffect } from 'react';
import './Cards.css';
import vehicleData from '../vehicleData.json';
import Allvehicles from '../../Pages/Trip/Allvehicles';

const Cards = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = vehicleData;
    const vehicleList = Object.keys(data).map(vehicleId => ({
      id: vehicleId,
      numEmployees: data[vehicleId].length,
      employees: data[vehicleId]
    }));
    setVehicles(vehicleList);
  }, []);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.id.toLowerCase().includes(searchTerm.toLowerCase())
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
              key={vehicle.id} 
              className={`card1 ${selectedVehicle && selectedVehicle.id === vehicle.id ? 'active-card' : ''}`}
              onClick={() => handleSelectVehicle(vehicle)}
            >
              <h3 className='heading3'>Vehicle ID: {vehicle.id}</h3>
              <p>Number of Employees: {vehicle.numEmployees}</p>
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
