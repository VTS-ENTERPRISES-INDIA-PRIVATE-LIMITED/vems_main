import React, { useState, useEffect } from 'react';
import SearchRow from '../../Components/Trip/SearchRow';
import TodayComponent from '../../Components/Trip/TodayComponent';
import TripCard from '../../Components/Trip/TripCard';
import Overview from '../../Components/Trip/Overview';
// import RouteManagement from '../../Components/Trip/RouteManagement';
import AllvehiclesRoute from  '../Trip/AllvehiclesRoute'
import TripHistory from '../TripHistory/TripHistory';
import './TripHistoryToday.css';

const TripHistoryToday = () => {
  const [selectedView, setSelectedView] = useState('Today');
  const [tripData, setTripData] = useState([]); 
  const trips = [
   
  ];

 
  const getFilteredData = (view) => {
    const today = new Date();
    let filteredTrips = [];

    switch (view) {
      case 'Today':
        filteredTrips = trips.filter((trip) =>
          new Date(trip.startDate).toDateString() === today.toDateString()
        );
        break;
      case 'Yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filteredTrips = trips.filter((trip) =>
          new Date(trip.startDate).toDateString() === yesterday.toDateString()
        );
        break;
      case '1 Week':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        filteredTrips = trips.filter((trip) =>
          new Date(trip.startDate) >= lastWeek && new Date(trip.startDate) <= today
        );
        break;
      case '1 Month':
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        filteredTrips = trips.filter((trip) =>
          new Date(trip.startDate) >= lastMonth && new Date(trip.startDate) <= today
        );
        break;
      default:
        filteredTrips = trips; 
    }

    return filteredTrips;
  };

  useEffect(() => {
    const initialData = getFilteredData('Today');
    setTripData(initialData);
  }, []);

  
  const handleFilterChange = (view) => {
    const filteredData = getFilteredData(view);
    setTripData(filteredData); 
    setSelectedView(view); 
  };

  return (
    <div>
      <div className='search'>
        <SearchRow onFilterChange={handleFilterChange} />
      </div>

      <div className='TotalCont'>
        <div className='Cont'>
          {selectedView === 'Today' ? (
            <>
              <TodayComponent />
              <TripCard />
              <Overview />
            </>
          ) : (
            <TripHistory data={tripData} /> 
          )}
        </div>
        {selectedView === 'Today' && (
          <div className='map'>
            <AllvehiclesRoute customClass="map-cards" /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default TripHistoryToday;
