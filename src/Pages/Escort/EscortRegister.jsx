// import axios from 'axios';
// import { useState } from 'react';
// import {
//   FaUser, FaIdCard, FaPhone, FaCalendarAlt, FaAddressCard, FaCertificate, FaUserCircle, FaUserTie, FaCreditCard,
//   FaUniversity, FaBuilding, FaBarcode, FaClock
// } from 'react-icons/fa';
// import './EscortRegister.css';

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

//   const [errors, setErrors] = useState({});
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

//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [imAgeType]: '',
//         }));
//       } catch (error) {
//         console.error('ImAge upload failed:', error);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEscortDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   const validateForm = () => {
//     let formIsValid = true;
//     let newErrors = {};

//     Object.keys(escortDetails).forEach((key) => {
//       if (!escortDetails[key]) {
//         formIsValid = false;
//         newErrors[key] = `${key} is required`;
//       }
//     });

//     if (escortDetails.ContactNumber && (isNaN(escortDetails.ContactNumber) || escortDetails.ContactNumber.length !== 10)) {
//       formIsValid = false;
//       newErrors.ContactNumber = 'Contact number must be a 10-digit number';
//     }

//     setErrors(newErrors);
//     return formIsValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       setLoading(true);
//       try {
//         await axios.post('http://localhost:8081/add-escort', escortDetails);
//         window.alert('Form submitted successfully');
//       } catch (error) {
//         window.alert('Error saving escort details');
//         console.error('Error saving escort details:', error);
//       } finally {
//         setLoading(false);
//       }
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
//           <label className="required"><FaUser className="icon11" /> Escort Name:</label>
//           <input type="text" name="escortName" value={escortDetails.escortName} onChange={handleChange} />
//           {errors.escortName && <span className="error-messAge">{errors.escortName}</span>}
//         </div>

//         {/* Contact Number */}
//         <div className="form-field">
//           <label className="required"><FaPhone className="icon11" /> Contact Number:</label>
//           <input type="text" name="ContactNumber" value={escortDetails.ContactNumber} onChange={handleChange} />
//           {errors.ContactNumber && <span className="error-messAge">{errors.ContactNumber}</span>}
//         </div>

//         {/* Age */}
//         <div className="form-field">
//           <label className="required"><FaCalendarAlt className="icon11" /> Age:</label>
//           <input type="number" name="Age" value={escortDetails.Age} onChange={handleChange} />
//           {errors.Age && <span className="error-messAge">{errors.Age}</span>}
//         </div>

//         {/* Address */}
//         <div className="form-field">
//           <label className="required"><FaAddressCard className="icon11" /> Address:</label>
//           <input type="text" value={escortDetails.Address} onChange={handleChange} />
//           {errors.Address && <span className="error-messAge">{errors.Address}</span>}
//         </div>

//         {/* Aadhar Card Upload */}
//         <div className="form-field">
//           <label className="required"><FaIdCard className="icon11" /> Aadhar Card Upload:</label>
//           <input type="file" name="aadharCard" accept="imAge/*" onChange={(e) => handleImAgeUpload(e, 'aadharCard')} />
//           {errors.aadharCard && <span className="error-messAge">{errors.aadharCard}</span>}
//         </div>

//         {/* Certification Upload */}
//         <div className="form-field">
//           <label className="required"><FaCertificate className="icon11" /> Certification Upload:</label>
//           <input type="file" name="Certification" accept="imAge/*" onChange={(e) => handleImAgeUpload(e, 'Certification')} />
//           {errors.Certification && <span className="error-messAge">{errors.Certification}</span>}
//         </div>

//         {/* Escort Profile Pic Upload */}
//         <div className="form-field">
//           <label className="required"><FaUserCircle className="icon11" /> Escort Profile Pic Upload:</label>
//           <input type="file" name="escortProfilePic" accept="imAge/*" onChange={(e) => handleImAgeUpload(e, 'escortProfilePic')} />
//           {errors.escortProfilePic && <span className="error-messAge">{errors.escortProfilePic}</span>}
//         </div>

//         {/* Account Handler Name */}
//         <div className="form-field">
//           <label className="required"><FaUserTie className="icon11" /> Account Handler Name:</label>
//           <input type="text" name="AccountHandlerName" value={escortDetails.AccountHandlerName} onChange={handleChange} />
//           {errors.AccountHandlerName && <span className="error-messAge">{errors.AccountHandlerName}</span>}
//         </div>

//         {/* Account Number */}
//         <div className="form-field">
//           <label className="required"><FaCreditCard className="icon11" /> Account Number:</label>
//           <input type="text" name="AccountNumber" value={escortDetails.AccountNumber} onChange={handleChange} />
//           {errors.AccountNumber && <span className="error-messAge">{errors.AccountNumber}</span>}
//         </div>

//         {/* Bank Name */}
//         <div className="form-field">
//           <label className="required"><FaUniversity className="icon11" /> Bank Name:</label>
//           <input type="text" name="BankName" value={escortDetails.BankName} onChange={handleChange} />
//           {errors.BankName && <span className="error-messAge">{errors.BankName}</span>}
//         </div>

//         {/* Branch Name */}
//         <div className="form-field">
//           <label className="required"><FaBuilding className="icon11" /> Branch Name:</label>
//           <input type="text" name="BranchName" value={escortDetails.BranchName} onChange={handleChange} />
//           {errors.BranchName && <span className="error-messAge">{errors.BranchName}</span>}
//         </div>

