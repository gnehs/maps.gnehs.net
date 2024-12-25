import fs from "fs";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const result = [];
const cities = [
  "台北市",
  "新北市",
  "基隆市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "台中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "台南市",
  "高雄市",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "連江縣",
  "金門縣",
  "澎湖縣",
];
for (let city of cities) {
  console.log();
  const regions = await fetch(
    "https://www.taishinbank.com.tw/eServiceA/misc/GetCustomATM.jsp",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `city=${encodeURI(city)}&functoinName=getRegion`,
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => data.region.map((x) => x.REGION));
  for (let region of regions) {
    let page = 1;
    let maxPage = 1;
    do {
      console.log(city, region, page, maxPage);
      let { maxNum, customAtmList } = await fetch(
        "https://www.taishinbank.com.tw/eServiceA/misc/GetCustomATM.jsp",
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: `city=${encodeURIComponent(city)}&region=${encodeURIComponent(
            region
          )}&pageNum=${page}&functoinName=CustomAtm`,
          method: "POST",
        }
      ).then((res) => res.json());

      result.push(...customAtmList);
      maxPage = maxNum;
      page++;
    } while (page <= maxPage);
  }
}

if (!fs.existsSync("dist")) fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/812-taishin.json", JSON.stringify(result, null, 2));
