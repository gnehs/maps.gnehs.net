"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { MapLibreTileLayer } from "@/components/MapLibreTileLayer";
import ice from "@/public/ice.json";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
const SevenElevenIcon = icon({
  iconUrl: "/7-eleven_logo.svg",
  iconSize: [32, 32],
});
const FamilyMartIcon = icon({
  iconUrl: "/FamilyMart_Logo.svg",
  iconSize: [32, 32],
});
export default function Map() {
  const [activeBrand, setActiveBrand] = useState<"all" | "7-11" | "全家">(
    "all",
  );
  const [flavor, setFlavor] = useState<"all" | "single" | "double">("all");

  const filteredIce = ice.filter((item) => {
    if (activeBrand === "all") return true;
    if (activeBrand === "7-11") return item.brand === "7-11";
    if (activeBrand === "全家") {
      if (flavor === "all") return item.brand === "全家";
      if (flavor === "single")
        return item.brand === "全家" && item.tags.includes("單口味");
      if (flavor === "double")
        return item.brand === "全家" && item.tags.includes("雙口味");
    }
    return false;
  });
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
          {filteredIce.map((item, index) => (
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
      <div className="scrollbar-hide absolute left-0 top-0 z-[999] flex w-full overflow-x-auto">
        <div className="flex shrink-0 items-center gap-2 p-4">
          <Button
            onClick={() => setActiveBrand("all")}
            active={activeBrand === "all"}
          >
            全部
          </Button>
          <Button
            onClick={() => setActiveBrand("7-11")}
            active={activeBrand === "7-11"}
          >
            <img src="/7-eleven_logo.svg" className="size-4" />
            <span className="hidden sm:inline">7-11</span>
          </Button>
          <Button
            onClick={() => setActiveBrand("全家")}
            active={activeBrand === "全家"}
          >
            <img src="/FamilyMart_Logo.svg" className="size-4" />
            <span className="hidden sm:inline">全家</span>
          </Button>
          {activeBrand === "全家" && (
            <>
              <div className="h-6 w-[2px] shrink-0 rounded-full bg-black/20 backdrop-blur" />
              <Button
                onClick={() => setFlavor("all")}
                active={flavor === "all"}
              >
                全部
              </Button>
              <Button
                onClick={() => setFlavor("single")}
                active={flavor === "single"}
              >
                單口味
              </Button>
              <Button
                onClick={() => setFlavor("double")}
                active={flavor === "double"}
              >
                雙口味
              </Button>
            </>
          )}
          <div className="h-6 w-[2px] shrink-0 rounded-full bg-black/20 backdrop-blur" />
          <div className="font-mono text-sm">
            {filteredIce.length.toLocaleString("zh-TW")} 筆資料
          </div>
        </div>
      </div>
    </div>
  );
}
