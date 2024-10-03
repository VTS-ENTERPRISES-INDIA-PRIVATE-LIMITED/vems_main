import React from 'react';
import './Navbar.css';

const Navbar = ({ scrollToSlidebar, scrollToTopFeatures }) => {
    return (
        <nav className="navbar">
            <div className='InNavElements'>
            <div className="navbar-logo">
                <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1727276496/vemslogo_rsa3cx.png" alt="Logo" className="logo" />
            <div className='project-name' style={{fontSize:"40px",marginLeft:"10px"}}>Travello</div>
            </div>
            <div className="navbar-links">
                <a href="/" className="active">About</a>
                <a href="#!" onClick={scrollToSlidebar}>Services</a>
                <a href="#!" onClick={scrollToTopFeatures}>Features</a>
                <a href="/login" style={{border:"1px solid blue", padding:"10px", marginRight:"10px", borderRadius:"10px", boxShadow:"2px 2px 5px lightblue"}}>
                    Admin Register/Login
                </a>
            </div>
            </div>
        </nav>
    );
};

export default Navbar;
