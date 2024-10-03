
import { useState, useEffect } from "react";
import "./newdriver.css";
import axios from 'axios';

function Newdriver() {
  const [vendors, setVendors] = useState([]);
  const [addDriver, setAddDriver] = useState({
    DriverName: '',
    DriverPhone: '',
    DriverEmail: '',
    DriverGender: '',
    DriverDOB: '',
    DriverAddress: '',
    DriverAadhar: '',
    DriverLicense: '',
    DriverPAN: '',
    DriverImage: '',
    DriverExperience: '',
    VendorId: '',
  });

  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    const savedImages = localStorage.getItem('profileImages');
    if (savedImages) {
      setProfileImages(JSON.parse(savedImages));
    }
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor/getIdnName`);
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    localStorage.setItem('profileImages', JSON.stringify(profileImages));
  }, [profileImages]);

  // Function to update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddDriver((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let errorMessages = "";

    const {
      DriverName,
      DriverEmail,
      DriverPhone,
      DriverGender,
      DriverDOB,
      DriverAddress,
      DriverAadhar,
      DriverPAN,
      DriverLicense
    } = addDriver;

    if (!DriverName) errorMessages += "Driver Name is required.\n";
    if (!DriverEmail) {
      errorMessages += "Email is required.\n";
    } else if (!/\S+@\S+\.\S+/.test(DriverEmail)) {
      errorMessages += "Email is invalid.\n";
    }
    if (!DriverPhone) {
      errorMessages += "Contact number is required.\n";
    } else if (!/^[6-9]\d{9}$/.test(DriverPhone)) {
      errorMessages += "Contact number is invalid.\n";
    }
    if (!DriverGender) errorMessages += "Gender is required.\n";
    if (!DriverDOB) errorMessages += "Date of Birth is required.\n";
    if (!DriverAddress) errorMessages += "Address is required.\n";
    if (!DriverAadhar) {
      errorMessages += "Aadhar number is required.\n";
    } else if (!/^\d{12}$/.test(DriverAadhar)) {
      errorMessages += "Aadhar number is invalid.\n";
    }
    if (!DriverPAN) {
      errorMessages += "PAN card number is required.\n";
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(DriverPAN)) {
      errorMessages += "PAN card number is invalid.\n";
    }
    if (!DriverLicense) {
      errorMessages += "Licence number is required.\n";
    } else if (!/^[0-9]{10}$/.test(DriverLicense)) {
      errorMessages += "Licence number is invalid.\n";
    }

    if (errorMessages) {
      alert(errorMessages); // Show popup alert with validation errors
      return false;
    }

    return true;
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'q6fwknmo');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload',
        formData
      );

      const ProfilePicurl = response.data.secure_url;
      console.log(ProfilePicurl)
      setAddDriver((prevState) => ({
        ...prevState,
        DriverImage: ProfilePicurl,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = () => {
    if (validate) {

      console.log(addDriver);

      axios.post(`${process.env.REACT_APP_BACKEND_URL}/driver/addDriver`, addDriver)
        .then((result) => {
          console.log(result.data);

        })
        .catch((error) => {
          console.error(error);
          alert("Unable to add driver details!")
        });
    }
  };

  return (
    <div className="driver-form-details-m">
      {/* <h2 className="add-driver-head">Add Driver</h2> */}
      <div className="form-details">
        {/* Form fields */}
        <div className="name-dr">
          <label className="l-namem">Driver Name</label>
          <input
            name="DriverName"
            onChange={handleInputChange}
            className="dr-namem"
            type="text"
            placeholder="Driver Name"
          />
        </div>

        <div className="email-dr">
          <label className="l-emailm">E-mail</label>
          <input
            name="DriverEmail"
            onChange={handleInputChange}
            className="dr-emailm"
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="mob-dr">
          <label className="l-mobm">Contact Number</label>
          <input
            name="DriverPhone"
            onChange={handleInputChange}
            className="dr-mobm"
            type="number"
            placeholder="Contact Number"
          />
        </div>

        <div className="gen-dr">
          <label className="l-genm">Gender</label>
          <select
            name="DriverGender"
            onChange={handleInputChange}
            className="dr-genm"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="dob-dr">
          <label className="l-dobm">DOB</label>
          <input
            name="DriverDOB"
            onChange={handleInputChange}
            className="dr-dobm"
            type="date"
            placeholder="DOB"
          />
        </div>

        <div className="address-dr">
          <label className="l-addressm">Address</label>
          <input
            name="DriverAddress"
            onChange={handleInputChange}
            className="dr-addressm"
            type="text"
            placeholder="Address"
          />
        </div>

        <div className="aadhar-dr">
          <label className="l-aadharm">Aadhar No</label>
          <input
            name="DriverAadhar"
            type="text"
            onChange={handleInputChange}
            className="dr-aadharm"
            placeholder="Aadhar Number"
          />
        </div>

        <div className="lic-dr">
          <label className="l-licm">Licence Number</label>
          <input
            name="DriverLicense"
            onChange={handleInputChange}
            className="dr-licm"
            type="text"
            placeholder="Licence Number"
          />
        </div>

        <div className="pan-dr">
          <label className="l-panm">PAN Number</label>
          <input
            name="DriverPAN"
            onChange={handleInputChange}
            className="dr-panm"
            type="text"
            placeholder="PAN Number"
          />
        </div>

        <div className="exp-dr">
          <label className="l-expm">Experience</label>
          <input
            name="DriverExperience"
            type="text"
            onChange={handleInputChange}
            className="dr-expm"
            placeholder="Experience"
          />
        </div>

        <div className="vendor-name">
          <label className="l-ven">Vendor Name</label>
          <select
            name="VendorId"
            onChange={handleInputChange}
            className="dr-ven"
          >
            <option value="">
              Select Vendor
            </option>
            {vendors.map((vendor) => (
              <option key={vendor.VendorId} value={vendor.VendorId}>
                {vendor.VendorName}
              </option>
            ))}
          </select>
        </div>

        <div className="dr-imgm">
          <label className="l-img">Profile Image:</label>
          <input
            type="file"
            name="ProfilePic"
            id="driver-image"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </div>
      </div>
      <button className="dr-submitm" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Newdriver;
