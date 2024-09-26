import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TripManagement from "./Pages/TripManagement/TripManagement";
import VehicleDashboard from "./Pages/VechileManagement/VehicleDashboard/VehicleDashboard.jsx";
import AddVehicle from "./Pages/VechileManagement/AddVehicle/AddVehicle";
import ViewVehicle from "./Pages/VechileManagement/ViewVehicle/ViewVehicle";
import Sidebar from "./Components/Sidebar/Sidebar";
import RouteManagement from "./Pages/RouteManagement/RouteManagement/RouteManagement";
import LiveTracking from './Pages/LiveTracking/LiveTracking';
// import NewDashboard from './Pages/VehicleDashboard/VehicleDashboard';
import TripHistory from './Pages/TripHistory/TripHistory';
// import Excel from './Components/Excel/Excel';
import EscortRegister  from './Pages/Escort/EscortRegister';
import TripHistoryToday from './Pages/TripHistory/TripHistoryToday';
//import Allvehicles from './Pages/Trip/Allvehicles';
import ViewEscort from './Pages/Escort/ViewEscort.jsx';
import EscortDashboard from './Pages/Escort/EscortDashboard.jsx';
import UserReg from "./Components/vendor/User.js"
import Vendordetails from "./Components/vendor/Vendordetails.js"
import VendorLogin from "./Components/vendor/Login.js"
import Employee from "./Pages/Employee/Employee.jsx"

const router = createBrowserRouter([
  {
    path:"/",
    element: <h1>Home</h1>,
  },
  {
    path:"/dashboard",
    element: <Sidebar />,
    children: [
      {
        path:"addvehicle",
        element: <AddVehicle />,
      },
      {
        path:"viewvehicle",
        element: <ViewVehicle />,
      },
      {
        path:"livetracking",
        element: <LiveTracking />,
      },
      {
        path:"history",
        element: <TripHistory />,
      },
     
    ],
  },
  {
    path: "/vehicledashboard", 
    element: <VehicleDashboard />,
  },
  {
    path: "/escortdashboard", 
    element: <EscortDashboard />,
  },
  // {
  //   path: "/newdashboard", 
  //   element: <NewDashboard />,
  // },
  {
    path: "/trips",
    element: <TripManagement />,
  },
  {
    path: "/routemanagement",
    element: <RouteManagement />,
  },
  {
    path: "livetracking",
    element: <LiveTracking />,
  },
  {
    path: "history",
    element: <TripHistory />,
  },
  {
    path: "todayhistory",
    element: <TripHistoryToday />,
  },
  // {
  //   path: "excel",
  //   element: <Excel/>,
  // },
  {
    path:"escort",
    element:<ViewEscort/>
  },
  {
    path:"/UserReg",
    element:<UserReg/>,
  },
  {
    path:"/vendordetails/:VendorName",
    element:<Vendordetails/>,
  }
  ,
  {
    path:"/vendorLogin",
    element:<VendorLogin />,
  },
  {
    path:"/Employee",
    element:<Employee/>,
  },
 
  
  
 
 
]);



function App() {
  return (
    <div className="app-root">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
