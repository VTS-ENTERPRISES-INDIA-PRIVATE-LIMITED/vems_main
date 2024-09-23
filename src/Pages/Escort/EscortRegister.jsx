 // import axios from 'axios';
// import { useState } from 'react';
// import {
//   FaUser, FaIdCard, FaPhone, FaCalendarAlt, FaAddressCard, FaCertificate, FaUserCircle, FaUserTie, FaCreditCard,
//   FaUniversity, FaBuilding, FaBarcode, FaClock
// } from 'react-icons/fa';
// import './EscortRegister.css';
// import axios  from 'axios';
// const CLOUDINARY_UPLOAD_PRESET = 'q6fwknmo';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbz2ydtp/imAge/upload';

// const EscortRegister = () => {
//   const [escortDetails, setEscortDetails] = useState({
//     EscortName: '',
//     ContactNumber: '',
//     Age: '',
//     Address: '',
//     AadharCard: '',
//     Certification: '',
//     EscortProfilePic: '',
//     AccountHandlerName: '',
//     AccountNumber: '',
//     BankName: '',
//     BranchName: '',
//     IfscCode: '',
//     Shift: '',
//   });

//   const [loading, setLoading] = useState(false);

//   const handleImAgeUpload = async (e, imAgeType) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//       try {
//         const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         const imAgeUrl = response.data.secure_url;
//         setEscortDetails((prevDetails) => ({
//           ...prevDetails,
//           [imAgeType]: imAgeUrl,
//         }));
//       } catch (error) {
//         console.error('Image upload failed:', error);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEscortDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post('http://localhost:8081/add-escort', escortDetails);
//       window.alert('Form submitted successfully');
//     } catch (error) {
//       window.alert('Error saving escort details');
//       console.error('Error saving escort details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="escort-form" onSubmit={handleSubmit}>
//       <div className="form-header">
//         <h2 className="headddd">Add Escort</h2>
//         <button type="submit" className="save-button" disabled={loading}>
//           {loading ? 'Saving...' : 'Save'}
//         </button>
//       </div>

//       <div className="form-content">
//         {/* Escort Name */}
//         <div className="form-field">
//           <label><FaUser className="icon11" /> Escort Name:</label>
//           <input type="text" name="EscortName" value={escortDetails.EscortName} onChange={handleChange} />
//         </div>

//         {/* Contact Number */}
//         <div className="form-field">
//           <label><FaPhone className="icon11" /> Contact Number:</label>
//           <input type="text" name="ContactNumber" value={escortDetails.ContactNumber} onChange={handleChange} />
//         </div>

//         {/* Age */}
//         <div className="form-field">
//           <label><FaCalendarAlt className="icon11" /> Age:</label>
//           <input type="number" name="Age" value={escortDetails.Age} onChange={handleChange} />
//         </div>

//         {/* Address */}
//         <div className="form-field">
//           <label><FaAddressCard className="icon11" /> Address:</label>
//           <input type="text" name="Address" value={escortDetails.Address} onChange={handleChange} />
//         </div>

//         {/* Aadhar Card Upload */}
//         <div className="form-field">
//           <label><FaIdCard className="icon11" /> Aadhar Card Upload:</label>
//           <input type="file" name="AadharCard" accept="image/*" +={(e) => handleImAgeUpload(e, 'AadharCard')} />
//         </div>

//         {/* Certification Upload */}
//         <div className="form-field">
//           <label><FaCertificate className="icon11" /> Certification Upload:</label>
//           <input type="file" name="Certification" accept="image/*" onChange={(e) => handleImAgeUpload(e, 'Certification')} />
//         </div>

//         {/* Escort Profile Pic Upload */}
//         <div className="form-field">
//           <label><FaUserCircle className="icon11" /> Escort Profile Pic Upload:</label>
//           <input type="file" name="EscortProfilePic" accept="image/*" onChange={(e) => handleImAgeUpload(e, 'EscortProfilePic')} />
//         </div>

//         {/* Account Handler Name */}
//         <div className="form-field">
//           <label><FaUserTie className="icon11" /> Account Handler Name:</label>
//           <input type="text" name="AccountHandlerName" value={escortDetails.AccountHandlerName} onChange={handleChange} />
//         </div>

//         {/* Account Number */}
//         <div className="form-field">
//           <label><FaCreditCard className="icon11" /> Account Number:</label>
//           <input type="text" name="AccountNumber" value={escortDetails.AccountNumber} onChange={handleChange} />
//         </div>

//         {/* Bank Name */}
//         <div className="form-field">
//           <label><FaUniversity className="icon11" /> Bank Name:</label>
//           <input type="text" name="BankName" value={escortDetails.BankName} onChange={handleChange} />
//         </div>

