import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa'; 
import { AiOutlineClose } from 'react-icons/ai';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
  },
};

Modal.setAppElement('#root');

const Register = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to open modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const requestBody = { AdminName: name, AdminMail: email, AdminPhoneNum: phoneNumber }
    console.log(requestBody);
    

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/register`, requestBody);
      
      if (response.status === 200) {
        setSuccessMessage(response.data);  // Show success message from backend
        openModal();
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200
        setError(`Error: ${error.response.data}`);
      } else if (error.request) {
        // Request was made but no response was received
        setError('No response from the server. Please try again later.');
      } else {
        // Something else went wrong in setting up the request
        setError(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <div className="RegisterLogo">
            <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1727276496/vemslogo_rsa3cx.png" alt="VEMS Logo" />
          </div>
        </div>

        <div className="login-title">
          <span>Admin Register</span>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Enter Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            placeholder="+91XXXXXXXXXX" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
          />

          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="example@email.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <div className="register">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Registration Success Modal"
      >
        <p>{'Your details have been successfully shared with the admin team, and the response will be shared to your email ASAP.'}</p>
        <button className="close-popup-btn" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Register;
