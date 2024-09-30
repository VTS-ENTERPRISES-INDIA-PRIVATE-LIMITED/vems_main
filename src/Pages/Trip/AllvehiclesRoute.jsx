import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

import './AllvehiclesRoute.css';
import axios from 'axios';

const cabIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1724994766/024fc5c5b9125a2d29d31750e90c1700_o84pry.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const femaleIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1725006634/6833591_gpuxep.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const maleIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1725006654/3233508_u3epy7.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const startingPointIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1725006668/SRP-Startford_127669_20180717_001_riahxp.jpg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const MapBounds = ({ bounds }) => {
  const map = useMap();
  map.fitBounds(bounds);
  return null;
};

const offsetCoordinates = (lat, lng, index, total) => {
  const offset = 0.0001;
  const angle = (index / total) * Math.PI * 2;
  const offsetLat = lat + offset * Math.cos(angle);
  const offsetLng = lng + offset * Math.sin(angle);
  return { lat: offsetLat, lng: offsetLng };
};

const Allvehicles = ({ customClass, selectedVehicle }) => {
  console.log('Selected vehicle in Allvehicles:', selectedVehicle);

  const [route, setRoute] = useState([]);
  const [error, setError] = useState(null);
  const [showAllCabs, setShowAllCabs] = useState(true);
  const [employeesData, setEmployeesData] = useState([]);
  const mapRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!selectedVehicle) {
        console.warn('No selected vehicle provided');
        return; 
      }
      
      try {
        const response = await axios.get('http://localhost:8081/rides/${vehicle_id}');
        console.log('Employee data response:', response.data); 

        
        if (selectedVehicle?.vehicle_id) {
          const data = response.data.filter(
            (vehicle) => vehicle.vehicle_id === selectedVehicle.vehicle_id
          );
          console.log('Filtered employee data:', data); 
          setEmployeesData(data);
        } else {
          console.error('Invalid selectedVehicle:', selectedVehicle);
        }
      } catch (error) {
        console.error('Error fetching employees data:', error);
        setError('Error fetching employee data');
      }
    };
  
    fetchEmployeeData();
  }, [selectedVehicle]);
  

  const staticData = [
    { lat: 12.9833, lng: 80.2518, name: 'Cab 1', type: 'cab', id: 1 },
    { lat: 12.9184, lng: 80.2231, name: 'Cab 2', type: 'cab', id: 2 },
    { lat: 12.9178, lng: 80.2363, name: 'Cab 3', type: 'cab', id: 3 },
    { lat: 12.9716, lng: 80.2445, name: 'Cab 4', type: 'cab', id: 4 },
    { lat: 12.978581, lng: 80.2500201, name: 'Starting Point', type: 'startingPoint' },
  ];

  const cabs = staticData.filter((data) => data.type === 'cab');
  const startingPoint = staticData.find((data) => data.type === 'startingPoint');

  const groupedEmployees = employeesData.reduce((acc, emp) => {
    const key = `${emp.Latitude},${emp.Longitude}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(emp);
    return acc;
  }, {});

  const adjustedEmployees = Object.values(groupedEmployees).flatMap((group) =>
    group.map((emp, index) => {
      const { lat, lng } = offsetCoordinates(emp.Latitude, emp.Longitude, index, group.length);
      return { ...emp, lat, lng };
    })
  );

  const sortedEmployees = adjustedEmployees.sort((a, b) => a.PriorityOrder - b.PriorityOrder);

  const allMarkers = selectedVehicle
    ? [startingPoint, ...sortedEmployees].filter(Boolean)
    : showAllCabs
    ? [...cabs, startingPoint].filter(Boolean)
    : [startingPoint].filter(Boolean);

  const bounds = L.latLngBounds(allMarkers.map((marker) => [marker.lat, marker.lng]));

  useEffect(() => {
    console.log('Selected vehicle:', selectedVehicle);
    console.log('Selected vehicle employees:', employeesData);

    if (!selectedVehicle) {
      console.log('No selected vehicle available');
      return;
    }

    const fetchRoute = async () => {
      console.log('Fetching route...');
      try {
        const routeCoordinates = [];
        let currentLocation = startingPoint;

        for (const employee of sortedEmployees) {
          const start = currentLocation;
          const end = employee;

          console.log('Fetching route from', start, 'to', end);

          const response = await axios.get(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            {
              params: {
                api_key: '5b3ce3597851110001cf6248fc4917b9ae9d4da4938a16ecba608beb',
                start: `${start.lng},${start.lat}`,
                end: `${end.lng},${end.lat}`,
                format: 'geojson',
              },
            }
          );

          console.log('Route response:', response.data);

          if (response.data && response.data.features && response.data.features.length > 0) {
            const segmentCoordinates = response.data.features[0].geometry.coordinates.map(
              (coord) => [coord[1], coord[0]]
            );
            routeCoordinates.push(...segmentCoordinates);
            currentLocation = employee;
          } else {
            setError('No route data available or invalid response structure');
            return;
          }
        }

        setRoute(routeCoordinates);
      } catch (error) {
        console.error('Error fetching route:', error);
        setError('Error fetching route');
      }
    };

    fetchRoute();
  }, [selectedVehicle, sortedEmployees, startingPoint]);

  const getIcon = (type, gender) => {
    if (type === 'employee') {
      return gender === 'Female' ? femaleIcon : maleIcon;
    }
    switch (type) {
      case 'cab':
        return cabIcon;
      case 'startingPoint':
        return startingPointIcon;
      default:
        return cabIcon;
    }
  };

  return (
    <div className="route-management-container">
      <div className="map-container">
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [50, 50] }}
          className={customClass}
          style={{ height: '1000px', width: '54vw', marginLeft: '-200px', marginRight: '-10px', marginTop: '-20px' }}
          center={[12.9716, 80.2445]}
          zoom={13}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapBounds bounds={bounds} />
          {allMarkers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={getIcon(marker.type, marker.EmployeeGender)}>
              <Popup>
                <div><strong>Employee ID:</strong> {marker.EmployeeName}</div>
                <div><strong>Priority:</strong> {marker.PriorityOrder}</div>
              </Popup>
            </Marker>
          ))}
          {route.length > 0 && (
            <Polyline ref={polylineRef} positions={route} color="blue" weight={5} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Allvehicles;