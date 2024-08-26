import React, { useState } from 'react';
import './AddVehicle.css';

const AddVehicle= () => {
  
  return (
    <div className="form-container">
      
      <form>
        <div className="form-row">
          <div className="form-group">
            <label>Vendor Name</label>
            <input type="text" name="vendorName" />
          </div>
          <div className="form-group">
            <label>Vehicle Type</label>
            <input type="text" name="vehicleType" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Vehicle Name</label>
            <input type="text" name="vehicleName" />
          </div>
          <div className="form-group">
            <label>Model</label>
            <input type="text" name="model" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Year of Manufacture</label>
            <input type="number" name="yearOfManufacture" />
          </div>
          <div className="form-group">
            <label>Vehicle Image</label>
            <input type="file" name="vehicleImage" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Registration Number</label>
            <input type="text" name="registrationNumber" />
          </div>
          <div className="form-group">
            <label>Engine Number</label>
            <input type="text" name="engineNumber" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Chassis Number</label>
            <input type="text" name="chassisNumber" />
          </div>
          <div className="form-group">
            <label>Fuel Type</label>
            <input type="text" name="fuelType" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Seat Capacity</label>
            <input type="number" name="seatCapacity" />
          </div>
          <div className="form-group">
            <label>Mileage</label>
            <input type="number" name="mileage" />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default  AddVehicle;