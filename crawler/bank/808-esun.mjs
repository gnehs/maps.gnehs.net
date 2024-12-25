import fs from "fs";
const result = await fetch(
  `https://www.esunbank.com/zh-tw/about/locations/foreign-currency-atm`
)
  .then((res) => res.text())
  .then((html) => {
    // get  var info = [{}] from source
    const data = html.match(/var info = (\[.*\])/)[1];
    return JSON.parse(data);
  });

if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/808-esun.json", JSON.stringify(result, null, 2));
