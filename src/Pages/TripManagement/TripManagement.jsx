import React, { useState } from "react";
import "./TripManagement.css";
import Sidebar from "../../Components/Dashboard/Dashboard";
import MapComponent from "../../Components/Map/Map";
import SortFilteringTrips from "../../Components/SortFilteringTrips/SortFilteringTrips";
import Tripcards from "../../Components/Tripcards/Tripcards";
import RouteManagement from "../RouteManagement/RouteManagement/RouteManagement";
import Cards from "../../Components/Cards/Cards";
import SearchRow from "../../Components/Trip/SearchRow";
import TripHistory from "../TripHistory/TripHistory"; // Ensure this import is correct

function TripManagement() {
  const [selectedFilter, setSelectedFilter] = useState("Today"); // Track the currently selected filter

  // Function to handle filter change
  const handleFilterChange = (view) => {
    setSelectedFilter(view);
  };

  return (
    <main className="trip-management--main">
      <SearchRow onFilterChange={handleFilterChange} /> {/* Pass the filter change handler */}
      {selectedFilter === "Today" ? (
        <Cards /> // Show Cards for today's trips
      ) : (
        <TripHistory view={selectedFilter} /> // Show TripHistory for other filters
      )}
      <div className="map--component">
        <MapComponent /> {/* Include your map component here */}
      </div>
    </main>
  );
}

export default TripManagement;
