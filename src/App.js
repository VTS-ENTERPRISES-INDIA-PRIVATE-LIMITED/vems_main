import "./App.css";

// importing route Pages
import TripManagement from "./Pages/TripManagement/TripManagement";
import VehicleDashboard from "./Pages/VechileManagement/VehicleDashboard/VehicleDashboard";
import AddVehicle from "./Pages/VechileManagement/AddVehicle/AddVehicle";
import ViewVehicle from "./Pages/VechileManagement/ViewVehicle/ViewVehicle";
// import Route from "./Components/RouteManagement/Route";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },

  {
    path: "/trips",
    element: <TripManagement />,
  },

  // route management
  {
    path: "route",
    element: <Route />,
  },
]);

function App() {
  return (
    <div className="vems--root">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
