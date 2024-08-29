import React, { useState } from 'react';
import axios from 'axios';
import './AddVehicle.css';

// Function to generate a random alphanumeric ID
const generateRandomId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Cloudinary upload preset and URL
const CLOUDINARY_UPLOAD_PRESET = 'q6fwknmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload';

const VehicleForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleName: '',
    vehicleId: generateRandomId(),
    vendorName: '',
    vendorId: '',
    registrationNumber: '',
    engineNumber: '',
    chassisNumber: '',
    fuelType: '',
    seatCapacity: '',
    mileage: '',
    yearOfManufacture: '',
    vehicleImage: '', // Initialize as empty
  });

  const [errors, setErrors] = useState({});

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = response.data.secure_url;
        setVehicleDetails({
          ...vehicleDetails,
          vehicleImage: imageUrl,
        });

        // Optionally, send image URL to your backend for storing in the database
        // await axios.post('/your-backend-endpoint', { imageUrl });

      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({
      ...vehicleDetails,
      [name]: value,
    });

    // Remove error message once user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Check if all fields are non-empty
    Object.keys(vehicleDetails).forEach((key) => {
      if (!vehicleDetails[key] && key !== 'vehicleImage') { // Exclude vehicleImage from required fields
        formIsValid = false;
        errors[key] = `${key} is required`;
      }
    });

    if (vehicleDetails.registrationNumber && vehicleDetails.registrationNumber.length !== 10) {
      formIsValid = false;
      errors.registrationNumber = 'Registration number must be 10 characters long';
    }

    if (vehicleDetails.engineNumber && vehicleDetails.engineNumber.length !== 10) {
      formIsValid = false;
      errors.engineNumber = 'Engine number must be 10 characters long';
    }

    if (vehicleDetails.mileage && isNaN(vehicleDetails.mileage)) {
      formIsValid = false;
      errors.mileage = 'Mileage must be a number';
    }

    if (vehicleDetails.yearOfManufacture && (isNaN(vehicleDetails.yearOfManufacture) || vehicleDetails.yearOfManufacture.length !== 4)) {
      formIsValid = false;
      errors.yearOfManufacture = 'Year of Manufacture must be a 4-digit number';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form is valid and ready to be submitted');
      try {
        // Send vehicleDetails to your backend
        await axios.post('/your-backend-endpoint', vehicleDetails);
        console.log('Vehicle details saved successfully');
      } catch (error) {
        console.error('Error saving vehicle details:', error);
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
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
              <img src={vehicleDetails.vehicleImage || 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1724774191/111_-Add_Car_Details-_transport_vehicle-512_ptci8m.png'} alt="Vehicle" className="vehicle-preview" />
            </label>
          </div>
          <div className='vehicle'>
            <label className="required">Vehicle Name:</label>
            <input 
              type="text" 
              name="vehicleName" 
              value={vehicleDetails.vehicleName} 
              onChange={handleChange} 
            />
            {errors.vehicleName && <span className="error-message">{errors.vehicleName}</span>}

            <label>Vehicle ID:</label>
            <input 
              type="text" 
              name="vehicleId" 
              value={vehicleDetails.vehicleId} 
              readOnly // Making ID read-only as it is auto-generated
            />

            <label htmlFor="imageUpload" style={{ marginRight: '10px',  content: '*',
   }}>*Upload Image:</label>
            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
          </div>

          <div className="vendor-details">
            <h3>Vendor Details</h3>
            <label className="required">Vendor Name:</label>
            <input 
              type="text" 
              name="vendorName" 
              value={vehicleDetails.vendorName} 
              onChange={handleChange} 
            />
            {errors.vendorName && <span className="error-message">{errors.vendorName}</span>}

            <label className="required">Vendor ID:</label>
            <input 
              type="text" 
              name="vendorId" 
              value={vehicleDetails.vendorId} 
              onChange={handleChange} 
            />
            {errors.vendorId && <span className="error-message">{errors.vendorId}</span>}
          </div>
        </div>

        <div className="right-section">
          <div className="vehicle-details">
            <h3>Vehicle Details</h3>
            <label className="required">Registration Number:</label>
            <input 
              type="text" 
              name="registrationNumber" 
              value={vehicleDetails.registrationNumber} 
              onChange={handleChange} 
            />
            {errors.registrationNumber && <span className="error-message">{errors.registrationNumber}</span>}

            <label className="required">Engine Number:</label>
            <input 
              type="text" 
              name="engineNumber" 
              value={vehicleDetails.engineNumber} 
              onChange={handleChange} 
            />
            {errors.engineNumber && <span className="error-message">{errors.engineNumber}</span>}

            <label className="required">Fuel Type:</label>
            <input 
              type="text" 
              name="fuelType" 
              value={vehicleDetails.fuelType} 
              onChange={handleChange} 
            />
            {errors.fuelType && <span className="error-message">{errors.fuelType}</span>}

            <label className="required">Chassis Number:</label>
            <input 
              type="text" 
              name="chassisNumber" 
              value={vehicleDetails.chassisNumber} 
              onChange={handleChange} 
            />
            {errors.chassisNumber && <span className="error-message">{errors.chassisNumber}</span>}

            <label className="required">Seat Capacity:</label>
            <input 
              type="text" 
              name="seatCapacity" 
              value={vehicleDetails.seatCapacity} 
              onChange={handleChange} 
            />
            {errors.seatCapacity && <span className="error-message">{errors.seatCapacity}</span>}

            <label className="required">Mileage:</label>
            <input 
              type="text" 
              name="mileage" 
              value={vehicleDetails.mileage} 
              onChange={handleChange} 
            />
            {errors.mileage && <span className="error-message">{errors.mileage}</span>}

            <label className="required">Year of Manufacture:</label>
            <input 
              type="text" 
              name="yearOfManufacture" 
              value={vehicleDetails.yearOfManufacture} 
              onChange={handleChange} 
            />
            {errors.yearOfManufacture && <span className="error-message">{errors.yearOfManufacture}</span>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;
