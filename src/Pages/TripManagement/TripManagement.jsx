import "./TripManagement.css";
import Sidebar from "../../Components/Dashboard/Dashboard";
import MapComponent from "../../Components/Map/Map";
import SortFilteringTrips from "../../Components/SortFilteringTrips/SortFilteringTrips";
import Tripcards from "../../Components/Tripcards/Tripcards";

function TripManagement() {
  return (
   
      <main className="trip-management--main">
        <Tripcards />
        <div className="map--component">
          <MapComponent />
          <SortFilteringTrips />
        </div>
      </main>
   
  );
}

export default TripManagement;
