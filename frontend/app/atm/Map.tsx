"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { MapLibreTileLayer } from "@/components/MapLibreTileLayer";
import bank from "@/public/bank.json";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Button from "@/components/Button";
import { useState, useMemo } from "react";
import { Drawer } from "vaul";
import { MapIcon } from "lucide-react";

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
  const [activeBrand, setActiveBrand] = useState<
    "all" | "國泰世華" | "玉山銀行" | "台新銀行" | "永豐銀行"
  >("all");
  const [activeTag, setActiveTag] = useState<
    "all" | "🇺🇸 美元" | "🇭🇰 港幣" | "🇯🇵 日圓" | "🇨🇳 人民幣"
  >("all");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | (typeof bank)[0]>(
    null,
  );

  const filteredBank = useMemo(() => {
    return bank.filter((item) => {
      if (activeBrand !== "all" && item.brand !== activeBrand) return false;
      if (activeTag !== "all" && !item.tags.includes(activeTag)) return false;
      return true;
    });
  }, [activeBrand, activeTag]);

  const markerComponents = useMemo(() => {
    return filteredBank.map((item, index) => (
      <Marker
        key={index}
        position={[item.lat, item.lng]}
        icon={getIcon(item.brand)}
        eventHandlers={{
          click: () => {
            setSelectedItem(item);
            setOpen(true);
          },
        }}
      />
    ));
  }, [filteredBank]);

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
        <MarkerClusterGroup>{markerComponents}</MarkerClusterGroup>
      </MapContainer>
      <div className="absolute left-0 top-0 flex w-full overflow-x-auto scrollbar-hide">
        <div className="flex shrink-0 items-center gap-2 p-4">
          <Button
            onClick={() => setActiveBrand("all")}
            active={activeBrand === "all"}
          >
            全部
          </Button>
          <Button
            onClick={() => setActiveBrand("國泰世華")}
            active={activeBrand === "國泰世華"}
          >
            <img src="/bank/013-cathay.svg" className="size-4" />
            <span className="hidden sm:inline">國泰世華</span>
          </Button>
          <Button
            onClick={() => setActiveBrand("玉山銀行")}
            active={activeBrand === "玉山銀行"}
          >
            <img src="/bank/808-esun.svg" className="size-4" />
            <span className="hidden sm:inline">玉山銀行</span>
          </Button>
          <Button
            onClick={() => setActiveBrand("台新銀行")}
            active={activeBrand === "台新銀行"}
          >
            <img src="/bank/812-taishin.svg" className="size-4" />
            <span className="hidden sm:inline">台新銀行</span>
          </Button>
          <Button
            onClick={() => setActiveBrand("永豐銀行")}
            active={activeBrand === "永豐銀行"}
          >
            <img src="/bank/807-sinopac.svg" className="size-4" />
            <span className="hidden sm:inline">永豐銀行</span>
          </Button>
          <div className="h-6 w-[2px] shrink-0 rounded-full bg-black/20 backdrop-blur" />
          <Button
            onClick={() => setActiveTag("all")}
            active={activeTag === "all"}
          >
            全部幣別
          </Button>
          <Button
            onClick={() => setActiveTag("🇺🇸 美元")}
            active={activeTag === "🇺🇸 美元"}
          >
            🇺🇸 美元
          </Button>
          <Button
            onClick={() => setActiveTag("🇭🇰 港幣")}
            active={activeTag === "🇭🇰 港幣"}
          >
            🇭🇰 港幣
          </Button>
          <Button
            onClick={() => setActiveTag("🇯🇵 日圓")}
            active={activeTag === "🇯🇵 日圓"}
          >
            🇯🇵 日圓
          </Button>
          <Button
            onClick={() => setActiveTag("🇨🇳 人民幣")}
            active={activeTag === "🇨🇳 人民幣"}
          >
            🇨🇳 人民幣
          </Button>
          <div className="h-6 w-[2px] shrink-0 rounded-full bg-black/20 backdrop-blur" />
          <div className="font-mono text-sm">
            {filteredBank.length.toLocaleString("zh-TW")} 筆資料
          </div>
        </div>
      </div>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none">
            <div className="flex-1 rounded-t-[10px] bg-white p-4">
              <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
              {selectedItem && (
                <div className="mx-auto max-w-md">
                  <Drawer.Title className="mb-2 flex items-center gap-2 text-xl font-medium text-gray-900">
                    <img
                      src={`/bank/${getIcon(selectedItem.brand).options.iconUrl.split("/").pop()}`}
                      className="size-5"
                    />
                    {selectedItem.brand} {selectedItem.name}
                  </Drawer.Title>
                  <p className="mb-1 text-gray-600">
                    {selectedItem.tags.join("、")}
                  </p>
                  <p className="mb-2 text-gray-600">{selectedItem.address}</p>

                  <a
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gray-50 transition-colors hover:bg-gray-100 active:bg-gray-200"
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedItem.name}`}
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
