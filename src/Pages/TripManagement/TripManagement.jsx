import "./TripManagement.css";
import Sidebar from "../../Components/Dashboard/Dashboard";
import MapComponent from "../../Components/Map/Map";
import SortFilteringTrips from "../../Components/SortFilteringTrips/SortFilteringTrips";
import Tripcards from "../../Components/Tripcards/Tripcards";

function TripManagement() {
  return (
    <section className="trip-management--section">
      <Sidebar />
      <main className="trip-management--main">
        <Tripcards />
        <div className="map--component">
          <MapComponent />
          <SortFilteringTrips />
        </div>
      </main>
    </section>
  );
}

export default TripManagement;