//         {/* Branch Name */}
//         <div className="form-field">
//           <label><FaBuilding className="icon11" /> Branch Name:</label>
//           <input type="text" name="BranchName" value={escortDetails.BranchName} onChange={handleChange} />
//         </div>

//         {/* IFSC Code */}
//         <div className="form-field">
//           <label><FaBarcode className="icon11" /> IFSC Code:</label>
//           <input type="text" name="IfscCode" value={escortDetails.IfscCode} onChange={handleChange} />
//         </div>

//         {/* Shift */}
//         <div className="form-field">
//           <label><FaClock className="icon11" /> Shift:</label>
//           <input type="text" name="Shift" value={escortDetails.Shift} onChange={handleChange} />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default EscortRegister;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './EscortRegister.css';


const Registers = () => {
  
  const [EscortName, setEscortName] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [Age, setAge] = useState('');
  const [Address, setAddress] = useState('');
  
  const [AadharCardUpload, setAadharCardUpload] = useState(null);
 
  const [CertificationUpload, setCertificationUpload] = useState(null);
  const [EscortProfilePicUpload, setEscortProfilePicUpload] = useState(null);
  const [AccountHandlerName, setAccountHandlerName] = useState('');
  const [AccountNumber, setAccountNumber] = useState('');
  const [BankName, setBankName] = useState('');
  const [BranchName, setBranchName] = useState('');
  const [IFSCCode, setIFSCCode] = useState('');
  const [Shift, setShift] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('EscortName', EscortName);
    formData.append('ContactNumber', ContactNumber);
    formData.append('Age', Age);
    
    formData.append('Address', Address);
    
    formData.append('AadharCardUpload', AadharCardUpload);
    
    formData.append('CertificationUpload', CertificationUpload);
    formData.append('EscortProfilePicUpload', EscortProfilePicUpload);
    formData.append('AccountHandlerName', AccountHandlerName);
    formData.append('AccountNumber', AccountNumber);
    formData.append('BankName', BankName);
    formData.append('BranchName', BranchName);
    formData.append('IFSCCode', IFSCCode);
    formData.append('Shift', Shift);

    try {
      const response = await axios.post('http://localhost:8001/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response && response.data) {
        alert('Registration Successfull');
        navigate('/'); 
      } else {
        alert('Unexpected response format');
      }
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.response) {
          const message = error.response.data?.message || 'Registration failed';
          alert(`Registration failed: ${message}`);
        } else {
          alert('An unexpected error occurred.');
        }
      }
  };

  return (
    <div className="escort-form">
      <h2>Escort Registration</h2>
      <form onSubmit={handleSubmit} className="escort-registration-form">
        
        <div className='form-content'>
            <div className='form-field'>
          <label htmlFor="EscortName">Escort Name</label>
          <input
            type="text"
            id="EscortName"
            value={EscortName}
            onChange={(e) => setEscortName(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="ContactNumber">Contact Number</label>
          <input
            type="text"
            id="ContactNumber"
            value={ContactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="Age">Age</label>
          <input
            type="text"
            id="Age"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        
        <div className='form-field'>
          <label htmlFor="AadharCardUpload">Aadhar Card Upload</label>
          <input
            type="file"
            id="AadharCardUpload"
            onChange={handleFileChange(setAadharCardUpload)}
            required
          />
        </div>
       
        <div className='form-field'>
          <label htmlFor="CertificationUpload">Certification Upload</label>
          <input
            type="file"
            id="CertificationUpload"
            onChange={handleFileChange(setCertificationUpload)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="EscortProfilePicUpload">Escort Profile Pic Upload</label>
          <input
            type="file"
            id="EscortProfilePicUpload"
            onChange={handleFileChange(setEscortProfilePicUpload)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="AccountHandlerName">Account Handler Name</label>
          <input
            type="text"
            id="AccountHandlerName"
            value={AccountHandlerName}
            onChange={(e) => setAccountHandlerName(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="AccountNumber">Account Number</label>
          <input
            type="text"
            id="AccountNumber"
            value={AccountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="BankName">Bank Name</label>
          <input
            type="text"
            id="BankName"
            value={BankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="BranchName">Branch Name</label>
          <input
            type="text"
            id="BranchName"
            value={BranchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="IFSCCode">IFSC Code</label>
          <input
            type="text"
            id="IFSCCode"
            value={IFSCCode}
            onChange={(e) => setIFSCCode(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <label htmlFor="Shift">Shift</label>
          <input
            type="text"
            id="Shift"
            value={Shift}
            onChange={(e) => setShift(e.target.value)}
            required
          />
        </div>
        </div>
        <button type="submit">Register Escort</button>
      </form>
    </div>
    
  );
};

export default Registers;