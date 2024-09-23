
import React from 'react';
import SearchRow from '../../Components/Trip/SearchRow';
import TodayComponent from '../../Components/Trip/TodayComponent';
import TripCard from '../../Components/Trip/TripCard';
import Overview from '../../Components/Trip/Overview';
import RouteManagement from '../../Components/Trip/RouteManagement';
const TripHistory = () => {
  return (
        <div>
          <div className='search'>
          <SearchRow/>
          </div>
      <div className='TotalCont'>
      <div className='Cont'>
            <TodayComponent/>
            <TripCard/>
            <Overview/>
          </div>
          <div className='map'>
          <RouteManagement/>
          </div>
          </div>
          
    
    </div>
       
  )
}

export default TripHistory