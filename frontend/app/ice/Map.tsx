"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { MapLibreTileLayer } from "./MapLibreTileLayer";
import ice from "@/public/ice.json";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import MarkerClusterGroup from "react-leaflet-markercluster";
const SevenElevenIcon = icon({
  iconUrl: "/7-eleven_logo.svg",
  iconSize: [32, 32],
});
const FamilyMartIcon = icon({
  iconUrl: "/FamilyMart_Logo.svg",
  iconSize: [32, 32],
});
export default function Map() {
  return (
    <div>
      <MapContainer
        className="h-screen"
        center={[25.02, 121.53]}
        zoom={14}
        minZoom={3}
        maxZoom={19}
        maxBounds={[
          [-85.06, -180],
          [85.06, 180],
        ]}
        scrollWheelZoom={true}
      >
        <MapLibreTileLayer
          attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/styles/alidade_smooth.json"
        />
        <MarkerClusterGroup>
          {ice.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={item.brand === "7-11" ? SevenElevenIcon : FamilyMartIcon}
            >
              <Popup>
                {item.brand} <br />
                {item.name} <br />
                {item.tags.join("、")}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
