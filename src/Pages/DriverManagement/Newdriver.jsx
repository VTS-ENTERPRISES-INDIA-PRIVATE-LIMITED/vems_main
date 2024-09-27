
import { useState, useEffect } from "react";
import "./newdriver.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Newdriver() {
  const [addDriver, setAddDriver] = useState({
    DriverName: "",
    VendorName: "",
    Contact: "",
    Email: "",
    Gender: "",
    DOB: "",
    Address: "",
    Aadhar: "",
    Pan: "",
    LicenceNumber: "",
    Experience: "",
    ProfilePic: ""
  });

  // Function to update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddDriver((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    const savedImages = localStorage.getItem('profileImages');
    if (savedImages) {
      setProfileImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profileImages', JSON.stringify(profileImages));
  }, [profileImages]);

  const validate = () => {
    let errorMessages = "";

    const {
      DriverName,
      Email,
      Contact,
      Gender,
      DOB,
      Address,
      Aadhar,
      Pan,
      LicenceNumber
    } = addDriver;

    if (!DriverName) errorMessages += "Driver Name is required.\n";
    if (!Email) {
      errorMessages += "Email is required.\n";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errorMessages += "Email is invalid.\n";
    }
    if (!Contact) {
      errorMessages += "Contact number is required.\n";
    } else if (!/^[6-9]\d{9}$/.test(Contact)) {
      errorMessages += "Contact number is invalid.\n";
    }
    if (!Gender) errorMessages += "Gender is required.\n";
    if (!DOB) errorMessages += "Date of Birth is required.\n";
    if (!Address) errorMessages += "Address is required.\n";
    if (!Aadhar) {
      errorMessages += "Aadhar number is required.\n";
    } else if (!/^\d{12}$/.test(Aadhar)) {
      errorMessages += "Aadhar number is invalid.\n";
    }
    if (!Pan) {
      errorMessages += "PAN card number is required.\n";
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(Pan)) {
      errorMessages += "PAN card number is invalid.\n";
    }
    if (!LicenceNumber) {
      errorMessages += "Licence number is required.\n";
    } else if (!/^[0-9]{10}$/.test(LicenceNumber)) {
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
          ProfilePic: ProfilePicurl,
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (validate()) {
      // navigate("/viewdrivers", {
      //   state: addDriver,
      // });

      console.log(addDriver);

      axios.post(`${process.env.REACT_APP_BACKEND_URL}/addDriver`, addDriver)
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
      <div className="form-detaisl">
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
            name="Email"
            onChange={handleInputChange}
            className="dr-emailm"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="mob-dr">
          <label className="l-mobm">Contact Number</label>
          <input
            name="Contact"
            onChange={handleInputChange}
            className="dr-mobm"
            type="number"
            placeholder="Contact Number"
          />
        </div>
        <div className="gen-dr">
          <label className="l-genm">Gender</label>
          <select
            name="Gender"
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
            name="DOB"
            onChange={handleInputChange}
            className="dr-dobm"
            type="date"
            placeholder="DOB"
          />
        </div>
        <div className="address-dr">
          <label className="l-addressm">Address</label>
          <input
            name="Address"
            onChange={handleInputChange}
            className="dr-addressm"
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="lic-dr">
          <label className="l-licm">Licence Number</label>
          <input
            name="LicenceNumber"
            onChange={handleInputChange}
            className="dr-licm"
            type="text"
            placeholder="Licence Number"
          />
        </div>
        <div className="pan-dr">
          <label className="l-panm">PAN Num</label>
          <input
            name="Pan"
            onChange={handleInputChange}
            className="dr-panm"
            type="text"
            placeholder="Pan Number"
          />
        </div>
        <div className="aadhar-dr">
          <label className="l-aadharm">Aadhar No</label>
          <input
            name="Aadhar"
            type="text"
            onChange={handleInputChange}
            className="dr-aadharm"
            placeholder="Aadhar Number"
          />
        </div>
        <div className="exp-dr">
          <label className="l-expm">Experience</label>
          <input
            name="Experience"
            type="text"
            onChange={handleInputChange}
            className="dr-expm"
            placeholder="Experience"
          />
        </div>
        <div className="vendor-name">
          <label className="l-ven">Vendor Name</label>
          <input
            type="text"
            name="VendorName"
            onChange={handleInputChange}
            className="dr-ven"
            placeholder="Vendor Name"
          />

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
