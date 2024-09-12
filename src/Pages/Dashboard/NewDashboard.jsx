import "./Dashboard1.css"
import { IoCall } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { TiUser } from "react-icons/ti";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa";
import { PiClockAfternoon } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdCalendarToday } from 'react-icons/md';
import { FaRegIdCard, FaCar, FaCode, FaRegCalendarAlt, FaUser, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import Dashboard from "../../Components/Dashboard/Dashboard";
import { useLocation } from 'react-router-dom';


function NewDashboard(){
  const location = useLocation(); 
  
  const vehicle = location.state?.vehicle || {}; 
    const d = Date();
    const [viewPersonalDetails,setViewPersonalDetails] = useState(true)
    const handleVd=()=>{
     setLivetracking(false)
    }
    const handlePd=()=>{
     setViewPersonalDetails(!viewPersonalDetails);
     setLivetracking(false)
    }
    const handleCf=()=>{
     setViewPersonalDetails(false);
     setLivetracking(false)
    }
    const [livetracking,setLivetracking] = useState(false)
    const handleLt=()=>{
     setViewPersonalDetails(false)
     setLivetracking(true)
     navigate("/livetracking");
    }
    const handleTh=()=>{
     setViewPersonalDetails(false);
     setLivetracking(false);
     navigate("/history");

    }
    const handlefd=()=>{
        setViewPersonalDetails(false);
        setLivetracking(false)
       }
    const vedetails=[
     
     { title:"Total Distance",
        icon:"",
        val:"3000km"
     },{ title:"Total Hours",
        icon:"",
        val:"108h 30m"
     },{ title:"Total Office Trips",
        icon:"",
        val:"64"
     },{ title:"Total Revenue",
        icon:"",
        val:"23456789"
     },
     { title:"Total Driver Driven",
        icon:"",
        val:"5"
     },
    ]
    const navigate = useNavigate();
    const handlebackdrpro=()=>{
       navigate("/")
    }
   
     const fun=[
        {title:"Phone Number",
         value:vehicle.mobile,
         icon:<CiMobile1/>
        },
        {title:"Email",
            value:vehicle.email,
            icon:<MdOutlineMail />
           },
           {title:"Gender",
            value:vehicle.gender,
            icon:<CiUser />
           },
           {title:"Age",
            value:vehicle.age,
            icon:<CiUser />
           },
           {title:"Date Of Birth",
            value:vehicle.dob,
            icon:<CiCalendarDate />
           },
           {title:"Address",
            value:vehicle.address,
            icon:<FaLocationDot />
           },
           {title:"Aadhar Number",
            value:vehicle.aadhar,
            icon:<FaAddressCard />
           },
           {title:"Pan Card Number",
            value:vehicle.pan,
            icon:<FaAddressCard />
           },
           
    ]
    // const vehicleData = {
    //     imageUrl: "https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724421684/wrweuthrgturh6b7dqf1.png",
    //     brandLogoUrl: "https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724700248/Maruti-Suzuki-Logo-2011_oxddax.png",
    //     vehicleNumber: "TN 01 AA 1234",
    //     model: "Swift VXI",
    //     assignedClient: "Client Name",
    //     assignedLocation: "NPT-HCL",
    //     brand: "Maruti Suzuki",
        
    //     registrationNumber: "TN 01 AA 1234",
    //     seatCapacity: "5",
    //     fuelType: "Petrol",
    //     mileage: "18 km/l",
    //     manufactureYear: "2020"
    // };
 
 return(
    <div>
        <div className="admin-head">
            <div className="admin-dr-nav">
            <p className="dr-mng">Vehicle ID:{vehicle.vehicleId} </p>
            <p>{d}</p>
            </div>
          
        </div>
        <div className="tot-card">
            <button onClick={handlebackdrpro} className="inf-card-left"><FaAngleLeft /></button>
            <div className="tick-inf-doc-upd">
            <TiTick className="tick"  />
            <h4 className="doc-up" >All Documents are upto date</h4>
            </div>
            <select className="act-inact">
                <option>Active</option>
                <option>InActive</option>
                </select>
                <button className="edit-btn"><MdOutlineEdit /></button>
                <button className="delete-btn"><MdDelete /></button>
                <img className="driver-image" src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724825006/pngtree-vector-car-icon-png-image_1834527_ejwljo.jpg" alt="l" />
                <h4 className="driver-name-head">{vehicle.vehicleName}</h4>
                <h5 className="driver-id">{vehicle.vehicleId}</h5>
              
                <h5 className="rating-dr">4.5<FaStar className="star" /></h5>
                <button className="caller-btn"><IoCallOutline /></button>
                <button className="message-btn"><MdOutlineMessage /></button>
                <button className="telegram-btn"><FaTelegramPlane /></button>
                <button className="notification-btn"><IoIosNotifications /></button>
              
                <div className="dr-detail-cards">
                    {vedetails.map((item,key)=>(
                        <li className="dr-details-card" key={key}>
                            <h6>{item.val}</h6>
                          <h5>{item.title}</h5>
                        </li>
                    ))}
                </div>
        </div>
        <div className="dr-btns">
            <button className="dr-pd" onClick={handlePd}>Vehicle Details</button>
            <button className="dr-lt" onClick={handleLt}>Live Tracking</button>
            <button className="dr-th" onClick={handleTh}>Trip History</button>
            <button className="dr-vd" onClick={handleVd}>Service History</button>
            <button className="dr-cf" onClick={handleCf}>Drivers used</button>
            <button className="dr-fd" onClick={handlefd}>Feedback</button>
        </div>
        <div className="curr-ass-veh">
        <h4 className="head" >Vehicle Details</h4>

            <div className="cur-det">
            <img className="cur-car-img" src={vehicle.vehicleImage} alt="Vehicle" />

                
                {/* <h3 className="veh-num-cras">TN 01 AA 1234</h3>
                <h5 className="veh-model">Swift VXI</h5> */}
              
               
             

                <div className="curr-dets">
                <div className="brand">
    <p style={{ fontWeight: 'bold' }}><FaRegIdCard /> Vehicle Number</p>
    <p>{vehicle.vehicleNumber}</p>
  </div>
  <div className="brand">
    <p style={{ fontWeight: 'bold' }}><FaRegIdCard /> Vehicle Type</p>
    <p>{vehicle.vehicleType}</p>
  </div>
  {/* <div className="model">
    <p style={{ fontWeight: 'bold' ,}}><FaCar /> Engine Number</p>
    <p>{vehicle.engineNumber}</p>
  </div>
  <div className="color">
    <p style={{ fontWeight: 'bold' }}><FaCode /> Chassis Number</p>
    <p>{vehicle.chassisNumber}</p>
  </div> */}
  {/* <div className="regno">
    <p style={{ fontWeight: 'bold' }}><FaRegIdCard /> Registration Num</p>
    <p>{vehicle.</p>
  </div> */}
  <div className="seatcp">
    <p style={{ fontWeight: 'bold' }}><FaUser /> Seat Capacity</p>
    <p>{vehicle.seatCapacity}</p>
  </div>
  <div className="fueltype">
    <p style={{ fontWeight: 'bold' }}><FaGasPump /> Fuel Type</p>
    <p>{vehicle.fuelType}</p>
  </div>
  <div className="mil">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> Insurance Number</p>
    <p>{vehicle.insuranceNumber}</p>
  </div>
  <div className="mil">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> Vendor Name</p>
    <p>{vehicle.vendorName}</p>
  </div>
  <div className="mil">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> Year Of Manufacturing</p>
    <p>{vehicle. yearOfManufacturing}</p>
  </div>
  <div className="mil">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> mileage</p>
    <p>{vehicle.mileage}</p>
  </div>
</div>
            </div>
        </div>
            {viewPersonalDetails&&(
        <div className="information">
                 <div className="inf-pers">
                 <h4><u>Currently Asssigned Driver</u></h4>
                 <h3><TiUser />&nbsp;&nbsp;{vehicle.name}</h3>
                 <div className="mob-infss">
                 {fun.map((item,key)=>(
                    <div className="mob-infs">
                        
                        <div className="mob-symm">
                          <button className="mob-sym-btn"><icon />{item.icon}</button>
                        </div>
                        <div className="mob-inf-det">
                           <h4 className="phone-num-h">{item.title}</h4>
                           <h5 className="phone-num">{item.value}</h5>
                        </div>
                    </div>
                 ))}
                 </div>
               
               
                 </div>
                 </div>
            )}
            {livetracking&&(
        <div className="information">
                <div>
                    <h4 className="lt-head"><u>Live Tracking</u></h4>
                <img className="driver-image-lt" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724665401/profiledriver_m3kcmd.png" alt="l" />
                     <h4 className="lt-veh-num">Vehicle Number</h4>
                     <h5 className="lt-veh-id">Vehicle Id</h5>
                     <p className="view-veh-detail">View Vehicle details <FaAngleRight className="right-det" /> </p>
                    </div>
                    </div>
               )}     
     
    </div>
 )
}
export default NewDashboard;