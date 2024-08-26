import React from "react";
import "./SortFilteringTrips.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="headers">
      <div className="status-info">
        <p className="status-total hh">210 All</p>
        <p className="status-running">Running: 150</p>
        <p className="status-stopped">Stopped: 20</p>
        <p className="status-unreachable">Unreachable: 15</p>
        {/* <p className="status-idle">Idle: 5</p> */}
      </div>
    </header>
  );
};

export default Header;
