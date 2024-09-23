import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveTracking.css'; // Custom CSS for styling the map and labels
import axios from 'axios';

const routeIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1725006634/6833591_gpuxep.png', // Replace with your icon URL
  iconSize: [30, 30], // Adjust the size
});

const orsApiKey = '5b3ce3597851110001cf6248fc4917b9ae9d4da4938a16ecba608beb'; // Replace with your OpenRouteService API key

const LiveTracking = () => {
  const [route, setRoute] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  
  useEffect(() => {
    // Employee route points
    const routeData = [
      { lat: 13.0382, lng: 80.2365, distance: '2km', time: '7:30 a.m.' }, // Employee 1
      { lat: 13.0127, lng: 80.2299, distance: '3km', time: '8:00 a.m.' }, // Employee 2
      { lat: 12.9845, lng: 80.2589, distance: '4km', time: '8:30 a.m.' }  // Employee 3
    ];
    setRoute(routeData);

    // Extract coordinates for ORS API request
    const coordinates = routeData.map(emp => [emp.lng, emp.lat]);
    
    // Fetch the route from OpenRouteService API
    const fetchRouteFromORS = async () => {
      try {
        const response = await axios.post(
          `https://api.openrouteservice.org/v2/directions/driving-car`,
          {
            coordinates: coordinates,
            format: 'geojson'
          },
          {
            headers: {
              'Authorization': orsApiKey,
              'Content-Type': 'application/json'
            }
          }
        );

        const routeGeoJson = response.data.features[0].geometry.coordinates;
        const leafletCoords = routeGeoJson.map(coord => [coord[1], coord[0]]); // Convert to Leaflet format [lat, lng]
        setRouteCoords(leafletCoords);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRouteFromORS();
  }, []);

  return (
    <MapContainer center={[13.0700, 80.2500]} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
      {/* Polyline representing the route */}
      {routeCoords.length > 0 && (
        <Polyline positions={routeCoords} color="black" weight={4} />
      )}

      {/* Markers with distance and time displayed by default using Tooltip */}
      {route.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]} icon={routeIcon}>
          <Tooltip direction="top" offset={[0, -10]} permanent>
            <span><strong>{location.distance}</strong><br />{location.time}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LiveTracking;
