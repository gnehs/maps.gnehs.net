"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { MapLibreTileLayer } from "@/components/MapLibreTileLayer";
import bank from "@/public/bank.json";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import MarkerClusterGroup from "react-leaflet-markercluster";
const _013_Cathay = icon({
  iconUrl: "/bank/013-cathay.svg",
  iconSize: [32, 32],
});
const _808_Esun = icon({
  iconUrl: "/bank/808-esun.svg",
  iconSize: [32, 32],
});
const _810_Taishin = icon({
  iconUrl: "/bank/812-taishin.svg",
  iconSize: [32, 32],
});
const _807_Sinopac = icon({
  iconUrl: "/bank/807-sinopac.svg",
  iconSize: [32, 32],
});

function getIcon(brand: string) {
  switch (brand) {
    case "國泰世華":
      return _013_Cathay;
    case "玉山銀行":
      return _808_Esun;
    case "台新銀行":
      return _810_Taishin;
    case "永豐銀行":
      return _807_Sinopac;
    default:
      return _810_Taishin;
  }
}
export default function Map() {
  return (
    <div className="relative">
      <MapContainer
        className="h-[100svh]"
        zoomControl={false}
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
          {bank.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={getIcon(item.brand)}
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
      <div className="absolute left-10 top-0 z-[999] bg-white bg-opacity-50 p-4">
        {bank.length} 筆資料
      </div>
    </div>
  );
}
