import "./Dashboard1.css"
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaRegIdCard, FaUser, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
// import Sidebar from "../Components/Sidebar/Sidebar";
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
     navigate("/todayhistory");

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
       navigate("/dashboard")
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
        <div className="admin-head1">
            <div className="admin-dr-nav1">
            <p className="dr-mng1">Vehicle ID:{vehicle.VehicleId} </p>
            <p>{d}</p>
            </div>
          
        </div>
        <div className="tot-card1">
            <button onClick={handlebackdrpro} className="inf-card-left1"><FaAngleLeft /></button>
            <div className="tick-inf-doc-upd1">
            <TiTick className="tick1"  />
            <h4 className="doc-up1" >All Documents are upto date</h4>
            </div>
            <select className="act-inact1">
                <option>Active</option>
                <option>InActive</option>
                </select>
                <button className="edit-btn1"><MdOutlineEdit /></button>
                <button className="delete-btn1"><MdDelete /></button>
                <img className="driver-image1" src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1724825006/pngtree-vector-car-icon-png-image_1834527_ejwljo.jpg" alt="l" />
                <h4 className="driver-name-head1">{vehicle.VehicleName}</h4>
                <h5 className="driver-id1">{vehicle.VehicleId}</h5>
              
                <h5 className="rating-dr1">4.5<FaStar className="star" /></h5>
                <button className="caller-btn1"><IoCallOutline /></button>
                <button className="message-btn1"><MdOutlineMessage /></button>
                <button className="telegram-btn1"><FaTelegramPlane /></button>
                <button className="notification-btn1"><IoIosNotifications /></button>
              
                <div className="dr-detail-cards1">
                    {vedetails.map((item,key)=>(
                        <li className="dr-details-card1" key={key}>
                            <h6>{item.val}</h6>
                          <h5>{item.title}</h5>
                        </li>
                    ))}
                </div>
        </div>
        <div className="dr-btns1">
            <button className="dr-pd1" onClick={handlePd}>Vehicle Details</button>
            <button className="dr-lt1" onClick={handleLt}>Live Tracking</button>
            <button className="dr-th1" onClick={handleTh}>Trip History</button>
            <button className="dr-vd1" onClick={handleVd}>Service History</button>
            <button className="dr-cf1" onClick={handleCf}>Drivers used</button>
            <button className="dr-fd1" onClick={handlefd}>Feedback</button>
        </div>
        <div className="curr-ass-veh1">
        <h4 className="head4" >Vehicle Details</h4>

            <div className="cur-det1">
            <img className="cur-car-img1" src={vehicle.VehicleImage} alt="Vehicle" />

                
                {/* <h3 className="veh-num-cras">TN 01 AA 1234</h3>
                <h5 className="veh-model">Swift VXI</h5> */}
              
               
             

                <div className="curr-dets1">
                <div className="brand1">
    <p style={{ fontWeight: 'bold' }}><FaRegIdCard /> Vehicle Number</p>
    <p>{vehicle.VehicleNumber}</p>
  </div>
  <div className="brand1">
    <p style={{ fontWeight: 'bold' }}><FaRegIdCard /> Vehicle Type</p>
    <p>{vehicle.VehicleType}</p>
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
  <div className="seatcp1">
    <p style={{ fontWeight: 'bold' }}><FaUser /> Seat Capacity</p>
    <p>{vehicle.SeatCapacity}</p>
  </div>
  <div className="fueltype1">
    <p style={{ fontWeight: 'bold' }}><FaGasPump /> Fuel Type</p>
    <p>{vehicle.FuelType}</p>
  </div>
  <div className="mil1">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> Insurance Number</p>
    <p>{vehicle.InsuranceNumber}</p>
  </div>
  <div className="mil1">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> Vendor Name</p>
    <p>{vehicle.VendorName}</p>
  </div>
  <div className="mil1">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> Year Of Manufacturing</p>
    <p>{vehicle.YearOfManufacturing}</p>
  </div>
  <div className="mil1">
    <p style={{ fontWeight: 'bold' }}><FaTachometerAlt /> mileage</p>
    <p>{vehicle.Mileage}</p>
  </div>
</div>
            </div>
        </div>
            {viewPersonalDetails&&(
        <div className="information1">
                 <div className="inf-pers1">
                 <h4><u>Currently Asssigned Driver</u></h4>
                 <h3><TiUser />&nbsp;&nbsp;{vehicle.name}</h3>
                 <div className="mob-infss1">
                 {fun.map((item,key)=>(
                    <div className="mob-infs1">
                        
                        <div className="mob-symm1">
                          <button className="mob-sym-btn1"><icon />{item.icon}</button>
                        </div>
                        <div className="mob-inf-det1">
                           <h4 className="phone-num-h1">{item.title}</h4>
                           <h5 className="phone-num1">{item.value}</h5>
                        </div>
                    </div>
                 ))}
                 </div>
               
               
                 </div>
                 </div>
            )}
            {livetracking&&(
        <div className="information1">
                <div>
                    <h4 className="lt-head1"><u>Live Tracking</u></h4>
                <img className="driver-image-lt1" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724665401/profiledriver_m3kcmd.png" alt="l" />
                     <h4 className="lt-veh-num1">Vehicle Number</h4>
                     <h5 className="lt-veh-id1">Vehicle Id</h5>
                     <p className="view-veh-detail1">View Vehicle details <FaAngleRight className="right-det1" /> </p>
                    </div>
                    </div>
               )}     
     
    </div>
 )
}
export default NewDashboard;