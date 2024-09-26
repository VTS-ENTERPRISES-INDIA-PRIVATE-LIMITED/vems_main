import React, { useState } from "react";
import "./TripManagement.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import RouteManagement from "../RouteManagement/RouteManagement/RouteManagement";
import Cards from "../../Components/Cards/Cards";
import SearchRow from "../../Components/Trip/SearchRow";
import TripHistory from "../TripHistory/TripHistory";
import AllVehiclesHistory from "../AllVehiclesHistory/AllVehiclesHistory"

function TripManagement() {
  const [selectedFilter, setSelectedFilter] = useState("Today"); 

 
  const handleFilterChange = (view) => {
    setSelectedFilter(view);
  };

  return (
    <main className="trip-management--main">
      <div className="Searchrow">
      <SearchRow onFilterChange={handleFilterChange}/> </div>
  

      <div className="trip-content-container"> 
      
        {selectedFilter === "Today" ? (
          <Cards /> 
        ) : (
          <AllVehiclesHistory view={selectedFilter} /> 
        )}
      </div>
    </main>
  );
}

export default TripManagement;
