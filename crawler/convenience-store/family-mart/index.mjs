import fs from "fs";
const HEADERS = {
  accept: "*/*",
  "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  pragma: "no-cache",
};
const key = await fetch(`https://www.family.com.tw/Marketing/StoreMap/`, {
  method: "GET",
  mode: "cors",
})
  .then((response) => response.text())
  .then((text) => text.match(/key=(\w+)"/)[1]);
const result = [];
console.log(`key=${key}`);
const cities = [
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "基隆市",
  "台北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "台南市",
  "高雄市",
  "屏東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
  "台中市",
  "彰化縣",
  "南投縣",
];
for (let city of cities) {
  console.log();
  const towns = await fetch(
    `https://api.map.com.tw/net/familyShop.aspx?searchType=ShowTownList&type=&city=${encodeURIComponent(
      city
    )}&fun=storeTownList&key=${key}`,
    {
      headers: HEADERS,
      referrer: "https://www.family.com.tw/",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "cors",
      credentials: "omit",
    }
  )
    .then((response) => response.text())
    .then((text) => JSON.parse(text.replace(/.*\(|\)$/g, "")));
  for (let town of towns) {
    console.log(city, town.town);
    let stores = await fetch(
      `https://api.map.com.tw/net/familyShop.aspx?searchType=ShopList&type=&city=${encodeURIComponent(
        city
      )}&area=${encodeURIComponent(
        town.town
      )}&road=&fun=showStoreList&key=${key}`,
      {
        headers: HEADERS,
        referrer: "https://www.family.com.tw/",
        referrerPolicy: "strict-origin-when-cross-origin",
        mode: "cors",
        credentials: "omit",
      }
    )
      .then((response) => response.text())
      .then((text) => JSON.parse(text.replace(/.*\(|\)$/g, "")));
    result.push(
      ...stores.map((store) => ({ ...store, city, town: town.town }))
    );
  }
}

if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/family-mart.json", JSON.stringify(result, null, 2));
