import React, { useState, useEffect } from 'react';
import './LiveTracking.css'; 
import Allvehicles from '../../Pages/Trip/Allvehicles';


const LiveTracking = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staticVehicleData = {
          vehicleId: 'XBgouaiX',
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

 
  const cardColors = {
    vehicleIdCard: '#e6e6e6',
    driverNameCard: 'antiquewhite',
    startTimeCard: 'beige',
    employeesCard: '#e6e6e6',
    travelledCard: 'antiquewhite',
    idletimeCard: 'beige'
  };

  return (
    <div className="liveTrackingContainer">
      <div className="sidebar">
        <div className="card vehicleIdCard" style={{ backgroundColor: cardColors.vehicleIdCard }}>
          <div className="cardContent">
            <h3>Vehicle ID</h3>
            <p>{currentVehicle.vehicleId}</p>
          </div>
        </div>
        <div className="card driverNameCard" style={{ backgroundColor: cardColors.driverNameCard }}>
          <div className="cardContent">
            <h3>Driver Name</h3>
            <p>{currentVehicle.driverName}</p>
          </div>
        </div>
        <div className="card startTimeCard" style={{ backgroundColor: cardColors.startTimeCard }}>
          <div className="cardContent">
            <h3>Start Time</h3>
            <p>{currentVehicle.startTime}</p>
          </div>
        </div>
        <div className="card employeesCard" style={{ backgroundColor: cardColors.employeesCard }}>
          <div className="cardContent">
            <h3>Employees</h3>
            <p>{currentVehicle.employees}</p>
          </div>
        </div>
        <div className="card travelledCard" style={{ backgroundColor: cardColors.travelledCard }}>
          <div className="cardContent">
            <h3>Travelled</h3>
            <p>{currentVehicle.travelled}</p>
          </div>
        </div>
        <div className="card idletimeCard" style={{ backgroundColor: cardColors.idletimeCard }}>
          <div className="cardContent">
            <h3>Idle Time</h3>
            <p>{currentVehicle.idletime}</p>
          </div>
        </div>
      </div>
      <Allvehicles customClass="liveTrackingMap" />
    </div>
  );
};

export default LiveTracking;
