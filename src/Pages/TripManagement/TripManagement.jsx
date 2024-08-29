import "./TripManagement.css";
import Sidebar from "../../Components/Dashboard/Dashboard";
import MapComponent from "../../Components/Map/Map";
import SortFilteringTrips from "../../Components/SortFilteringTrips/SortFilteringTrips";
import Tripcards from "../../Components/Tripcards/Tripcards";
import RouteManagement from "../RouteManagement/RouteManagement/RouteManagement";
import Cards  from "../../Components/Cards/Cards";

function TripManagement() {
  return (
   
      <main className="trip-management--main">
      <Cards/>  
        <div className="map--component">
          <RouteManagement />
         
        </div>
      </main>
   
  );
}

export default TripManagement;
