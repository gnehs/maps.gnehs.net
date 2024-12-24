import fs from "fs";
import { XMLParser } from "fast-xml-parser";
const HEADERS = {
  accept: "*/*",
  "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  pragma: "no-cache",
  "x-requested-with": "XMLHttpRequest",
};
const AREACODE = [
  { name: "台北市", coordinates: { x: 121517166, y: 25048055 }, id: "01" },
  { name: "基隆市", coordinates: { x: 121768104, y: 25151627 }, id: "02" },
  { name: "新北市", coordinates: { x: 121459043, y: 25009605 }, id: "03" },
  { name: "桃園市", coordinates: { x: 121301782, y: 24993918 }, id: "04" },
  { name: "新竹市", coordinates: { x: 120973664, y: 24805210 }, id: "05" },
  { name: "新竹縣", coordinates: { x: 121004279, y: 24839621 }, id: "06" },
  { name: "苗栗縣", coordinates: { x: 120819108, y: 24561589 }, id: "07" },
  { name: "台中市", coordinates: { x: 120680172, y: 24144180 }, id: "08" },
  { name: "台中縣", coordinates: { x: 120718156, y: 24241698 }, id: "09" },
  { name: "彰化縣", coordinates: { x: 120542278, y: 24081021 }, id: "10" },
  { name: "南投縣", coordinates: { x: 120687516, y: 23911253 }, id: "11" },
  { name: "雲林縣", coordinates: { x: 120527389, y: 23696933 }, id: "12" },
  { name: "嘉義市", coordinates: { x: 120453670, y: 23479000 }, id: "13" },
  { name: "嘉義縣", coordinates: { x: 120332480, y: 23458862 }, id: "14" },
  { name: "台南市", coordinates: { x: 120224423, y: 22980075 }, id: "15" },
  { name: "台南縣", coordinates: { x: 120316702, y: 23310117 }, id: "16" },
  { name: "高雄市", coordinates: { x: 120282797, y: 22622129 }, id: "17" },
  { name: "高雄縣", coordinates: { x: 120357287, y: 22627150 }, id: "18" },
  { name: "屏東縣", coordinates: { x: 120490142, y: 22674804 }, id: "19" },
  { name: "宜蘭縣", coordinates: { x: 121753479, y: 24752216 }, id: "20" },
  { name: "花蓮縣", coordinates: { x: 121607039, y: 23981993 }, id: "21" },
  { name: "台東縣", coordinates: { x: 121146825, y: 22754697 }, id: "22" },
  { name: "澎湖縣", coordinates: { x: 119566815, y: 23566252 }, id: "23" },
  { name: "金門縣", coordinates: { x: 118375352, y: 24457632 }, id: "25" },
  { name: "連江縣", coordinates: { x: 119925572, y: 26156777 }, id: "24" },
];
const parser = new XMLParser();
const result = [];
for (let area of AREACODE) {
  console.log();
  console.log(area.name, area.id);
  let towns = await fetch("https://emap.pcsc.com.tw/EMapSDK.aspx", {
    referrer: "https://emap.pcsc.com.tw/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `commandid=GetTown&cityid=${area.id}&leftMenuChecked=`,
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: HEADERS,
  })
    .then((response) => response.text())
    .then((text) => {
      return parser.parse(text);
    })
    .then((res) => {
      return res.iMapSDKOutput.GeoPosition;
    });
  if (towns && towns.length) {
    for (let town of towns) {
      console.log(area.name, town.TownName);
      let stores = await fetch("https://emap.pcsc.com.tw/EMapSDK.aspx", {
        referrer: "https://emap.pcsc.com.tw/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `commandid=SearchStore&city=${encodeURIComponent(
          area.name
        )}&town=${encodeURIComponent(
          town.TownName
        )}&roadname=&ID=&StoreName=&SpecialStore_Kind=&leftMenuChecked=&address=`,
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: HEADERS,
      })
        .then((response) => response.text())
        .then((text) => {
          return parser.parse(text);
        })
        .then((res) => {
          return res.iMapSDKOutput.GeoPosition;
        });
      if (stores && stores.length) {
        result.push(
          ...stores.map((store) => ({
            ...store,
            area: area.name,
            town: town.TownName,
          }))
        );
      }
    }
  }
}
// mkdir -p dist/7-11
if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/7-11.json", JSON.stringify(result, null, 2));
