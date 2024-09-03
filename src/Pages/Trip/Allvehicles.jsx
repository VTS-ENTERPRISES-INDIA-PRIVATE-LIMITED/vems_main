import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet-arrowheads';
import axios from 'axios';
import './Allvehicles.css';

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

const RouteManagement = ({ customClass, selectedVehicle }) => {
  const [employees, setEmployees] = useState([]);
  const [cards, setCards] = useState([]);
  const [route, setRoute] = useState([]);
  const [error, setError] = useState(null);
  const [vehicleSelected, setVehicleSelected] = useState(null);
  const mapRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/path/to/employees.json');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  const staticData = [
    { lat: 12.9833, lng: 80.2518, name: 'Cab 1', type: 'cab' },
    { lat: 12.9184, lng: 80.2231, name: 'Cab 2', type: 'cab' },
    { lat: 12.9178, lng: 80.2363, name: 'Cab 3', type: 'cab' },
    { lat: 12.9716, lng: 80.2445, name: 'Cab 4', type: 'cab' },
    { lat: 12.978581, lng: 80.2500201, name: 'Starting Point', type: 'startingPoint' }
  ];

  const cabs = staticData.filter(data => data.type === 'cab');
  const startingPoint = staticData.find(data => data.type === 'startingPoint');

  const employeesData = selectedVehicle
  ? selectedVehicle.employees.map(emp => ({
      lat: emp.latitude,
      lng: emp.longitude,
      name: emp.emp_id,
      type: 'employee',
      gender: emp.gender,
      priorityOrder: emp.priority_order // Updated field
    }))
  : employees.map(emp => ({
      lat: emp.latitude,
      lng: emp.longitude,
      name: emp.emp_id,
      type: 'employee',
      gender: emp.gender,
      priorityOrder: emp.priority_order // Updated field
    }));

// Sort based on priority_order instead of priority
const sortedEmployees = employeesData.sort((a, b) => a.priorityOrder - b.priorityOrder);


 

  const allMarkers = [
    ...(selectedVehicle ? [] : cabs),
    startingPoint,
    ...sortedEmployees
  ].filter(Boolean);

  const bounds = L.latLngBounds(allMarkers.map(marker => [marker.lat, marker.lng]));

  useEffect(() => {
    if (sortedEmployees.length > 0 && startingPoint) {
      const fetchRoute = async () => {
        try {
          const routeCoordinates = [];
          let currentLocation = startingPoint;
  
          // Iterate through sorted employees in the correct priority order
          for (const employee of sortedEmployees) {
            const start = currentLocation;
            const end = employee;
  
            const response = await axios.get(
              'https://api.openrouteservice.org/v2/directions/driving-car',
              {
                params: {
                  api_key: '5b3ce3597851110001cf6248fc4917b9ae9d4da4938a16ecba608beb',
                  start: `${start.lng},${start.lat}`,
                  end: `${end.lng},${end.lat}`,
                  format: 'geojson'
                }
              }
            );
  
            if (response.data && response.data.features && response.data.features.length > 0) {
              const segmentCoordinates = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
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
        }
      };
  
      fetchRoute();
    }
  }, [sortedEmployees, startingPoint]);
  

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

  useEffect(() => {
    if (polylineRef.current && mapRef.current) {
      polylineRef.current.arrowheads({
        size: '15px',
        frequency: 'endonly',
        fill: true,
        color: '#FF0000'
      });
    }
  }, [route]);

  return (
    <div className="route-management-container">
      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.name}</h3>
            <p>{card.details}</p>
          </div>
        ))}
      </div>
      <div className="map-container">
        <MapContainer
          bounds={bounds}
          boundsOptions={{ padding: [50, 50] }}
          className={customClass}
          style={{ height: '600px', width: '40vw', marginLeft: '10px' }}
          center={[12.9716, 80.2445]}
          zoom={13}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {allMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.lat, marker.lng]}
              icon={getIcon(marker.type, marker.gender)}
            >
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
          {route.length > 0 && (
            <Polyline
              positions={route}
              color="blue"
              weight={5}
              opacity={0.7}
              ref={polylineRef}
            />
          )}
          <MapBounds bounds={bounds} />
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteManagement;