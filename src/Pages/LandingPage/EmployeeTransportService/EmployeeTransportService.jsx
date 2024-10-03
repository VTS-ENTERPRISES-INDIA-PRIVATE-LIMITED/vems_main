import React from 'react';
import './EmployeeTransportService.css'; // Import the CSS file

const EmployeeTransportService = () => {
  return (
    <div className="employee-transport-container">
      <div className="ets-content">
        {/* <img src="vmroutes-logo.png" alt="VM Routes Logo" className="logo" /> */}
        <h1>
          <span className="highlight">Employee</span> Transport Service
        </h1>
        <p className="subtitle">Transform Your Corporate Transportation with VEMS</p>
        <p className="description">
        VEMS is a powerful software platform built to enhance and simplify your corporate transportation needs. With features like driver and vehicle management,
         route optimization, and real-time tracking, it's the comprehensive solution for seamless and efficient employee commutes..
        </p>
        {/* <div className="buttons">
          <button className="contact-button">Contact Us</button>
        </div> */}
      </div>
      <div className="images">
        <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1726578206/DALL_E_2024-09-17_18.18.59_-_A_realistic_scene_of_employees_waiting_for_a_cab_to_go_to_the_office_with_men_and_women_in_professional_business_attire._The_environment_shows_an_urb_ezx0rw.webp" alt="Employee 2" className="employee-image" />
      </div>
    </div>
  );
};

export default EmployeeTransportService;