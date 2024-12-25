import fs from "fs";
const { Atm: data } = await fetch(
  "https://www.cathaybk.com.tw/CathayBK/service/Locations/LocationsGetData.ashx",
  {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json; charset=utf-8",
      pragma: "no-cache",
      "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer:
      "https://www.cathaybk.com.tw/cathaybk/personal/contact/locations/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
).then((res) => res.json());
const result = Object.entries(data)
  .map(([city, value]) =>
    value.map((item) => ({
      ...item,
      city,
    }))
  )
  .flat();

if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/013-cathay.json", JSON.stringify(result, null, 2));
