import React from 'react';
import './HeroSection.css';
import Ima from './HeroSection.webp'

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>
                Experience the Future of Employee<br />
                    <span className="highlight">Transportation with Automation</span>
                </h1>
                <h2>Unveil the Future of Employee Mobility</h2>
                <p>
                At VEMS, we're revolutionizing corporate mobility with state-of-the-art automation solutions.
             Enhance your team's commute with our forward-thinking services, designed to transform employee transportation.
                </p>
            </div>
            <div className="hero-image">
                <img src={Ima} alt="Employee in transport" />
            </div>
        </section>
    );
}

export default HeroSection;