import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import TripManagement from "./Pages/TripManagement/TripManagement";
import VehicleDashboard from "./Pages/VechileManagement/VehicleDashboard/VehicleDashboard";
import AddVehicle from "./Pages/VechileManagement/AddVehicle/AddVehicle";
import ViewVehicle from "./Pages/VechileManagement/ViewVehicle/ViewVehicle";
import Sidebar from "./Components/Sidebar/Sidebar";
import RouteManagement from "./Pages/RouteManagement/RouteManagement/RouteManagement";
import LiveTracking from './Pages/LiveTracking/LiveTracking';
import TripHistory from './Pages/TripHistory/TripHistory';
import TripHistoryToday from './Pages/TripHistory/TripHistoryToday';
import ViewEscort from './Pages/Escort/ViewEscort';
import EscortDashboard from './Pages/Escort/EscortDashboard';
import UserReg from "./Components/vendor/User";
import Vendordetails from "./Components/vendor/Vendordetails";
import VendorLogin from "./Components/vendor/Login";
import Employee from "./Pages/Employee/Employee";
import Driverprad from './Pages/DriverManagement/Driverprad';
import MainPage from './Components/MainPage';
import Home from './Pages/LandingPage/Home';
import Login from './Pages/LandingPage/Loginpage/Login'
import Register from './Pages/LandingPage/Register/Register'
import ProtectedRoute from './ProtectedRoute';
import NotAccess from './Components/NotAccess';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="app-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainPage />
            </ProtectedRoute>
          } />
          <Route path="/not-access" element={<NotAccess />} />
          <Route path="/dashboard" element={<Sidebar />}>
            <Route path="addvehicle" element={<AddVehicle />} />
            <Route path="viewvehicle" element={<ViewVehicle />} />
            <Route path="livetracking" element={<LiveTracking />} />
            <Route path="history" element={<TripHistory />} />
          </Route>
          <Route path="/viewDriver" element={<Driverprad />} />
          <Route path="/vehicledashboard" element={<VehicleDashboard />} />
          <Route path="/escortdashboard" element={<EscortDashboard />} />
          <Route path="/trips" element={<TripManagement />} />
          <Route path="/routemanagement" element={<RouteManagement />} />
          <Route path="todayhistory" element={<TripHistoryToday />} />
          <Route path="escort" element={<ViewEscort />} />
          <Route path="/UserReg" element={<UserReg />} />
          <Route path="/vendordetails/:VendorId" element={<Vendordetails />} />
          <Route path="/vendorLogin" element={<VendorLogin />} />
          <Route path="/Employee" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
