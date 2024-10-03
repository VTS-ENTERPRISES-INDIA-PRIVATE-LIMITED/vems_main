import React from 'react';
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import './Footer.css';
import { IoMdCall,IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
        <div className="footer-container">
            <div className="footer-section">
                {/* <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1724663475/logo_xd5tyb.jpg" alt="VEMS" className="footer-logo" />  */}
                <h4>VEMS</h4>
                <p style={{ display: 'flex', alignItems: 'center',textAlign:"left" }}><FaLocationDot /> &nbsp;&nbsp;1ST Floor ,The Hive,SRP Stradford,Rajiv Gandhi Salai,PTK-Nagar,Chennai - 600 016</p>
                <p style={{ display: 'flex', alignItems: 'center' }}><IoMdCall /> &nbsp; +91 90921 90321</p>
                <p style={{ display: 'flex', alignItems: 'center' }}><IoIosMail /> &nbsp; vtsenterprises@gmail.com</p>
            </div>
            <div className="footer-section">
                <h4>Legal</h4>
                <p>Terms and Conditions</p>
                <p>Privacy Policy</p>
                <p>Cookie Policy</p> 
            </div>
            <div className="footer-section">
                <h4>Help</h4>
                <p>Contact Us</p>
                <div className="footer-icons">
                <a href="">
                    <FaLinkedin style={{ height: '20px', width: '20px' }}/>
                    </a> 
                <a href="">
                < FaFacebookSquare style={{ height: '20px', width: '20px' }}/>
                </a>
                </div>
            </div>
            {/* <div className="footer-section">
                <h4>Security</h4>
                <img src="https.png" alt="HTTPS" className="security-icon" />
            </div> */}
        </div>
            <div className="footer-bottom">
                <p>Copyright © 2024. VTS Enterprises India Private Limited</p>
            </div>
        </>
    );
};

export default Footer;
