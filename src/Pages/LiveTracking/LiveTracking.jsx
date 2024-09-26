import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveTracking.css';
import axios from 'axios';

const routeIcon = new L.Icon({
  iconUrl: 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1725006634/6833591_gpuxep.png', 
  iconSize: [30, 30], 
});

const orsApiKey = '5b3ce3597851110001cf6248fc4917b9ae9d4da4938a16ecba608beb'; 

const LiveTracking = () => {
  const [route, setRoute] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  
  useEffect(() => {
    
    const routeData = [
      { lat: 13.0382, lng: 80.2365, distance: '2km', time: '7:30 a.m.' }, // Employee 1
      { lat: 13.0127, lng: 80.2299, distance: '3km', time: '8:00 a.m.' }, // Employee 2
      { lat: 12.9845, lng: 80.2589, distance: '4km', time: '8:30 a.m.' }  // Employee 3
    ];
    setRoute(routeData);

   
    const coordinates = routeData.map(emp => [emp.lng, emp.lat]);
    
   
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
    <MapContainer center={[13.0700, 80.2500]} zoom={13} style={{ height: '600px', flexGrow: 1}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
     
      {routeCoords.length > 0 && (
        <Polyline positions={routeCoords} color="black" weight={4} />
      )}

    
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
