import React from 'react';
import { useState } from 'react';
import './Cards.css';

const vehicleData = [
 
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "Ford Explorer",
    "employees": 8
  },
  {
    "vehicleName": "Toyota Camry",
    "employees": 5
  },
  {
    "vehicleName": "Honda Accord",
    "employees": 3
  },
  {
    "vehicleName": "ABC",
    "employees": 8
  },
  

 
];
const Cards = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVehicles = vehicleData.filter(vehicle =>
      vehicle.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const displayedVehicles = searchTerm ? filteredVehicles : filteredVehicles.slice(0, 9);
  
    return (
      <div className="app-container">
        <input
          type="text"
          placeholder="Search by vehicle name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="cards-container">
          {displayedVehicles.map((vehicle, index) => (
            <div key={index} className="card" style={{ backgroundColor: getRandomColor() }}>
              <h3>{vehicle.vehicleName}</h3>
              <p>Number of Employees: {vehicle.employees}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
 
  const getRandomColor = () => {
    const colors = ['aliceblue', 'antiquewhite', 'aqua', 'azure', 'lightcyan', 'lightgoldenrodyellow', 'bisque','beige',];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
export default Cards;  