import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './Route.css';

// Custom icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RouteManagement = ({ customClass }) => {
  const [route, setRoute] = useState([]);
  const [error, setError] = useState(null);

  const waypoints = [
    { lat: 12.9833, lng: 80.2518, name: 'Thiruvanmiyur' },
    { lat: 12.9184, lng: 80.2231, name: 'Sholinganallur' },
    { lat: 12.9178, lng: 80.2363, name: 'Navalur' }
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
        className={customClass} // Apply custom class
        style={{ height: '700px', width: '100%' ,margintop:'-25px'}} // Default styles (can be overridden by the class)
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
          <Marker key={index} position={[point.lat, point.lng]}>
            <Popup>{point.name}</Popup>
          </Marker>
        ))}
  
        {error && <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px',margintop:'-25px' }}>{error}</div>}
      </MapContainer>
    </div>
  );
};

export default RouteManagement;
