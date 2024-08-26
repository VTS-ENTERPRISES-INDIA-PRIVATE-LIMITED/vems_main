import "./TripManagement.css";
import Sidebar from "../../Components/Dashboard/Dashboard";
import MapComponent from "../../Components/Map/Map";
import SortFilteringTrips from "../../Components/SortFilteringTrips/SortFilteringTrips";

function TripManagement() {
  return (
    <section className="trip-management--section">
      <Sidebar />
      <main className="trip-management--main">
        <MapComponent />
        <SortFilteringTrips />
      </main>
    </section>
  );
}

export default TripManagement;
