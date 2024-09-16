import axios from 'axios';
import './AddVehicle.css';
import { useState } from 'react';
import { FaUser, FaIdCard, FaTruck, FaListAlt, FaGasPump, FaCogs, FaUsers, FaTachometerAlt, FaCalendarAlt, FaImage } from 'react-icons/fa';

const CLOUDINARY_UPLOAD_PRESET = 'q6fwknmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload';



const VehicleForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleName: '',
    vehicleType:'',
    vehicleNumber: '',
    vendorName: '',
    
    insuranceNumber:'',
    mileage:'',
    yearOfManufacturing:'',
    
    fuelType: '',
    seatCapacity: '',
   
    vehicleImage: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
          headers: {
            'Content-Type':'multipart/form-data',
          },
        });

        const imageUrl = response.data.secure_url;
        setVehicleDetails((prevDetails) => ({
          ...prevDetails,
          vehicleImage: imageUrl,
        }));

       
        setErrors((prevErrors) => ({
          ...prevErrors,
          vehicleImage: '',
        }));
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    
    Object.keys(vehicleDetails).forEach((key) => {
      if (!vehicleDetails[key] && key !== 'vehicleImage') { 
        formIsValid = false;
        errors[key] = '${key} is required'; 
      }
    });

   
    if (!vehicleDetails.vehicleImage.trim()) {
      formIsValid = false;
      errors.vehicleImage = 'Vehicle image is required';
    }


    // if (vehicleDetails.registrationNumber && vehicleDetails.registrationNumber.length !== 10) {
    //   formIsValid = false;
    //   errors.registrationNumber = 'Registration number must be 10 characters long';
    // }
    
    // if (vehicleDetails.engineNumber && vehicleDetails.engineNumber.length !== 10) {
    //   formIsValid = false;
    //   errors.engineNumber = 'Engine number must be 10 characters long';
    // }

    if (vehicleDetails.mileage && isNaN(vehicleDetails.mileage)) {
      formIsValid = false;
      errors.mileage = 'Mileage must be a number';
    }

    if (vehicleDetails.yearOfManufacturing && (isNaN(vehicleDetails.yearOfManufacturing) || vehicleDetails.yearOfManufacturing.length !== 4)) {
      formIsValid = false;
      errors.yearOfManufacturing = 'Year of Manufacture must be a 4-digit number';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (validateForm()) {
      setLoading(true);
      try {
        await axios.post('http://localhost:8083/add-vehicle', vehicleDetails);
        window.alert("form submitted succesfully")
        console.log('Vehicle details saved successfully');
      } catch (error) {
        window.alert("error saving the vehicle data")
        console.error('Error saving vehicle details:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className='headddd'>Add Vehicle</h2>
        <button type="submit" className="save-button" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="form-content">
        <div className="form-field">
          <label className="required"><FaTruck className="icon11" />Vehicle Name:</label>
          <input 
            type="text" 
            name="vehicleName" 
            value={vehicleDetails.vehicleName} 
            onChange={handleChange} 
          />
          {errors.vehicleName && <span className="error-message">{errors.vehicleType}</span>}
        </div>
        <div className="form-field">
          <label className="required"><FaTruck className="icon11" />Vehicle Type:</label>
          <input 
            type="text" 
            name="vehicleType" 
            value={vehicleDetails.vehicleType }
            onChange={handleChange} 
          />
          {errors.vehicleType && <span className="error-message">{errors.vehicleType}</span>}
        </div>
        <div className="form-field">
          <label className="required"><FaUser className="icon11" />Vehicle Number:</label>
          <input 
            type="text" 
            name="vehicleNumber" 
            value={vehicleDetails.vehicleNumber} 
            onChange={handleChange} 
          />
          {errors.vehicleNumber && <span className="error-message">{errors.vehicleNumber}</span>}
        </div>

        {/* <div className="form-field">
          <label><FaIdCard className="icon11" />Vehicle ID:</label>
          <input 
            type="text" 
            name="vehicleId" 
            value={vehicleDetails.vehicleId} 
            readOnly
          />
        </div> */}

        <div className="form-field">
          <label className="required"><FaImage className="icon11" />Vehicle Image:</label>
          <input 
            type="file" 
            name="vehicleImage" 
            accept="image/*"
            onChange={handleImageUpload} 
          />
          {errors.vehicleImage && <span className="error-message">{errors.vehicleImage}</span>}
        </div>

        {/* <div className="form-field">
          <label className="required"><FaIdCard className="icon11" />Registration Number:</label>
          <input 
            type="text" 
            name="registrationNumber" 
            value={vehicleDetails.registrationNumber} 
            onChange={handleChange} 
          />
          {errors.registrationNumber && <span className="error-message">{errors.registrationNumber}</span>}
        </div> */}
{/* 
        <div className="form-field">
          <label className="required"><FaCogs className="icon11" />Engine Number:</label>
          <input 
            type="text" 
            name="engineNumber" 
            value={vehicleDetails.engineNumber} 
            onChange={handleChange} 
          />
          {errors.engineNumber && <span className="error-message">{errors.engineNumber}</span>}
        </div> */}
        <div className="form-field">
          <label className="required"><FaCogs className="icon11" />Insurance  Number:</label>
          <input 
            type="text" 
            name="insuranceNumber" 
            value={vehicleDetails.insuranceNumber} 
            onChange={handleChange} 
          />
          {errors.insuranceNumber && <span className="error-message">{errors.insuranceNumber}</span>}
        </div>

        {/* <div className="form-field">
          <label className="required"><FaCogs className="icon11" />Chassis Number:</label>
          <input 
            type="text" 
            name="chassisNumber" 
            value={vehicleDetails.chassisNumber} 
            onChange={handleChange} 
          />
          {errors.chassisNumber && <span className="error-message">{errors.chassisNumber}</span>}
        </div> */}

        <div className="form-field">
          <label className="required"><FaTachometerAlt className="icon11" />Mileage:</label>
          <input 
            type="number" 
            name="mileage" 
            value={vehicleDetails.mileage} 
            onChange={handleChange} 
          />
          {errors.mileage && <span className="error-message">{errors.mileage}</span>}
        </div>

         <div className="form-field">
          <label className="required"><FaGasPump className="icon11" />Fuel Type:</label>
          <input 
            type="text" 
            name="fuelType" 
            value={vehicleDetails.fuelType} 
            onChange={handleChange} 
          />
          {errors.fuelType && <span className="error-message">{errors.fuelType}</span>}
        </div> 

        <div className="form-field">
          <label className="required"><FaUsers className="icon11" />Seat Capacity:</label>
          <input 
            type="number" 
            name="seatCapacity" 
            value={vehicleDetails.seatCapacity} 
            onChange={handleChange} 
          />
          {errors.seatCapacity && <span className="error-message">{errors.seatCapacity}</span>}
        </div>

        <div className="form-field">
          <label className="required"><FaUser className="icon11" />Vendor Name:</label>
          <input 
            type="text" 
            name="vendorName" 
            value={vehicleDetails.vendorName} 
            onChange={handleChange} 
          />
          {errors.vendorName && <span className="error-message">{errors.vendorName}</span>}
        </div>

        {/* <div className="form-field">
          <label className="required"><FaListAlt className="icon11" />Vendor ID:</label>
          <input 
            type="text" 
            name="vendorId" 
            value={vehicleDetails.vendorId} 
            onChange={handleChange} 
          />
          {errors.vendorId && <span className="error-message">{errors.vendorId}</span>}
        </div> */}

        <div className="form-field">
          <label className="required"><FaCalendarAlt className="icon11" />Year of Manufacturing:</label>
          <input 
            type="text" 
            name="yearOfManufacturing" 
            value={vehicleDetails.yearOfManufacturing} 
            onChange={handleChange} 
          />
          {errors.yearOfManufacturing && <span className="error-message">{errors.yearOfManufacturing}</span>}
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;