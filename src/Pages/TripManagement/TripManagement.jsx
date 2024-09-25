import React, { useState } from "react";
import "./TripManagement.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import RouteManagement from "../RouteManagement/RouteManagement/RouteManagement";
import Cards from "../../Components/Cards/Cards";
import SearchRow from "../../Components/Trip/SearchRow";
import TripHistory from "../TripHistory/TripHistory"; // Ensure this import is correct
import AllVehiclesHistory from "../AllVehiclesHistory/AllVehiclesHistory"

function TripManagement() {
  const [selectedFilter, setSelectedFilter] = useState("Today"); // Track the currently selected filter

  // Function to handle filter change
  const handleFilterChange = (view) => {
    setSelectedFilter(view);
  };

  return (
    <main className="trip-management--main">
      <div className="Searchrow">
      <SearchRow onFilterChange={handleFilterChange}/> </div>
      {/* Search bar at the top */}

      <div className="trip-content-container"> 
        {/* Container for displaying cards or trip history */}
        {selectedFilter === "Today" ? (
          <Cards /> // Show Cards for today's trips
        ) : (
          <AllVehiclesHistory view={selectedFilter} /> // Show TripHistory for other filters
        )}
      </div>
    </main>
  );
}

export default TripManagement;
