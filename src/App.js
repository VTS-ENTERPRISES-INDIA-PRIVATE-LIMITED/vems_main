import React from 'react';


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TripManagement from "./Pages/TripManagement/TripManagement";
import VehicleDashboard from "./Pages/VechileManagement/VehicleDashboard/VehicleDashboard";
import AddVehicle from "./Pages/VechileManagement/AddVehicle/AddVehicle";
import ViewVehicle from "./Pages/VechileManagement/ViewVehicle/ViewVehicle";
import Dashboard from "./Components/Dashboard/Dashboard";
import RouteManagement from "./Pages/RouteManagement/RouteManagement/RouteManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "addvehicle",
        element: <AddVehicle />,
      },
      {
        path: "viewvehicle",
        element: <ViewVehicle />,
      },
    ],
  },
  {
    path: "/vehicledashboard", 
    element: <VehicleDashboard />,
  },
  {
    path: "/trips",
    element: <TripManagement />,
  },
  {
    path: "/routemanagement",
    element: <RouteManagement />,
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
