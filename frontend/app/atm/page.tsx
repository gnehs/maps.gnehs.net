import dynamic from "next/dynamic";
import type { Metadata } from "next";
const Map = dynamic(() => import("./Map"), { ssr: false });
export const metadata: Metadata = {
  title: "外幣 ATM 地圖",
  description: "來看看哪個外幣 ATM 離你最近！",
  icons: "/map.png",
};
export default function Page() {
  return <Map />;
}
