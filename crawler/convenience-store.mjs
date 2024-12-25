import fs from "fs";
function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}
const sevenEleven = readJSON("dist/7-11.json");
const familyMart = readJSON("dist/family-mart.json");

const result = [
  ...sevenEleven
    .filter((store) => store.StoreImageTitle.includes("24雪淋霜霜淇淋"))
    .map((store) => ({
      name: store.POIName,
      address: store.Address,
      lat: store.Y / 1000000,
      lng: store.X / 1000000,
      brand: "7-11",
      tags: ["霜淇淋"],
    })),
  ...familyMart
    .filter((store) => store.all?.includes("ice"))
    .map((store) => ({
      name: store.NAME.replace(/^全家/, "").replace(/店$/, ""),
      address: store.addr,
      lat: store.py,
      lng: store.px,
      brand: "全家",
      tags: ["霜淇淋", store.twoice === "Y" ? "雙口味" : "單口味"],
    })),
];

if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("./dist/ice.json", JSON.stringify(result, null, 2));