//         {/* IFSC Code */}
//         <div className="form-field">
//           <label className="required"><FaBarcode className="icon11" /> IFSC Code:</label>
//           <input type="text" name="IfscCode" value={escortDetails.IfscCode} onChange={handleChange} />
//           {errors.IfscCode && <span className="error-messAge">{errors.IfscCode}</span>}
//         </div>

//         {/* Shift */}
//         <div className="form-field">
//           <label className="required"><FaClock className="icon11" /> Shift:</label>
//           <input type="text" name="Shift" value={escortDetails.Shift} onChange={handleChange} />
//           {errors.Shift && <span className="error-messAge">{errors.Shift}</span>}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default EscortRegister;
import axios from 'axios';
import { useState } from 'react';
import {
  FaUser, FaIdCard, FaPhone, FaCalendarAlt, FaAddressCard, FaCertificate, FaUserCircle, FaUserTie, FaCreditCard,
  FaUniversity, FaBuilding, FaBarcode, FaClock
} from 'react-icons/fa';
import './EscortRegister.css';

const CLOUDINARY_UPLOAD_PRESET = 'q6fwknmo';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbz2ydtp/imAge/upload';

const EscortRegister = () => {
  const [escortDetails, setEscortDetails] = useState({
    EscortName: '',
    ContactNumber: '',
    Age: '',
    Address: '',
    AadharCard: '',
    Certification: '',
    EscortProfilePic: '',
    AccountHandlerName: '',
    AccountNumber: '',
    BankName: '',
    BranchName: '',
    IfscCode: '',
    Shift: '',
  });

  const [loading, setLoading] = useState(false);

  const handleImAgeUpload = async (e, imAgeType) => {
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

        const imAgeUrl = response.data.secure_url;
        setEscortDetails((prevDetails) => ({
          ...prevDetails,
          [imAgeType]: imAgeUrl,
        }));
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEscortDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8081/add-escort', escortDetails);
      window.alert('Form submitted successfully');
    } catch (error) {
      window.alert('Error saving escort details');
      console.error('Error saving escort details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="escort-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="headddd">Add Escort</h2>
        <button type="submit" className="save-button" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="form-content">
        {/* Escort Name */}
        <div className="form-field">
          <label><FaUser className="icon11" /> Escort Name:</label>
          <input type="text" name="EscortName" value={escortDetails.EscortName} onChange={handleChange} />
        </div>

        {/* Contact Number */}
        <div className="form-field">
          <label><FaPhone className="icon11" /> Contact Number:</label>
          <input type="text" name="ContactNumber" value={escortDetails.ContactNumber} onChange={handleChange} />
        </div>

        {/* Age */}
        <div className="form-field">
          <label><FaCalendarAlt className="icon11" /> Age:</label>
          <input type="number" name="Age" value={escortDetails.Age} onChange={handleChange} />
        </div>

        {/* Address */}
        <div className="form-field">
          <label><FaUser className="icon11" /> Address:</label>
          <input type="text" name="EscortName" value={escortDetails.EscortName} onChange={handleChange} />
        </div>


        {/* Aadhar Card Upload */}
        <div className="form-field">
          <label><FaIdCard className="icon11" /> Aadhar Card Upload:</label>
          <input type="file" name="AadharCard" accept="image/*" onChange={(e) => handleImAgeUpload(e, 'AadharCard')} />
        </div>

        {/* Certification Upload */}
        <div className="form-field">
          <label><FaCertificate className="icon11" /> Certification Upload:</label>
          <input type="file" name="Certification" accept="image/*" onChange={(e) => handleImAgeUpload(e, 'Certification')} />
        </div>

        {/* Escort Profile Pic Upload */}
        <div className="form-field">
          <label><FaUserCircle className="icon11" /> Escort Profile Pic Upload:</label>
          <input type="file" name="EscortProfilePic" accept="image/*" onChange={(e) => handleImAgeUpload(e, 'EscortProfilePic')} />
        </div>

        {/* Account Handler Name */}
        <div className="form-field">
          <label><FaUserTie className="icon11" /> Account Handler Name:</label>
          <input type="text" name="AccountHandlerName" value={escortDetails.AccountHandlerName} onChange={handleChange} />
        </div>

        {/* Account Number */}
        <div className="form-field">
          <label><FaCreditCard className="icon11" /> Account Number:</label>
          <input type="text" name="AccountNumber" value={escortDetails.AccountNumber} onChange={handleChange} />
        </div>

        {/* Bank Name */}
        <div className="form-field">
          <label><FaUniversity className="icon11" /> Bank Name:</label>
          <input type="text" name="BankName" value={escortDetails.BankName} onChange={handleChange} />
        </div>

        {/* Branch Name */}
        <div className="form-field">
          <label><FaBuilding className="icon11" /> Branch Name:</label>
          <input type="text" name="BranchName" value={escortDetails.BranchName} onChange={handleChange} />
        </div>

        {/* IFSC Code */}
        <div className="form-field">
          <label><FaBarcode className="icon11" /> IFSC Code:</label>
          <input type="text" name="IfscCode" value={escortDetails.IfscCode} onChange={handleChange} />
        </div>

        {/* Shift */}
        <div className="form-field">
          <label><FaClock className="icon11" /> Shift:</label>
          <input type="text" name="Shift" value={escortDetails.Shift} onChange={handleChange} />
        </div>
      </div>
    </form>
  );
};

export default EscortRegister;
