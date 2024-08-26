import React from "react";
import "./SortFilteringTrips.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="headers">
      <div className="inputs-search">
        <input
          type="text"
          placeholder="Search Vehicle"
          className="search-input"
        />
        <button className="filter-button">Filter</button>
      </div>
      <div className="status-info">
        <p className="status-total">210 All</p>
        <p className="status-running">Running: 150</p>
        <p className="status-stopped">Stopped: 20</p>
        <p className="status-unreachable">Unreachable: 15</p>
        <p className="status-idle">Idle: 5</p>
      </div>
    </header>
  );
};

export default Header;
