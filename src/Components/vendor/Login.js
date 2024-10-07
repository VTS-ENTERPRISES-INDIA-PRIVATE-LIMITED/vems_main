import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const CLOUDINARY_UPLOAD_PRESET = 'Viharikha'; // Replace with your preset
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dku9u5u1x/image/upload';

const Login = () => {

  const [formData, setFormData] = useState({
    VendorName: '',
    Email: '',
    ContactNumber: '',
    Address: '',
    AccountHandlerName: '',
    AccountNumber: '',
    BankName: '',
    BranchName: '',
    IFSCCode: '',
    AadharCardUpload: null,
    AgreementUpload: null,
    AgreementStartDate: '',
    AgreementEndDate: '',
    AgreementAmount: '',
    AmountPaid: '',
  });

  const handleFileChange = async (e, field) => {
    setFormData({
      ...formData,
      [field]: await uploadToCloudinary(e.target.files[0]),
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor/addVendor`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response && response.data) {
        console.log(response.data.message);
      } else {
        alert('Unexpected response format');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Vendor Registration</h2>
      <form className="vendor-registration-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <div>
            <label htmlFor="VendorName">Vendor Name</label>
            <input
              type="text"
              id="VendorName"
              value={formData.VendorName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              value={formData.Email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="ContactNumber">Contact Number</label>
            <input
              type="text"
              id="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              id="Address"
              value={formData.Address}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Upload Section */}
        <div className="form-section">
          <h3>Upload Section</h3>
          <div>
            <label htmlFor="AadharCardUpload">Aadhar Card Upload</label>
            <input
              type="file"
              id="AadharCardUpload"
              onChange={(e) => handleFileChange(e, 'AadharCardUpload')}
              required
            />
          </div>
          <div>
            <label htmlFor="AgreementUpload">Agreement Upload</label>
            <input
              type="file"
              id="AgreementUpload"
              onChange={(e) => handleFileChange(e, 'AgreementUpload')}
              required
            />
          </div>
        </div>

        {/* Account Details Section */}
        <div className="form-section">
          <h3>Account Details</h3>
          <div>
            <label htmlFor="AccountHandlerName">Account Handler Name</label>
            <input
              type="text"
              id="AccountHandlerName"
              value={formData.AccountHandlerName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="AccountNumber">Account Number</label>
            <input
              type="text"
              id="AccountNumber"
              value={formData.AccountNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="BankName">Bank Name</label>
            <input
              type="text"
              id="BankName"
              value={formData.BankName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="BranchName">Branch Name</label>
            <input
              type="text"
              id="BranchName"
              value={formData.BranchName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="IFSCCode">IFSC Code</label>
            <input
              type="text"
              id="IFSCCode"
              value={formData.IFSCCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Agreement Details Section */}
        <div className="form-section">
          <h3>Agreement Details</h3>
          <div>
            <label htmlFor="AgreementStartDate">Agreement Start Date</label>
            <input
              type="date"
              id="AgreementStartDate"
              value={formData.AgreementStartDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="AgreementEndDate">Agreement End Date</label>
            <input
              type="date"
              id="AgreementEndDate"
              value={formData.AgreementEndDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="AgreementAmount">Agreement Amount</label>
            <input
              type="number"
              step="0.01"
              id="AgreementAmount"
              value={formData.AgreementAmount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="AmountPaid">Amount Paid</label>
            <input
              type="number"
              step="0.01"
              id="AmountPaid"
              value={formData.AmountPaid}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit">Register Vendor</button>
      </form>
    </div>
  );
};

export default Login;
