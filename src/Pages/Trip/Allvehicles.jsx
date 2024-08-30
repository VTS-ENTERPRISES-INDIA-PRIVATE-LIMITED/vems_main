import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import axios from 'axios';
import './Allvehicles.css'; // Import your CSS file for styling

// Icons for different types of markers
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

// Component to handle map bounds dynamically
const MapBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);

  return null;
};

const RouteManagement = ({ customClass, selectedVehicle }) => {
  const [employees, setEmployees] = useState([]);
  const [cards, setCards] = useState([]);
  const [route, setRoute] = useState([]);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch employee data from a JSON file or API
    const fetchData = async () => {
      try {
        const response = await fetch('/path/to/employees.json'); // Replace with the actual path to your JSON file
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

  const cabs = selectedVehicle
    ? selectedVehicle.employees.map(emp => ({
        lat: emp.latitude,
        lng: emp.longitude,
        name: emp.emp_id,
        type: 'employee',
        gender: emp.gender
      }))
    : [...employees.map(emp => ({
        lat: emp.latitude,
        lng: emp.longitude,
        name: emp.emp_id,
        type: 'employee',
        gender: emp.gender
      })), ...staticData.filter(data => data.type === 'cab')];

  const allMarkers = [...cabs, staticData.find(data => data.type === 'startingPoint')].filter(Boolean);
  const bounds = L.latLngBounds(allMarkers.map(marker => [marker.lat, marker.lng]));

  // Define waypoints based on employee markers only
  const waypoints = cabs.map(data => ({
    lat: data.lat,
    lng: data.lng
  }));

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const segments = [];
        
        for (let i = 0; i < waypoints.length - 1; i++) {
          const start = waypoints[i];
          const end = waypoints[i + 1];
          
          const response = await axios.get(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            {
              params: {
                api_key: '5b3ce3597851110001cf6248fc4917b9ae9d4da4938a16ecba608beb', // Replace with your API key
                start: `${start.lng},${start.lat}`,
                end: `${end.lng},${end.lat}`,
                format: 'geojson'
              }
            }
          );
  
          // Log the response for debugging
          console.log('API Response:', response.data);
  
          if (response.data && response.data.features && response.data.features.length > 0) {
            const segmentCoordinates = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            segments.push(segmentCoordinates);
          } else {
            setError('No route data available or invalid response structure');
            return;
          }
        }
    
        const routeCoordinates = segments.flat();
        setRoute(routeCoordinates);
      } catch (error) {
        //console.error("Error fetching route:", error);
        setError(`Error fetching route: ${error.message || error}`);
      }
    };
  
    fetchRoute();
  }, [waypoints]);

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
          style={{ height: '600px', width: '40vw', marginLeft: '-200px' }}
          whenCreated={map => mapRef.current = map}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapBounds bounds={bounds} />

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
              color="red"
              weight={5}
              opacity={0.7}
            />
          )}
        </MapContainer>
      </div>
      {error && <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>{error}</div>}
    </div>
  );
};

export default RouteManagement;
