import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "./Route.css";
import "leaflet-routing-machine";
// import "leaflet-routing-graphhopper";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Route = () => {
  const waypoints = [
    { lat: 13.0827, lng: 80.2707, name: "Chennai Central" },
    { lat: 13.0878, lng: 80.2785, name: "Marina Beach" },
    { lat: 13.0165, lng: 80.249, name: "Mylapore" },
  ];

  const RoutingLayer = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      if (L.Routing) {
        L.Routing.control({
          waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
          router: L.Routing.graphHopper("84cf823f-51f2-4f10-835f-5a3e4600cfec"),
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: "red", weight: 5 }],
          },
          createMarker: () => null,
        }).addTo(map);
      } else {
        console.error(
          "L.Routing is not available. Check leaflet-routing-machine integration."
        );
      }

      waypoints.forEach((point) => {
        L.marker([point.lat, point.lng]).addTo(map).bindPopup(point.name);
      });
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <RoutingLayer />
    </MapContainer>
  );
};

export default Route;
