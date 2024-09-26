
import { useState, useEffect } from "react";
import "./newdriver.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Newdriver() {
  const [driverName, setDriverName] = useState("");
  const [vendorName, setVendorName] = useState("")
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [profileImages, setProfileImages] = useState({});
  const [profilePic, setProfilePic] = useState('');
  // const generateRandomId = (length = 8) => {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let result = '';
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return result;
  // };

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

    if (!driverName) errorMessages += "Driver Name is required.\n";
    if (!email) {
      errorMessages += "Email is required.\n";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessages += "Email is invalid.\n";
    }
    if (!contact) {
      errorMessages += "Contact number is required.\n";
    } else if (!/^[6-9]\d{9}$/.test(contact)) {
      errorMessages += "Contact number is invalid.\n";
    }
    if (!gender) errorMessages += "Gender is required.\n";
    if (!dob) errorMessages += "Date of Birth is required.\n";
    if (!address) errorMessages += "Address is required.\n";
    if (!aadhar) {
      errorMessages += "Aadhar number is required.\n";
    } else if (!/^\d{12}$/.test(aadhar)) {
      errorMessages += "Aadhar number is invalid.\n";
    }
    if (!pan) {
      errorMessages += "PAN card number is required.\n";
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan)) {
      errorMessages += "PAN card number is invalid.\n";
    }
    if (!licenceNumber) {
      errorMessages += "Licence number is required.\n";
    } else if (!/^[0-9]{10}$/.test(licenceNumber)) {
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
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'q6fwknmo'); // Replace with your Cloudinary upload preset

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload', // Replace with your Cloudinary upload URL
          formData
        );

        const profilePicurl = response.data.secure_url;
        console.log(profilePicurl)
        setProfilePic(profilePicurl);

        setProfileImages(prevImages => ({ ...prevImages, profilePicurl }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      alert('Please upload a valid image file (JPG or PNG).');
    }
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    // let driverId = generateRandomId();
    console.log(profilePic)
    if (validate()) {
      console.log({
        // driverId,
        driverName,
        contact,
        email,
        gender,
        dob,
        address,
        aadhar,
        pan,
        licenceNumber,
        experience,
        profilePic,
        vendorName,
      });

      navigate("/viewdrivers", {
        state: {
          driverName,
          contact,
          email,
          gender,
          dob,
          address,
          aadhar,
          pan,
          licenceNumber,
          experience,
          profilePic,
          vendorName,
        },
      });

      axios.post("http://localhost:8081/addDriver", {
        // driverId,
        driverName,
        vendorName,
        contact,
        email,
        gender,
        dob,
        address,
        aadhar,
        pan,
        licenceNumber,
        experience,
        profilePic,
        
      })
      .then((result) => {
        console.log(result.data);
        alert("Driver details added!")
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
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className="dr-namem"
            type="text"
            placeholder="Driver Name"
          />
        </div>
        <div className="email-dr">
          <label className="l-emailm">E-mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dr-emailm"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="mob-dr">
          <label className="l-mobm">Contact Number</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="dr-mobm"
            type="number"
            placeholder="Contact Number"
          />
        </div>
        <div className="gen-dr">
          <label className="l-genm">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
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
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="dr-dobm"
            type="date"
            placeholder="DOB"
          />
        </div>
        <div className="address-dr">
          <label className="l-addressm">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="dr-addressm"
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="lic-dr">
          <label className="l-licm">Licence Number</label>
          <input
            value={licenceNumber}
            onChange={(e) => setLicenceNumber(e.target.value)}
            className="dr-licm"
            type="text"
            placeholder="Licence Number"
          />
        </div>
        <div className="pan-dr">
          <label className="l-panm">PAN Num</label>
          <input
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            className="dr-panm"
            type="text"
            placeholder="Pan Number"
          />
        </div>
        <div className="aadhar-dr">
          <label className="l-aadharm">Aadhar No</label>
          <input
            type="text"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            className="dr-aadharm"
            placeholder="Aadhar Number"
          />
        </div>
        <div className="exp-dr">
          <label className="l-expm">Experience</label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="dr-expm"
            placeholder="Experience"
          />
          </div>
          <div className="vendor-name">
          <label className="l-ven">Vendor Name</label>
            <input
          type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="dr-ven"
            placeholder="Vendor Name"
            />
          
        </div>
        <div className="dr-imgm">
  <label className="l-img">Profile Image:</label>
    <input
      type="file"
      name="driver-image"
      id="driver-image"
      accept="image/*"
      onChange={(e) => handleProfileImageChange(e)}
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
