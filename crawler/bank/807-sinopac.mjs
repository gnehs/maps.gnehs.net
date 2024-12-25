import fs from "fs";
const result = await fetch(
  "https://mma.sinopac.com/Share/CustomerService/ATMListJsonNew.ashx?QueryType=1&CrossCallBack=callForJsonp1&callback=callForJsonp1"
)
  .then((response) => response.text())
  .then((text) =>
    JSON.parse(text.replace("callForJsonp1(", "").replace(");", ""))
  );
if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/807-sinopac.json", JSON.stringify(result, null, 2));
