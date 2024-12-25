import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "地圖",
  description: "地圖",
  icons: "/map.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
