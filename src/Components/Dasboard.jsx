import { React } from 'react';
import { FaCheckCircle, FaCar, FaShieldAlt } from 'react-icons/fa';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillRocketTakeoffFill } from "react-icons/bs";

import './Dasboard.css';
// import Charts from './Charts';
import { useState } from 'react';

function Dasboard() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const timeSlots = [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'
    ];
    
    const getShift = (index) => {
        if (index < 5) return 'Shift-1';
        return 'Shift-2';
    };

    return (
        <div className="dasboard-container">
            <div className="time-slots">
                {timeSlots.map((time, index) => (
                    <div
                        className={`time-slot ${index === activeIndex ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleClick(index)}
                    >
                        <div style={{display: 'flex'}}>
                            <div className={`slot-type ${index % 2 === 0 ? 'pickup' : 'drop'}`}>
                                {index % 2 === 0 ? 'Pickup' : 'Drop'}
                            </div>
                            <div className="shift-info">{getShift(index)}</div>
                        </div>
                        <div className="slot-date">Today, 01 Jan 2023</div>
                        <div className="slot-time">{time}</div>
                    </div>
                ))}
            </div>


            <div className="trip-info">
                <h2>Today, 01 Jan 2023, 10:00 AM</h2>
                <div className="trip-stats">
                    <div className="stat-card rostered">
                        <BsFillRocketTakeoffFill className="stat-icon" />
                        <span className="stat-title">Rostered</span>
                        <span className="stat-value">10</span>
                    </div>
                    <div className="stat-card trips-completed">
                        <FaCheckCircle className="stat-icon1" />
                        <span className="stat-title">Trips Completed</span>
                        <span className="stat-value">1/4</span>
                    </div>
                    <div className="stat-card vehicles">
                        <FaCar className="stat-icon2" />
                        <span className="stat-title">Vehicles</span>
                        <span className="stat-value">4</span>
                    </div>
                    <div className="stat-card escort">
                        <FaShieldAlt className="stat-icon3" />
                        <span className="stat-title">Escort / Guards</span>
                        <span className="stat-value">1</span>
                    </div>
                </div>
            </div>

            <div className="trip-details">
                {Array(4).fill().map((_, index) => (
                    <div className={`trip-card ${index === 1 ? 'idle' : 'in-trip'}`} key={index}>
                        <div className="trip-header">
                            <span className="trip-id">
                                Trip ID : ABCDE123455
                            </span>
                            <span className={`trip-status ${index === 1 ? 'idle-text' : 'in-trip-text'}`}>
                                {index === 1 ? 'IDLE' : 'IN A TRIP'}
                            </span>
                        </div>
                        <div className="trip-body">
                            <p><FaClock className="trip-body-icon" /> Today, 01 Jan 23, 6:30am</p>
                            <p><FaCar className="trip-body-icon" /><b>TN 01 AB 1234</b></p>
                            <p><FaShieldAlt className="trip-body-icon" /> koundi</p>
                            <p><FaMapMarkerAlt className="trip-body-icon" /> VTS</p>
                        </div>
                        <div className="trip-footer">
                            <span><FaClock /> 6:30am</span>
                            <span className="trip-icon"><FaCar className="stat-icon2" /></span>
                            <span><FaClock /> 8:30am</span>
                        </div>

                    </div>
                ))}
            </div>
            {/* <Charts /> */}
        </div>



    );
}

export default Dasboard;
