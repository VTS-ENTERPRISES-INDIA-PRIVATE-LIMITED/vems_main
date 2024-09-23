import axios from 'axios';
import './AddVehicle.css';
import { useState } from 'react';
import { FaUser, FaIdCard, FaTruck, FaListAlt, FaGasPump, FaCogs, FaUsers, FaTachometerAlt, FaCalendarAlt, FaImage } from 'react-icons/fa';

const CLOUDINARY_UPLOAD_PRESET = 'q6fwknmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload';



const VehicleForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    VehicleName: '',
    VehicleType:'',
    VehicleNumber: '',
    VendorName: '',
    
    InsuranceNumber:'',
    Mileage:'',
    YearOfManufacturing:'',
    
    FuelType: '',
    SeatCapacity: '',
   
    VehicleImage: '',
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
          VehicleImage: imageUrl,
        }));

       
        setErrors((prevErrors) => ({
          ...prevErrors,
          VehicleImage: '',
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
      if (!vehicleDetails[key] && key !== 'VehicleImage') { 
        formIsValid = false;
        errors[key] =  `${key} is required1 `; 
      }
    });

   
    if (!vehicleDetails.VehicleImage.trim()) {
      formIsValid = false;
      errors.VehicleImage = 'Vehicle image is required1';
    }


    // if (vehicleDetails.registrationNumber && vehicleDetails.registrationNumber.length !== 10) {
    //   formIsValid = false;
    //   errors.registrationNumber = 'Registration number must be 10 characters long';
    // }
    
    // if (vehicleDetails.engineNumber && vehicleDetails.engineNumber.length !== 10) {
    //   formIsValid = false;
    //   errors.engineNumber = 'Engine number must be 10 characters long';
    // }

    if (vehicleDetails.Mileage && isNaN(vehicleDetails.Mileage)) {
      formIsValid = false;
      errors.Mileage = 'Mileage must be a number';
    }

    if (vehicleDetails.YearOfManufacturing && (isNaN(vehicleDetails.YearOfManufacturing) || vehicleDetails.YearOfManufacturing.length !== 4)) {
      formIsValid = false;
      errors.YearOfManufacturing = 'Year of Manufacture must be a 4-digit number';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (validateForm()) {
      setLoading(true);
      try {
        await axios.post('http://localhost:8081/add-vehicle', vehicleDetails);
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
      <div className="form-header1">
        <h2 className='headddd1'>Add Vehicle</h2>
        <button type="submit" className="save-button1" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="form-content1">
        <div className="form-field1">
          <label className="required1"><FaTruck className="icon11" />Vehicle Name:</label>
          <input 
            type="text" 
            name="VehicleName" 
            value={vehicleDetails.VehicleName} 
            onChange={handleChange} 
          />
          {errors.VehicleName && <span className="error-message">{errors.VehicleType}</span>}
        </div>
        <div className="form-field1">
          <label className="required1"><FaTruck className="icon11" />Vehicle Type:</label>
          <input 
            type="text" 
            name="VehicleType" 
            value={vehicleDetails.VehicleType }
            onChange={handleChange} 
          />
          {errors.VehicleType && <span className="error-message">{errors.VehicleType}</span>}
        </div>
        <div className="form-field1">
          <label className="required1"><FaUser className="icon11" />Vehicle Number:</label>
          <input 
            type="text" 
            name="VehicleNumber" 
            value={vehicleDetails.VehicleNumber} 
            onChange={handleChange} 
          />
          {errors.VehicleNumber && <span className="error-message">{errors.VehicleNumber}</span>}
        </div>

        {/* <div className="form-field1">
          <label><FaIdCard className="icon11" />Vehicle ID:</label>
          <input 
            type="text" 
            name="vehicleId" 
            value={vehicleDetails.vehicleId} 
            readOnly
          />
        </div> */}

        <div className="form-field1">
          <label className="required1"><FaImage className="icon11" />Vehicle Image:</label>
          <input 
            type="file" 
            name="VehicleImage" 
            accept="image/*"
            onChange={handleImageUpload} 
          />
          {errors.VehicleImage && <span className="error-message">{errors.VehicleImage}</span>}
        </div>

        {/* <div className="form-field1">
          <label className="required1"><FaIdCard className="icon11" />Registration Number:</label>
          <input 
            type="text" 
            name="registrationNumber" 
            value={vehicleDetails.registrationNumber} 
            onChange={handleChange} 
          />
          {errors.registrationNumber && <span className="error-message">{errors.registrationNumber}</span>}
        </div> */}
{/* 
        <div className="form-field1">
          <label className="required1"><FaCogs className="icon11" />Engine Number:</label>
          <input 
            type="text" 
            name="engineNumber" 
            value={vehicleDetails.engineNumber} 
            onChange={handleChange} 
          />
          {errors.engineNumber && <span className="error-message">{errors.engineNumber}</span>}
        </div> */}
        <div className="form-field1">
          <label className="required1"><FaCogs className="icon11" />Insurance  Number:</label>
          <input 
            type="text" 
            name="InsuranceNumber" 
            value={vehicleDetails.InsuranceNumber} 
            onChange={handleChange} 
          />
          {errors.InsuranceNumber && <span className="error-message">{errors.InsuranceNumber}</span>}
        </div>

        {/* <div className="form-field1">
          <label className="required1"><FaCogs className="icon11" />Chassis Number:</label>
          <input 
            type="text" 
            name="chassisNumber" 
            value={vehicleDetails.chassisNumber} 
            onChange={handleChange} 
          />
          {errors.chassisNumber && <span className="error-message">{errors.chassisNumber}</span>}
        </div> */}

        <div className="form-field1">
          <label className="required1"><FaTachometerAlt className="icon11" />Mileage:</label>
          <input 
            type="number" 
            name="Mileage" 
            value={vehicleDetails.Mileage} 
            onChange={handleChange} 
          />
          {errors.Mileage && <span className="error-message">{errors.Mileage}</span>}
        </div>

         <div className="form-field1">
          <label className="required1"><FaGasPump className="icon11" />Fuel Type:</label>
          <input 
            type="text" 
            name="FuelType" 
            value={vehicleDetails.FuelType} 
            onChange={handleChange} 
          />
          {errors.FuelType && <span className="error-message">{errors.FuelType}</span>}
        </div> 

        <div className="form-field1">
          <label className="required1"><FaUsers className="icon11" />Seat Capacity:</label>
          <input 
            type="number" 
            name="SeatCapacity" 
            value={vehicleDetails.SeatCapacity} 
            onChange={handleChange} 
          />
          {errors.SeatCapacity && <span className="error-message">{errors.SeatCapacity}</span>}
        </div>

        <div className="form-field1">
          <label className="required1"><FaUser className="icon11" />Vendor Name:</label>
          <input 
            type="text" 
            name="VendorName" 
            value={vehicleDetails.VendorName} 
            onChange={handleChange} 
          />
          {errors.VendorName && <span className="error-message">{errors.VendorName}</span>}
        </div>

        {/* <div className="form-field1">
          <label className="required1"><FaListAlt className="icon11" />Vendor ID:</label>
          <input 
            type="text" 
            name="vendorId" 
            value={vehicleDetails.vendorId} 
            onChange={handleChange} 
          />
          {errors.vendorId && <span className="error-message">{errors.vendorId}</span>}
        </div> */}

        <div className="form-field1">
          <label className="required1"><FaCalendarAlt className="icon11" />Year of Manufacturing:</label>
          <input 
            type="text" 
            name="YearOfManufacturing" 
            value={vehicleDetails.YearOfManufacturing} 
            onChange={handleChange} 
          />
          {errors.YearOfManufacturing && <span className="error-message">{errors.YearOfManufacturing}</span>}
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;