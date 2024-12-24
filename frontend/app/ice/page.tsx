import dynamic from "next/dynamic";
import type { Metadata } from "next";
const Map = dynamic(() => import("./Map"), { ssr: false });
export const metadata: Metadata = {
  title: "超商冰淇淋地圖",
  description: "來看看哪裡有超商賣冰淇淋吧！",
  icons: "/map.png",
};
export default function Page() {
  return <Map />;
}
