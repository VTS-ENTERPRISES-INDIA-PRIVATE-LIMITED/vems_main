import "./driver.css";
import { IoCall } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCarOutline } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
// import { TiTick } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TiUser } from "react-icons/ti";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa";
import { PiClockAfternoon } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCarRear } from "react-icons/fa6";
import axios from "axios";
import { Color } from "antd/es/color-picker";

function Driverprad() {
  const formatDate = (date) => {
    const options = {
      weekday: 'short', // 'Sun'
      year: 'numeric',   // '2024'
      month: 'short',    // 'Sep'
      day: 'numeric',    // '29'
      hour: 'numeric',   // '6' in 12-hour format
      minute: 'numeric', // '14'
      second: 'numeric', // '48'
      hour12: true       // 12-hour format
    };
  
    return date.toLocaleString('en-US', options).replace(',', '');
  };
  
  const d = new Date();
  const formattedDate = formatDate(d);

  const [viewPersonalDetails, setViewPersonalDetails] = useState(true);
  const [triphistory, setTriphistory] = useState(false);
  const [customerfeedback, setCustomerfeedback] = useState(false);
  const [vehilcesdriven, setVehiclesdriven] = useState(false);

  const [active, setActive] = useState("dr-pd");

  const handleVd = () => {
    setLivetracking(false);
    setActive("dr-vd");
    setTriphistory(false);
    setCustomerfeedback(false);
    setVehiclesdriven(true);
    setViewPersonalDetails(false);
  };
  const handlePd = () => {
    setViewPersonalDetails(true);
    setActive("dr-pd");
    setLivetracking(false);
    setTriphistory(false);
    setCustomerfeedback(false);
    setVehiclesdriven(false);
  };

  const handleCf = () => {
    setViewPersonalDetails(false);
    setActive("dr-cf");
    setLivetracking(false);
    setTriphistory(false);
    setCustomerfeedback(true);
    setVehiclesdriven(false);
  };
  const [livetracking, setLivetracking] = useState(false);
  const handleLt = () => {
    setViewPersonalDetails(false);
    setActive("dr-lt");
    setLivetracking(true);
    setCustomerfeedback(false);
    setVehiclesdriven(false);
    setTriphistory(false);
  };
  const handleTh = () => {
    setViewPersonalDetails(false);
    setTriphistory(true);
    setLivetracking(false);
    setActive("dr-th");
    setCustomerfeedback(false);
    setVehiclesdriven(false);
  };
  let driverId = localStorage.getItem("driverId");

  const [driverData, setDriverData] = useState({});

  useEffect(() => {
    console.log(driverId);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/driver/getDriverById/${driverId}`)
      .then((res) => {
        setDriverData(res.data);
        console.log(driverData);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const drdetails = [
    { title: "Experience", val: driverData.DriverExperience || 0 },
    { title: "Total Distance", val: driverData.total_distance || 0 },
    { title: "Total Hours", val: "xxx" },
    { title: "Total Trips", val: driverData.successful_trips || 0 },
    { title: "Total Revenue", val: "xxx" },
    { title: "Driver Revenue", val: "xxx" },
    { title: "Vehicles Driven", val: "xxx" },
    { title: "Joined Date", val: driverData.DriverAddedDate || 0 },
  ];
  const navigate = useNavigate();
  const handlebackdrpro = () => {
    navigate(-1);
  };

  const fun = [
    { title: "Phone Number", value: driverData.DriverPhone, icon: <CiMobile1 /> },
    { title: "Email", value: driverData.DriverEmail, icon: <MdOutlineMail /> },
    { title: "Gender", value: driverData.DriverGender, icon: <CiUser /> },
    // { title: "Age", value: driverData.age, icon: <CiUser /> },
    { title: "Date Of Birth", value: driverData.DriverDOB, icon: <CiCalendarDate /> },
    { title: "Address", value: driverData.DriverAddress, icon: <FaLocationDot /> },
    {
      title: "Aadhar Number",
      value: driverData.DriverAadhar,
      icon: <FaAddressCard />,
    },
    {
      title: "Pan Card Number",
      value: driverData.DriverPAN,
      icon: <FaAddressCard />,
    },
    {
      title: "Lic Number",
      value: driverData.DriverLicense,
      icon: <FaAddressCard />,
    },
  ];

  // const vehinf=[
  //     {
  //         Brand:"",
  //         Model:"",
  //         VehicleType:"",
  //         Regno:"",
  //         Color:"",
  //         Seatcap:"",
  //         Fueltype:"",
  //         Mileagerange:"",
  //         ManufacturedYear:""
  //     }
  // ]
  // const location = useLocation();
  return (
    <div className="driver-management">
      {/* <div className="admin-head"> */}
        <div className="admin-dr-nav">
          <p className="dr-mng">Driver Mangement/Id: {driverId}</p>
          <p>{formattedDate}</p>
        </div>
        {/* <div className="admin-prof">
          <h3>AdminName</h3>
          <button className="admin-prof-btn"></button>
        </div>
      </div> */}
      <div className="tot-card">
        <div className="tot-card-o">
          <div>
            <button onClick={handlebackdrpro} className="inf-card-left">
              <FaAngleLeft />
            </button>
          </div>
          <div className="edut-del-btns">
            <div className="all-doc-update">
              <button className="tick-btnn">
                <TiTick />
              </button>
              <h4>All Documents are up to date</h4>
            </div>
            <div className="act-inact">
              <option>Active</option>
            </div>
            <button className="edit-btn">
              <MdOutlineEdit />
            </button>
            <button className="delete-btn">
              <MdDelete />
            </button>
          </div>
        </div>
        <div className="driver-image-det">
          {/* <div className="dr-image-rat"> */}
          <img className="driver-image" src={driverData.DriverImage} alt="l" />
          {/* </div>  */}
          <div className="driver-details-tot">
            <h4 className="driver-name-head">{driverData.driverName}</h4>
            <h5 className="driver-id">#{driverId}</h5>
            {/* <h5 className="rating-dr">4.5<FaStar className="star" /></h5> */}
          </div>
          <p className="last-update-h">Last Update on Date</p>
        </div>
        <div className="fleet-call">
          <div className="call-msg-btns">
            <button className="caller-btn">
              <IoCallOutline />
            </button>
            <button className="message-btn">
              <MdOutlineMessage />
            </button>
            <button className="telegram-btn">
              <FaTelegramPlane />
            </button>
            <button className="notification-btn">
              <IoIosNotifications />
            </button>
          </div>
          <div className="dr-fl-ri">
            
            <h4 className="fleet-card dr-only">DRIVER ONLY</h4>
            <h4 className="fleet-card dr-Fleet">FLEET</h4>
            <h4 className="fleet-card dr-of-rides">OFFICE RIDES</h4>
            <h4 className="fleet-card dr-traveles">TRAVELS</h4>
            <h4 className="fleet-card dr-org">NPT-HCL</h4>
            <h4 className="fleet-card dr-based-pay">BASED PAYMENT</h4>
          </div>
        </div>
        <div className="dr-detail-cards">
          {drdetails.map((item, key) => (
            <li className="dr-details-card" key={key}>
              <h3>{item.val}</h3>
              <h6 className="dr-details-card-head">{item.title}</h6>
            </li>
          ))}
        </div>
      </div>
      <div className="dr-btns">
        <button
          className={`dr-pd ${active === "dr-pd" ? "active" : ""}`}
          onClick={handlePd}
        >
          Personal Details
        </button>
        <button
          className={`dr-lt ${active === "dr-lt" ? "active" : ""}`}
          onClick={handleLt}
        >
          Live Tracking
        </button>
        <button
          className={`dr-th ${active === "dr-th" ? "active" : ""}`}
          onClick={handleTh}
        >
          Trip History
        </button>
        <button
          className={`dr-vd ${active === "dr-vd" ? "active" : ""}`}
          onClick={handleVd}
        >
          Vehicles Driven
        </button>
        <button
          className={`dr-cf ${active === "dr-cf" ? "active" : ""}`}
          onClick={handleCf}
        >
          Customer Feedback
        </button>
      </div>
      {/* {active && (

        )} */}
      {viewPersonalDetails && (
        <div className="information">
          <div className="inf-pers">
            <h4 className="personal-inf-head">
              <u>Personal Information</u>
            </h4>
            <h3>
              <TiUser />
              &nbsp;&nbsp;Driver Name
            </h3>
            <div className="mob-infss">
              {fun.map((item, key) => (
                <div className="mob-infs" key={key}>
                  <div className="mob-symm">
                    <button className="mob-sym-btn">
                      <icon />
                      {item.icon}
                    </button>
                  </div>
                  <div className="mob-inf-det">
                    <p className="phone-num-h">{item.title}</p>
                    <p className="phone-num">
                      <b>{item.value}</b>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {livetracking && (
        <div className="information">
          <div>
            <h4 className="lt-head">
              <u>Live Tracking</u>
            </h4>
            <div className="lt-image-det">
              <img
                className="driver-image-lt"
                src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724665401/profiledriver_m3kcmd.png"
                alt="l"
              />
              <div className="lt-det">
                <h4 className="lt-veh-num">
                  Vehicle Number : {driverData.registrationNumber}
                </h4>
                <h5 className="lt-veh-id">
                  Vehicle Id : {driverData.vehicleId}
                </h5>
                <p className="view-veh-detail">
                  View Vehicle details <FaAngleRight className="right-det" />{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {triphistory && (
        <div className="trip-history-card">
          <h3 className="trip-history-head">
            <u>Trip History</u>
          </h3>
          <div className="trip-history-details">
            <div className="trip-start">
              <button className="trip-start-icon">
                <IoCarOutline />
              </button>
              <div className="start-det">
                <h5>Pickup Address</h5>
                <h6>Date, Start time</h6>
              </div>
            </div>
          </div>
          <div className="trip-history-details">
            <div className="trip-start">
              <button className="trip-start-icon">
                <IoCarOutline />
              </button>
              <div className="start-det">
                <h5>Pickup Address</h5>
                <h6>Date, Start time</h6>
              </div>
            </div>
          </div>
        </div>
      )}
      {vehilcesdriven && (
        <div className="vehicles-driven-card">
          <h3 className="vehicles-driven-head">
            <u>Vehicles Driven</u>
          </h3>
        </div>
      )}
      {customerfeedback && (
        <div className="customer-feedback-card">
          <h3 className="customer-feedback-head">
            <u>Customer Feedback</u>
          </h3>
        </div>
      )}
      <div className="curr-ass-veh">
        <h4>
          <u>Currently Assigned Vehicle</u>
        </h4>
        <div className="cur-det">
          <img className="cur-car-img" src={driverData.vehicleImage} alt="ff" />

          <div className="curr-dets-model">
            <div className="model-num">
              <h3 className="veh-num-cras">
                Reg no{driverData.registrationNumber}
              </h3>
              <h5 className="veh-model">Model{driverData.vehicleName}</h5>
            </div>
            <div className="curr-dets">
              <div className="model">
                <div>
                  <button className="curr-assg-val-btns">
                    <FaCarRear />
                  </button>
                </div>
                <div>
                  <p>Model</p>
                  <p>
                    <b>{driverData.vehicleName}</b>
                  </p>
                </div>
              </div>
              <div className="regno">
                <div>
                  <button className="curr-assg-val-btns">
                    <FaCarRear />
                  </button>
                </div>
                <div>
                  <div>
                    <p>Registration Num</p>
                    <p>
                      <b>{driverData.registrationNumber}</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="seatcp">
                <div>
                  <button className="curr-assg-val-btns">
                    <FaCarRear />
                  </button>
                </div>
                <div>
                  <p>Seat Capacity</p>
                  <p>
                    <b>{driverData.seatCapacity}</b>
                  </p>
                </div>
              </div>
              <div className="fueltype">
                <div>
                  <button className="curr-assg-val-btns">
                    <FaCarRear />
                  </button>
                </div>
                <div>
                  <p>Fuel Type</p>
                  <p>
                    <b>{driverData.fuelType}</b>
                  </p>
                </div>
              </div>
              <div className="mil">
                <div>
                  <button className="curr-assg-val-btns">
                    <FaCarRear />
                  </button>
                </div>
                <div>
                  <p>Mileage</p>
                  <p>
                    <b>{driverData.mileage}</b>
                  </p>
                </div>
              </div>
              <div className="man-year">
                <div>
                  <button className="curr-assg-val-btns">
                    <FaCarRear />
                  </button>
                </div>
                <div>
                  <p>Manufacture Year</p>
                  <p>
                    <b>{driverData.yearOfManufacturing}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Driverprad;
