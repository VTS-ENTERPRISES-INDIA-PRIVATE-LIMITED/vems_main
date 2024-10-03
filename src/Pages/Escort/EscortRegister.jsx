import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillPhone, AiFillIdcard, AiFillPicture, AiOutlineUser } from 'react-icons/ai'; // Import icons
import './EscortRegister.css';

// Cloudinary configuration
const CLOUDINARY_UPLOAD_PRESET = 'q6fwknmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload';

const EscortRegister = () => {
  const [EscortName, setEscortName] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [Age, setAge] = useState('');
  const [Address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State to store Cloudinary URLs
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

  // Function to handle file uploads to Cloudinary
  const handleImageUpload = async (file, setter) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = response.data.secure_url;
      setter(imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleFileChange = (setter) => async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleImageUpload(file, setter);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      EscortName,
      ContactNumber,
      Age,
      Address,
      AadharCardUpload,
      CertificationUpload,
      EscortProfilePicUpload,
      AccountHandlerName,
      AccountNumber,
      BankName,
      BranchName,
      IFSCCode,
      Shift,
    };

    try {
      const response = await axios.post('http://localhost:8081/register', formData);
      if (response && response.data) {
        alert('Registration Successful');
        navigate('/');
      } else {
        alert('Unexpected response format');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="escort-form">
      <form onSubmit={handleSubmit} className="escort-registration-form">
        <div className="form-header">
          <h2 className="headdd">Escort Registration</h2>
          <button type="submit" className="save-button1" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="form-content">
          <div className="form-field">
            <label htmlFor="EscortName"><AiOutlineUser /> Escort Name</label>
            <input
              type="text"
              id="EscortName"
              value={EscortName}
              onChange={(e) => setEscortName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="ContactNumber"><AiFillPhone /> Contact Number</label>
            <input
              type="text"
              id="ContactNumber"
              value={ContactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="Age"><AiFillIdcard /> Age</label>
            <input
              type="text"
              id="Age"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="Address"><AiFillIdcard /> Address</label>
            <input
              type="text"
              id="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="AadharCardUpload"><AiFillIdcard /> Aadhar Card Upload</label>
            <input type="file" id="AadharCardUpload" onChange={handleFileChange(setAadharCardUpload)} required />
          </div>
          <div className="form-field">
            <label htmlFor="CertificationUpload"><AiFillPicture /> Certification Upload</label>
            <input type="file" id="CertificationUpload" onChange={handleFileChange(setCertificationUpload)} required />
          </div>
          <div className="form-field">
            <label htmlFor="EscortProfilePicUpload"><AiFillPicture /> Escort Profile Pic Upload</label>
            <input
              type="file"
              id="EscortProfilePicUpload"
              onChange={handleFileChange(setEscortProfilePicUpload)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="AccountHandlerName"><AiOutlineUser /> Account Handler Name</label>
            <input
              type="text"
              id="AccountHandlerName"
              value={AccountHandlerName}
              onChange={(e) => setAccountHandlerName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="AccountNumber"><AiFillIdcard /> Account Number</label>
            <input
              type="text"
              id="AccountNumber"
              value={AccountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="BankName"><AiFillIdcard /> Bank Name</label>
            <input type="text" id="BankName" value={BankName} onChange={(e) => setBankName(e.target.value)} required />
          </div>
          <div className="form-field">
            <label htmlFor="BranchName"><AiFillIdcard /> Branch Name</label>
            <input
              type="text"
              id="BranchName"
              value={BranchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="IFSCCode"><AiFillIdcard /> IFSC Code</label>
            <input type="text" id="IFSCCode" value={IFSCCode} onChange={(e) => setIFSCCode(e.target.value)} required />
          </div>
          <div className="form-field">
            <label htmlFor="Shift"><AiFillIdcard /> Shift</label>
            <input type="text" id="Shift" value={Shift} onChange={(e) => setShift(e.target.value)} required />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EscortRegister;
