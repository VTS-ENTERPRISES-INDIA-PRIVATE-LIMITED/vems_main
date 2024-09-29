import axios from 'axios';
import './AddVehicle.css';
import { useState } from 'react';
import { FaUser, FaTruck, FaGasPump, FaCogs, FaUsers, FaTachometerAlt, FaCalendarAlt, FaImage } from 'react-icons/fa';

const CLOUDINARY_UPLOAD_PRESET = 'q6fwknmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload';



const VehicleForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    VehicleName: '',
    VehicleType: '',
    VehicleNumber: '',
    VendorName: '',
    InsuranceNumber: '',
    Mileage: '',
    YearOfManufacturing: '',
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
            'Content-Type': 'multipart/form-data',
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
        setErrors((prevErrors) => ({
          ...prevErrors,
          VehicleImage: 'Image upload failed. Please try again.',
        }));
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
        errors[key] = `${key} is required`;
      }
    });
    if (!vehicleDetails.VehicleImage.trim()) {
      formIsValid = false;
      errors.VehicleImage = 'Vehicle image is required';
    }

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

      // Prepare the form data to include the image file and other details
      const formData = new FormData();
      for (const key in vehicleDetails) {
        formData.append(key, vehicleDetails[key]);
      }

      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/vehicle/addVehicle`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        window.alert("Form submitted successfully");
        console.log('Vehicle details saved successfully');
      } catch (error) {
        window.alert("Error saving the vehicle data");
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
          {errors.VehicleName && <span className="error-message">{errors.VehicleName}</span>}
        </div>

        <div className="form-field1">
          <label className="required1"><FaTruck className="icon11" />Vehicle Type:</label>
          <input
            type="text"
            name="VehicleType"
            value={vehicleDetails.VehicleType}
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

        <div className="form-field1">
          <label className="required1"><FaCogs className="icon11" />Insurance Number:</label>
          <input
            type="text"
            name="VehicleInsuranceNumber"
            value={vehicleDetails.VehicleInsuranceNumber}
            onChange={handleChange}
          />
          {errors.VehicleInsuranceNumber && <span className="error-message">{errors.VehicleInsuranceNumber}</span>}
        </div>

        <div className="form-field1">
          <label className="required1"><FaTachometerAlt className="icon11" />Vehicle Mileage Range:</label>
          <input
            type="text"
            name="VehicleMileageRange"
            value={vehicleDetails.VehicleMileageRange}
            onChange={handleChange}
          />
          {errors.VehicleMileageRange && <span className="error-message">{errors.VehicleMileageRange}</span>}
        </div>

        <div className="form-field1">
          <label className="required1"><FaGasPump className="icon11" />Vehicle Fuel Type:</label>
          <input
            type="text"
            name="VehicleFuelType"
            value={vehicleDetails.VehicleFuelType}
            onChange={handleChange}
          />
          {errors.VehicleFuelType && <span className="error-message">{errors.VehicleFuelType}</span>}
        </div>

        <div className="form-field1">
          <label className="required1"><FaUsers className="icon11" />Seat Capacity:</label>
          <input
            type="number"
            name="VehicleSeatCapacity"
            value={vehicleDetails.VehicleSeatCapacity}
            onChange={handleChange}
          />
          {errors.VehicleSeatCapacity && <span className="error-message">{errors.VehicleSeatCapacity}</span>}
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

        <div className="form-field1">
          <label className="required1"><FaCalendarAlt className="icon11" />Manufactured Year:</label>
          <input
            type="text"
            name="VehicleManufacturedYear"
            value={vehicleDetails.VehicleManufacturedYear}
            onChange={handleChange}
          />
          {errors.VehicleManufacturedYear && <span className="error-message">{errors.VehicleManufacturedYear}</span>}
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;