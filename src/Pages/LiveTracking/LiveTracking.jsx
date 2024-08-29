import React, { useState, useEffect } from 'react';
import './LiveTracking.css'; 
import RouteManagement from '../RouteManagement/RouteManagement/RouteManagement';

const LiveTracking = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staticVehicleData = {
          tripId: '123',
          speed: 80,
          fuel: 60,
          employees: 3,
          travelled: '1.4 km',
          idletime: '60 s',
        };
        setVehicleData(staticVehicleData);
        setCurrentVehicle(staticVehicleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!currentVehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="sidebar11">
        <div className="cards-container">
          <div className="card tripIdCard">
            <div className="card-content">
              <h3>Trip ID</h3>
              <p>{currentVehicle.tripId}</p>
            </div>
          </div>
          <div className="card speedCard">
            <div className="card-content">
              <h3>Speed</h3>
              <p>{currentVehicle.speed} km/h</p>
            </div>
          </div>
          <div className="card fuelCard">
            <div className="card-content">
              <h3>Fuel</h3>
              <p>{currentVehicle.fuel}%</p>
            </div>
          </div>
          <div className="card employeesCard">
            <div className="card-content">
              <h3>Employees</h3>
              <p>{currentVehicle.employees}</p>
            </div>
          </div>
          <div className="card travelledCard">
            <div className="card-content">
              <h3>Travelled</h3>
              <p>{currentVehicle.travelled}</p>
            </div>
          </div>
          <div className="card idletimeCard">
            <div className="card-content">
              <h3>Idle time</h3>
              <p>{currentVehicle.idletime}</p>
            </div>
          </div>
        </div>
      </div>
      <RouteManagement customClass="liveTrackingMap" />
    </div>
  );
};

export default LiveTracking;
