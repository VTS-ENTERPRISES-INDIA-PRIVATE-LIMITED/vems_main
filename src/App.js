import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TripManagement from "./Pages/TripManagement/TripManagement";
import VehicleDashboard from "./Pages/VechileManagement/VehicleDashboard/VehicleDashboard";
import AddVehicle from "./Pages/VechileManagement/AddVehicle/AddVehicle";
import ViewVehicle from "./Pages/VechileManagement/ViewVehicle/ViewVehicle";
import Dashboard from "./Components/Dashboard/Dashboard";
import RouteManagement from "./Pages/RouteManagement/RouteManagement/RouteManagement";
import LiveTracking from './Pages/LiveTracking/LiveTracking';
import NewDashboard from './Pages/Dashboard/NewDashboard';
import TripHistory from './Pages/TripHistory/TripHistory';
import Excel from './Components/Excel/Excel';
import EscortRegister  from './Pages/Escort/EscortRegister';
import TripHistoryToday from './Pages/TripHistory/TripHistoryToday';

const router = createBrowserRouter([
  {
    path:"/",
    element: <h1>Home</h1>,
  },
  {
    path:"/dashboard",
    element: <Dashboard />,
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
    path: "/newdashboard", 
    element: <NewDashboard />,
  },
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
  {
    path: "excel",
    element: <Excel/>,
  },
  {
    path:"escort",
    element:<EscortRegister/>
  }
  
 
 
]);


function App() {
  return (
    <div className="app-root">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
