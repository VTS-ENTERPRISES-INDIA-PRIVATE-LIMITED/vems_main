import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import VehicleDashboard from './Components/VehicleDashboard/VehicleDashboard';
import AddVehicle from './Components/AddVehicle/AddVehicle';
import ViewVehicle from './Components/ViewVehicle/ViewVehicle';
import Routess from './Components/RouteManagement/Routess';

const App = () => {
  return (
   
      <div className="app-container">
      
          <VehicleDashboard/> 
           
        </div>
      
   
  );
}

export default App;
