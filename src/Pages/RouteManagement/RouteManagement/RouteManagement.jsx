import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './Route.css';


delete L.Icon.Default.prototype._getIconUrl;
const startingPointIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1725006668/SRP-Startford_127669_20180717_001_riahxp.jpg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [32, 32]
});

const otherPointIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1725006634/6833591_gpuxep.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [32, 32]
});


const vehicleIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1724994766/024fc5c5b9125a2d29d31750e90c1700_o84pry.png', // Replace with the URL of your vehicle icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [40, 40]
});

const RouteManagement = ({ customClass }) => {
  const [route, setRoute] = useState([]);
  const [error, setError] = useState(null);

  const waypoints = [
    { lat: 12.978581, lng: 80.2480889, name: 'Starting Point', isStartingPoint: true },
    { lat: 12.9184, lng: 80.2231, name: 'Sholinganallur', isStartingPoint: false },
    { lat: 12.9178, lng: 80.2363, name: 'Navalur', isStartingPoint: false }
  ];

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
                api_key: '5b3ce3597851110001cf6248fc4917b9ae9d4da4938a16ecba608beb',
                start: `${start.lng},${start.lat}`,
                end: `${end.lng},${end.lat}`,
                format: 'geojson'
              }
            }
          );

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
        console.error("Error fetching route:", error);
        setError('Error fetching route');
      }
    };

    fetchRoute();
  }, []);

  return (
    <div>
      <MapContainer
        center={[12.9833, 80.2518]}
        zoom={12}
        className={customClass}
        style={{ height: '700px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {route.length > 0 && (
          <Polyline
            positions={route}
            color="red"
            weight={5}
            opacity={0.7}
          />
        )}

        {waypoints.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.lng]}
            icon={point.isStartingPoint ? startingPointIcon : otherPointIcon}
          >
            <Popup>{point.name}</Popup>
          </Marker>
        ))}

        {/* Add a vehicle marker on the route */}
        {route.length > 0 && (
          <Marker
            position={route[Math.floor(route.length / 2)]} 
          >
            <Popup>Vehicle</Popup>
          </Marker>
        )}

        {error && <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>{error}</div>}
      </MapContainer>
    </div>
  );
};

export default RouteManagement;
