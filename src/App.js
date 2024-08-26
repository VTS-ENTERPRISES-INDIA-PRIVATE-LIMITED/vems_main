import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Viewvehicle from './Components/ViewVehicle/ViewVehicle';
import VehicleDashboard from './Components/VehicleDashboard/VehicleDashboard';
import TripManagement from './Components/TripManagement/TripSchedule';
import Routess from  './Components/RouteManagement/Routess';

import Employeesdata from './Components/TripManagement/Employeesdata';
function App() {
  return (
   
       <div>
     <Employeesdata/>
     </div>
  );
}

export default App;
