"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Zone {
  name: string;
  coordinates: number[];
  type: "safe" | "danger";
}

interface MarkerData {
  position: number[];
  popup: string;
}

interface MapProps {
  center: number[];
  zones?: Zone[];
  markers?: MarkerData[];
}

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map: React.FC<MapProps> = ({ center, zones = [], markers = [] }) => {
  // Define the icon
  useEffect(() => {
    // Make sure this only runs in the browser
    if (typeof window !== "undefined") {
      L.Icon.Default.mergeOptions({
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });
    }
  }, []);

  return (
    <MapContainer
      center={[center[0], center[1]] as [number, number]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-full h-full"
      style={{ minHeight: "500px", minWidth: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <ZoomControl position="topright" />
      {zones.map((zone, index) => (
        <Marker
          key={`zone-${index}`}
          position={zone.coordinates as [number, number]}
          icon={zone.type === "safe" ? greenIcon : redIcon}
        >
          <Popup>
            <h3>{zone.name}</h3>
            <p>{zone.type === "safe" ? "Safe zone." : "Danger zone!"}</p>
          </Popup>
        </Marker>
      ))}
      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}`}
          position={marker.position as [number, number]}
        >
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;