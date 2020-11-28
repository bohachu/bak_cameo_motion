//import { load_js, load_css } from "./cameo_load.js";
//load_js("https://gmousse.github.io/dataframe-js/dist/dataframe.min.js",main);

class CameoTaiwanMap extends HTMLElement {
    
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-taiwan-map" id="${this.str_random_id}" 
        style="width: 100%; height: 500px;"></div>
    `;
    this.chart_render();
  }
  /*
  async load_data_csv() {
    let df = await dfjs.DataFrame.fromCSV(
      `data.csv`
    );
    df = df.transpose();
    let ary = df.toArray();
    console.log("@@@@@@@@@@@@");
    console.log(ary);
    console.log("!!!!!!!!!!!!");
    return ary;
  }
  */
    
  async chart_render(){

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    var chart = am4core.create(this.str_random_id, am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldHigh;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    chart.homeGeoPoint = {
      latitude: 0,
      longitude: -110
    };

    // 農食基地
    var series1 = chart.series.push(new am4maps.MapPolygonSeries());
    series1.geodataSource.url = "../data/taiwan.json";
    //series1.useGeodata = true;
    series1.name = "農食基地(農牧/食品)";
    series1.include = ["TW-YUN", "TW-CYQ", "TW-CYI", "TW-TNN"];
    series1.fill = am4core.color("#ffd670");

    var PolygonTemplate = series1.mapPolygons.template;
    PolygonTemplate.tooltipText = "{name}:{number}家數";
    PolygonTemplate.fill = am4core.color("#ffd670");
    series1.tooltip.fontSize = "12px";

    // 重工業聚落
    var series2 = chart.series.push(new am4maps.MapPolygonSeries());
    series2.geodataSource.url = "../data/taiwan.json";
    //series2.useGeodata = true;
    series2.name = "重工業聚落/親水聚落(石化、廢物處理、水上運輸)";
    series2.include = ["TW-KHH", "TW-PIF"];
    series2.fill = am4core.color("#e4abed");
    series2.mapPolygons.template.tooltipText = "{name}:{number}家數";
    series2.mapPolygons.template.fill = am4core.color("#e4abed");
    series2.tooltip.fontSize = "12px";

    // 傳產聚落
    var series3 = chart.series.push(new am4maps.MapPolygonSeries());
    series3.geodataSource.url = "../data/taiwan.json";
    //series3.useGeodata = true;
    series3.name = "傳產聚落(機械/生活產業)";
    series3.include = ["TW-TXG", "TW-CHA", "TW-NAN"];
    series3.fill = am4core.color("#93e695");
    series3.mapPolygons.template.tooltipText = "{name}:{number}家數";
    series3.mapPolygons.template.fill = am4core.color("#93e695");
    series3.tooltip.fontSize = "12px";

    // 高科技聚落
    var series4 = chart.series.push(new am4maps.MapPolygonSeries());
    series4.geodataSource.url = "../data/taiwan.json";
    //series4.useGeodata = true;
    series4.name = "高科技聚落(半導體/檢測/廢物處理)";
    series4.include = ["TW-TYC", "TW-HSQ", "TW-HSZ", "TW-MIA"];
    series4.fill = am4core.color("#86cbfc");
    series4.mapPolygons.template.tooltipText = "{name}:{number}家數";
    series4.mapPolygons.template.fill = am4core.color("#86cbfc");
    series4.tooltip.fontSize = "12px";

    // 傳產聚落（電子、印刷、倉儲）
    var series5 = chart.series.push(new am4maps.MapPolygonSeries());
    series5.geodataSource.url = "../data/taiwan.json";
    //series5.useGeodata = true;
    series5.name = "傳產聚落（電子、印刷、倉儲）";
    series5.include = ["TW-KEE", "TW-NWT", "TW-ILA"];
    series5.fill = am4core.color("#ffb0b0");
    series5.mapPolygons.template.tooltipText = "{name}:{number}家數";
    series5.mapPolygons.template.fill = am4core.color("#ffb0b0");
    series5.tooltip.fontSize = "12px";

    // 創新智樞總部(金融)
    var series6 = chart.series.push(new am4maps.MapPolygonSeries());
    series6.geodataSource.url = "../data/taiwan.json";
    //series6.useGeodata = true;
    series6.name = "創新智樞總部(金融)";
    series6.include = ["TW-TPE"];
    series6.fill = am4core.color("#9b9c9a");
    series6.mapPolygons.template.tooltipText = "{name}:{number}家數";
    series6.mapPolygons.template.fill = am4core.color("#9b9c9a");
    series6.tooltip.fontSize = "12px";

    // 資源採集/觀光地點
    var series7 = chart.series.push(new am4maps.MapPolygonSeries());
    series7.geodataSource.url = "../data/taiwan.json";
    //series7.useGeodata = true;
    series7.name = "資源採集/觀光地點(礦業/觀光)";
    series7.include = ["TW-HUA", "TW-TTT"];
    series7.fill = am4core.color("#ffba66");
    series7.mapPolygons.template.tooltipText = "{name}:{number}家數";
    series7.mapPolygons.template.fill = am4core.color("#ffba66");
    series7.tooltip.fontSize = "12px";

    // Pins
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.name = "公司";
    var imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.nonScaling = true;
    imageTemplate.tooltipText = "公司：{Company}\n地址：{Addr}\n營業額：${Revenue}";
    imageSeries.tooltip.animationDuration = 0;
    imageSeries.tooltip.showInViewport = false;
    imageSeries.tooltip.background.fillOpacity = 0.2;
    imageSeries.tooltip.getStrokeFromObject = true;
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.background.fillOpacity = 0.65;
    imageSeries.tooltip.background.fill = am4core.color("#000000");
    imageSeries.tooltip.fontSize = "12px";

    // Creating a pin bullet
    var pin = imageTemplate.createChild(am4plugins_bullets.PinBullet);

    // Colors
    var color1 = am4core.color("#0a3336");

    // Configuring pin appearance
    pin.background.fill = color1;
    pin.background.pointerBaseWidth = 1;
    pin.background.pointerLength = 250;
    pin.background.propertyFields.pointerLength = "length";
    pin.circle.fill = pin.background.fill;

    var label = pin.createChild(am4core.Label);
    label.text = "{shortname}";
    label.fontWeight = "bold";
    label.fontSize = "14px";
    label.propertyFields.dy = "length";
    label.propertyFields.dx = -5;
    label.verticalCenter = "middle";
    label.fill = am4core.color("#0a3336");
    label.adapter.add("dy", function (dy) {
      return (5 + dy) * -1;
    });

    // Creating a "heat rule" to modify "radius" of the bullet based
    // on value in data
    imageSeries.heatRules.push({
      target: pin.background,
      property: "radius",
      min: 5,
      max: 6,
      dataField: "value"
    });

    imageSeries.heatRules.push({
      target: label,
      property: "dx",
      min: 8,
      max: 15,
      dataField: "value"
    });

    imageSeries.heatRules.push({
      target: label,
      property: "paddingBottom",
      min: 0,
      max: 10,
      dataField: "value"
    });

    // Pin data
    imageSeries.data = [
      {
        latitude: 24.13054,
        longitude: 121.639746,
        value: 1,
        Revenue: 7433331,
        length: 10,
        industry: "資源採集/觀光地點（礦業/觀光）",
        shortname: "亞泥",
        Company: "亞洲水泥股份有限公司",
        Addr: "花蓮縣新城鄉新興路125號"
      },
      {
        latitude: 24.8,
        longitude: 121,
        value: 1,
        Revenue: 119302707,
        length: 10,
        industry: "高科技聚落(半導體/檢測/廢物處理)",
        shortname: "台積電",
        Company: "台灣積體電路製造股份有限公司",
        Addr: "新竹市東區研新一路9號"
      },
      {
        latitude: 24.696908977319026,
        longitude: 120.88201109683389,
        value: 1,
        Revenue: 1322080,
        length: 10,
        industry: "高科技聚落(半導體/檢測/廢物處理)",
        shortname: "超豐",
        Company: "超豐電子股份有限公司",
        Addr: "苗栗縣竹南鎮公義路136號"
      },
      {
        latitude: 24.9695509,
        longitude: 121.0858639,
        value: 1,
        Revenue: 2462001,
        length: 10,
        industry: "高科技聚落(半導體/檢測/廢物處理)",
        shortname: "景碩",
        Company: "景碩科技股份有限公司",
        Addr: "桃園市新屋區中華路1245號"
      },
      {
        latitude: 24.9661064,
        longitude: 121.421374,
        value: 1,
        Revenue: 612553870,
        length: 10,
        industry: "傳產聚落（電子、印刷、倉儲）",
        shortname: "鴻海",
        Company: "鴻海精密工業股份有限公司",
        Addr: "新北市土城區自由街2號"
      },
      {
        latitude: 25.0372682,
        longitude: 121.5535813,
        value: 1,
        Revenue: 43501365,
        length: 10,
        industry: "創新智樞總部(金融)",
        shortname: "國泰金",
        Company: "國泰金融控股公司",
        Addr: "台北市大安區仁愛路四段296號16樓"
      },
      {
        latitude: 24.1,
        longitude: 120.6,
        value: 1,
        Revenue: 18912907,
        length: 10,
        industry: "傳產聚落(機械/生活產業)",
        shortname: "傢櫥",
        Company: "MOODI WOOD 傢櫥",
        Addr: "台中市南屯區文心路一段498號"
      },
      {
        latitude: 23.033609077319028,
        longitude: 120.24447256869583,
        value: 1,
        Revenue: 36463221,
        length: 10,
        industry: "農食基地(農牧/食品)",
        shortname: "統一",
        Company: "統一企業股份有限公司",
        Addr: "臺南市永康區中正路301號"
      },
      {
        latitude: 22.8093283,
        longitude: 120.2536056,
        value: 1,
        Revenue: 7099183,
        length: 10,
        industry: "重工業聚落/親水聚落(石化、廢物處理、水上運輸)",
        shortname: "國精化",
        Company: "國精化學股份有限公司",
        Addr: "高雄市永安區永工五路2號"
      }
    ];

    var legend = new am4charts.Legend();
    legend.parent = chart.chartContainer;
    legend.background.fill = am4core.color("#000");
    legend.background.fillOpacity = 0.05;
    legend.width = 200;
    legend.align = "left";
    legend.data = [
      {
        name: "農食基地(農牧/食品) ",
        fill: "#ffd670"
      },
      {
        name: "重工業聚落/親水聚落(石化、廢物處理、水上運輸)",
        fill: "#e4abed"
      },
      {
        name: "傳產聚落(機械/生活產業)",
        fill: "#93e695"
      },
      {
        name: "高科技聚落(半導體/檢測/廢物處理)",
        fill: "#86cbfc"
      },
      {
        name: "傳產聚落（電子、印刷、倉儲）",
        fill: "#ffb0b0"
      },
      {
        name: "創新智樞總部(金融)",
        fill: "#9b9c9a"
      },
      {
        name: "資源採集/觀光地點(礦業/觀光)",
        fill: "#ffba66"
      }
    ];

    legend.useDefaultMarker = true;
    legend.labels.template.truncate = false;
    legend.labels.template.wrap = true;
    var marker = legend.markers.template.children.getIndex(0);
    marker.cornerRadius(14, 14, 14, 14);
    marker.width = 14;
    marker.height = 14;
    legend.fontSize = "12px";

  }
}

function main() {
    customElements.define("cameo-taiwan-map", CameoTaiwanMap);
}
