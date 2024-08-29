import React, { useState } from 'react';
import './AddVehicle.css';

const VehicleForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleName: '',
    vehicleId: '',
    vendorName: '',
    vendorId: '',
    registrationNumber: '',
    engineNumber: '',
    chassisNumber: '',
    fuelType: '',
    seatCapacity: '',
    mileage: '',
    yearOfManufacture: '',
    vehicleImage: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1724774191/111_-Add_Car_Details-_transport_vehicle-512_ptci8m.png', // Placeholder image
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setVehicleDetails({
      ...vehicleDetails,
      vehicleImage: URL.createObjectURL(file),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({
      ...vehicleDetails,
      [name]: value,
    });
  };

  return (
    <form className="vehicle-form">
      <div className="form-header">
        <h2>Add Vehicle</h2>
        <button type="submit" className="save-button">Save</button>
      </div>

      <div className="form-content">
        <div className="left-section">
          <div className="image">
            <input 
              type="file" 
              name="vehicleImage" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }} 
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <img src={vehicleDetails.vehicleImage} alt="Vehicle" className="vehicle-preview" />
            </label>
          </div>
          <div className='vehicle'>
          <label>Vehicle Name:</label>
          <input 
            type="text" 
            name="vehicleName" 
            value={vehicleDetails.vehicleName} 
            onChange={handleChange} 
          />
          <label>Vehicle ID:</label>
          <input 
            type="text" 
            name="vehicleId" 
            value={vehicleDetails.vehicleId} 
            onChange={handleChange} 
          />
          <label htmlFor="imageUpload" style={{ marginRight: '10px' }}>Upload Image:</label>
          <input type="file" id="imageUpload" accept="image/*" />
          </div>
          <div className="vendor-details">
            <h3>Vendor Details</h3>
            <label>Vendor Name:</label>
            <input 
              type="text" 
              name="vendorName" 
              value={vehicleDetails.vendorName} 
              onChange={handleChange} 
            />
            <label>Vendor ID:</label>
            <input 
              type="text" 
              name="vendorId" 
              value={vehicleDetails.vendorId} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="right-section">
          <div className="vehicle-details">
            <h3>Vehicle Details</h3>
            <label>Registration Number:</label>
            <input 
              type="text" 
              name="registrationNumber" 
              value={vehicleDetails.registrationNumber} 
              onChange={handleChange} 
            />
            <label>Engine Number:</label>
            <input 
              type="text" 
              name="engineNumber" 
              value={vehicleDetails.engineNumber} 
              onChange={handleChange} 
            />
            <label>Fuel Type:</label>
            <input 
              type="text" 
              name="fuelType" 
              value={vehicleDetails.fuelType} 
              onChange={handleChange} 
            />
            <label>Chassis Number:</label>
            <input 
              type="text" 
              name="chassisNumber" 
              value={vehicleDetails.chassisNumber} 
              onChange={handleChange} 
            />
            <label>Seat Capacity:</label>
            <input 
              type="text" 
              name="seatCapacity" 
              value={vehicleDetails.seatCapacity} 
              onChange={handleChange} 
            />
            <label>Mileage:</label>
            <input 
              type="text" 
              name="mileage" 
              value={vehicleDetails.mileage} 
              onChange={handleChange} 
            />
            <label>Year Of Manufacture:</label>
            <input 
              type="text" 
              name="yearOfManufacture" 
              value={vehicleDetails.yearOfManufacture} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;
