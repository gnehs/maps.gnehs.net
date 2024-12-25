"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker } from "react-leaflet";
import { MapLibreTileLayer } from "@/components/MapLibreTileLayer";
import ice from "@/public/ice.json";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Button from "@/components/Button";
import { useState, useMemo } from "react";
import { Drawer } from "vaul";
import { MapIcon } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const filteredIce = useMemo(() => {
    return ice.filter((item) => {
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
  }, [activeBrand, flavor]);
  const activeItem =
    activeItemIndex !== null ? filteredIce[activeItemIndex] : null;
  return (
    <div className="relative">
      <MapContainer
        className="z-0 h-[100svh]"
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
              key={item.name + item.lat + item.lng}
              position={[item.lat, item.lng]}
              icon={item.brand === "7-11" ? SevenElevenIcon : FamilyMartIcon}
              eventHandlers={{
                click: (e) => {
                  setActiveItemIndex(index);
                  setOpen(true);
                },
              }}
            />
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
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none">
            <div className="flex-1 rounded-t-[10px] bg-white p-4">
              <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
              {activeItem && (
                <div className="mx-auto max-w-md">
                  <Drawer.Title className="mb-2 flex items-center gap-2 text-xl font-medium text-gray-900">
                    {activeItem.brand === "7-11" && (
                      <img src="/7-eleven_logo.svg" className="size-5" />
                    )}
                    {activeItem.brand === "全家" && (
                      <img src="/FamilyMart_Logo.svg" className="size-5" />
                    )}
                    {activeItem.brand === "7-11"
                      ? "統一超商"
                      : activeItem.brand}
                    {activeItem.name}店
                  </Drawer.Title>
                  <p className="mb-2 text-gray-600">
                    {activeItem.tags.join("、")}
                  </p>
                  <p className="mb-2 text-gray-600">{activeItem.address}</p>

                  <a
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gray-50 transition-colors hover:bg-gray-100 active:bg-gray-200"
                    href={`https://www.google.com/maps/search/?api=1&query=${activeItem.brand}${activeItem.name}店`}
                    target="_blank"
                  >
                    <MapIcon size={20} />在 Google 地圖上查看
                  </a>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
