import fs from "fs";
function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

const _013_cathay = readJSON("dist/013-cathay.json");
const _808_esun = readJSON("dist/808-esun.json");
const _812_taishin = readJSON("dist/812-taishin.json");

const result = [
  ..._013_cathay
    .filter((store) => store.Type.Foreign === "2")
    .map((store) => ({
      name: store.SetAddressKind,
      address: store.Address,
      lat: parseFloat(store.Latitude),
      lng: parseFloat(store.Longitude),
      brand: "國泰世華",
      tags: [
        store.Type.JPY === "1" ? "🇯🇵 日圓" : "",
        store.Type.USD === "1" ? "🇺🇸 美元" : "",
      ].filter((x) => x),
    })),
  ..._808_esun
    .filter((x) => x.IsForeign)
    .map((store) => ({
      name: store.Location,
      address: store.Address,
      time: store.ServiceTime,
      lat: parseFloat(store.Latitude),
      lng: parseFloat(store.Longitude),
      brand: "玉山銀行",
      tags: [
        store.ATMCurrencyIDs.includes(1) ? "🇺🇸 美元" : "",
        store.ATMCurrencyIDs.includes(2) ? "🇭🇰 港幣" : "",
        store.ATMCurrencyIDs.includes(3) ? "🇯🇵 日圓" : "",
        store.ATMCurrencyIDs.includes(4) ? "🇨🇳 人民幣" : "",
      ].filter((x) => x),
    })),
  ..._812_taishin
    .filter(
      (store) =>
        store.JPY === "y" ||
        store.USD === "y" ||
        store.EUR === "y" ||
        store.CNY === "y"
    )
    .map((store) => ({
      name: store.SITE_NAME,
      address: store.CITY + store.REGION + store.ADDRESS,
      lat: parseFloat(store.LATITUDE),
      lng: parseFloat(store.LONGITUDE),
      brand: "台新銀行",
      tags: [
        store.JPY === "y" ? "🇯🇵 日圓" : "",
        store.USD === "y" ? "🇺🇸 美元" : "",
        store.EUR === "y" ? "🇪🇺 歐元" : "",
        store.CNY === "y" ? "🇨🇳 人民幣" : "",
      ].filter((x) => x),
    })),
];

if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/bank.json", JSON.stringify(result, null, 2));
