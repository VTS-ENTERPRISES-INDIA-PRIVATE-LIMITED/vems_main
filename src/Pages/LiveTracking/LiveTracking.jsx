import React, { useState, useEffect } from 'react';
import './LiveTracking.css'; 
import RouteManagement from '../RouteManagement/RouteManagement/RouteManagement';


const LiveTracking = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Updated static vehicle data
        const staticVehicleData = {
          vehicleId: 'V12345',
          driverName: 'John Doe',
          startTime: '10:00 AM',
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
    <div className="liveTrackingContainer">
      <div className="sidebar">
        <div className="card vehicleIdCard">
          <div className="cardContent">
            <h3>Vehicle ID</h3>
            <p>{currentVehicle.vehicleId}</p>
          </div>
        </div>
        <div className="card driverNameCard">
          <div className="cardContent">
            <h3>Driver Name</h3>
            <p>{currentVehicle.driverName}</p>
          </div>
        </div>
        <div className="card startTimeCard">
          <div className="cardContent">
            <h3>Start Time</h3>
            <p>{currentVehicle.startTime}</p>
          </div>
        </div>
        <div className="card employeesCard">
          <div className="cardContent">
            <h3>Employees</h3>
            <p>{currentVehicle.employees}</p>
          </div>
        </div>
        <div className="card travelledCard">
          <div className="cardContent">
            <h3>Travelled</h3>
            <p>{currentVehicle.travelled}</p>
          </div>
        </div>
        <div className="card idletimeCard">
          <div className="cardContent">
            <h3>Idle Time</h3>
            <p>{currentVehicle.idletime}</p>
          </div>
        </div>
      </div>
      <RouteManagement customClass="liveTrackingMap" />
    </div>
  );
};

export default LiveTracking;
