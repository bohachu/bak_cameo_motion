import dfjs from "https://jspm.dev/dataframe-js";
import { load_js_async, load_css } from "../cameo-common/cameo-load.js";

class CameoMapTw extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-map-tw" id="${this.str_random_id}" 
        style="width: 100%; height: 500px;"></div>
    `;
    this.chart_render();
  }

  //2020-12-06 todo bowen 一週之內要放入共用 common
  async load_df(str_attribute) {
    const str_path = this.getAttribute(str_attribute);
    const str_url = `${window.location.href}/../${str_path}`;
    return await dfjs.DataFrame.fromCSV(str_url);
  }
  //2020-12-06 todo bowen 一週之內要放入共用 common
  async load_ary_data() {
    let df = await this.load_df("data");
    df = df.transpose();
    const ary = df.toArray();
    return ary;
  }
  //2020-12-06 todo bowen 一週之內要放入共用 common
  async load_dic_meta() {
    const df = await this.load_df("meta");
    const ary_df = df.toArray();
    let dic_meta = {};
    for (let i = 0; i < ary_df.length; i++) {
      let str_key = ary_df[i][0];
      let str_value = ary_df[i][1];
      dic_meta[str_key] = str_value;
    }
    return dic_meta;
  }
  parse_ary_chart_data(ary_data) {
    let i = 0;
    let ary_chart_data = [];
    for (; i < ary_data[0].length; i++) {
      let dic_data = {};
      dic_data["category"] = ary_data[0][i];
      dic_data["latitude"] = parseFloat(ary_data[1][i]);
      dic_data["longitude"] = parseFloat(ary_data[2][i]);
      dic_data["description"] = ary_data[3][i];
      dic_data["industry"] = ary_data[4][i];
      dic_data["value"] = parseFloat(ary_data[5][i]);
      dic_data["count"] = parseInt(ary_data[6][i]);
      dic_data["city"] = ary_data[7][i];
      ary_chart_data.push(dic_data);
    }
    return ary_chart_data;
    // console.log("ary_chart_data:");
    // console.log(ary_chart_data);
  }
  async chart_render() {
    // let ary_data = await this.load_data_csv();
    // console.log("001 ---------------");
    // console.log(ary_data);
    // console.log("002 ---------------");
    const ary_data = await this.load_ary_data();
    const dic_meta = await this.load_dic_meta();

    //針對產業描述斷行
    let length = ary_data[0].length;
    for (let i = 0; i < length; i++) {
      var t = "";
      var j = 0;
      while (j < ary_data[4][i].length) {
        t = t + ary_data[4][i].substr(j, 15) + "\n";
        j = j + 15;
      }
      ary_data[4][i] = t;
    }

    // console.log("final");
    //console.log(ary_data[4]);

    //針對描述斷行
    var des_length = ary_data[0].length;
    for (let i = 0; i < des_length; i++) {
      t = "";
      j = 0;
      while (j < ary_data[3][i].length) {
        t = t + ary_data[3][i].substr(j, 15) + "\n";
        j = j + 15;
      }
      ary_data[3][i] = t;
    }

    const ary_chart_data = this.parse_ary_chart_data(ary_data);

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
      latitude: -25,
      longitude: -20
    };

    // watermark
    var watermark = chart.createChild(am4core.Label);
    watermark.text = dic_meta["資料來源"];
    watermark.fontSize = 10;
    watermark.align = "right";
    // watermark.paddingRight = 10;
    watermark.fillOpacity = 0.5;

    chart.legend = new am4maps.Legend();
    chart.legend.position = "left";
    chart.legend.align = "left";
    chart.legend.background.fill = am4core.color("#e3f6f5");
    //chart.legend.background.fillOpacity = 0.85;
    chart.legend.width = 180;
    chart.legend.fontSize = "12px";

    chart.legend.useDefaultMarker = true;
    var marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(14, 14, 14, 14);
    marker.width = 14;
    marker.height = 14;

    // 台灣地圖
    var seriestw = chart.series.push(new am4maps.MapPolygonSeries());
    seriestw.name = "臺灣地圖";
    seriestw.geodataSource.url = "data/taiwan.json";
    seriestw.fill = am4core.color("#000");
    seriestw.fillOpacity = 0.1;
    seriestw.include = [
      "TW-KEE",
      "TW-NWT",
      "TW-ILA",
      "TW-TPE",
      "TW-TYC",
      "TW-HSQ",
      "TW-HSZ",
      "TW-MIA",
      "TW-TXG",
      "TW-CHA",
      "TW-NAN",
      "TW-YUN",
      "TW-CYQ",
      "TW-CYI",
      "TW-TNN",
      "TW-KHH",
      "TW-PIF",
      "TW-PEN",
      "TW-KIN",
      "TW-LIE",
      "TW-HUA",
      "TW-TTT"
    ];
    seriestw.mapPolygons.template.fill = am4core.color("#000");
    seriestw.mapPolygons.template.fillOpacity = 0.1;

    // 創新智樞總部及傳統聚落
    var series5 = chart.series.push(new am4maps.MapPolygonSeries());
    series5.geodataSource.url = "data/taiwan.json";
    series5.name = ary_data[0][0];
    //dic_meta["產業聚落名稱一"];
    series5.include = ["TW-KEE", "TW-NWT", "TW-ILA", "TW-TPE"];
    series5.fill = am4core.color("#4DD6C1");
    series5.mapPolygons.template.tooltipText = "{name}"; //:{number}家數
    series5.mapPolygons.template.fill = am4core.color("#4DD6C1");
    series5.tooltip.fontSize = "12px";

    // 高科技聚落
    var series4 = chart.series.push(new am4maps.MapPolygonSeries());
    series4.geodataSource.url = "data/taiwan.json";
    series4.name = ary_data[0][1];
    series4.include = ["TW-TYC", "TW-HSQ", "TW-HSZ", "TW-MIA"];
    series4.fill = am4core.color("#EAE660");
    series4.mapPolygons.template.tooltipText = "{name}"; //:{number}家數
    series4.mapPolygons.template.fill = am4core.color("#EAE660");
    series4.tooltip.fontSize = "12px";

    // 機械及生活傳產聚落
    var series3 = chart.series.push(new am4maps.MapPolygonSeries());
    series3.geodataSource.url = "data/taiwan.json";
    series3.name = ary_data[0][2];
    series3.include = ["TW-TXG", "TW-CHA", "TW-NAN"];
    series3.fill = am4core.color("#F7CB46");
    series3.mapPolygons.template.tooltipText = "{name}"; //:{number}家數
    series3.mapPolygons.template.fill = am4core.color("#F7CB46");
    series3.tooltip.fontSize = "12px";

    // 農食基地
    var series1 = chart.series.push(new am4maps.MapPolygonSeries());
    series1.geodataSource.url = "data/taiwan.json";
    series1.name = ary_data[0][3];
    series1.include = ["TW-YUN", "TW-CYQ", "TW-CYI", "TW-TNN"];
    series1.fill = am4core.color("#EEAC5D");

    var PolygonTemplate = series1.mapPolygons.template;
    PolygonTemplate.tooltipText = "{name}"; //:{number}家數
    PolygonTemplate.fill = am4core.color("#EEAC5D");
    series1.tooltip.fontSize = "12px";

    // 工業聚落親水聚落
    var series2 = chart.series.push(new am4maps.MapPolygonSeries());
    series2.geodataSource.url = "data/taiwan.json";
    series2.name = ary_data[0][4];
    series2.include = ["TW-KHH", "TW-PIF", "TW-PEN"];
    series2.fill = am4core.color("#31AFA0");
    series2.mapPolygons.template.tooltipText = "{name}"; //:{number}家數
    series2.mapPolygons.template.fill = am4core.color("#31AFA0");
    series2.tooltip.fontSize = "12px";

    // 天然資源觀光據點
    var series7 = chart.series.push(new am4maps.MapPolygonSeries());
    series7.geodataSource.url = "data/taiwan.json";
    series7.name = ary_data[0][5];
    series7.include = ["TW-HUA", "TW-TTT"];
    series7.fill = am4core.color("#8BC9BD");
    series7.mapPolygons.template.tooltipText = "{name}"; //:{number}家數
    series7.mapPolygons.template.fill = am4core.color("#8BC9BD");
    series7.tooltip.fontSize = "12px";

    // 生態觀光區
    var series6 = chart.series.push(new am4maps.MapPolygonSeries());
    series6.geodataSource.url = "data/taiwan.json";
    series6.name = ary_data[0][6];
    series6.include = ["TW-KIN", "TW-LIE"];
    series6.fill = am4core.color("#357993");
    series6.mapPolygons.template.tooltipText = "{name}"; //:{number}家數
    series6.mapPolygons.template.fill = am4core.color("#357993");
    series6.tooltip.fontSize = "12px";

    // 產業聚落 Pins
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.name = "聚落介紹";
    var imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.nonScaling = true;
    imageTemplate.tooltipText = "{description}\n\n主要產業：\n{industry}";

    imageSeries.tooltip.animationDuration = 0;
    imageSeries.tooltip.showInViewport = false;
    imageSeries.tooltip.background.fillOpacity = 0.2;
    imageSeries.tooltip.getStrokeFromObject = true;
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.background.fillOpacity = 0.65;
    imageSeries.tooltip.background.fill = am4core.color("#000000");
    imageSeries.tooltip.fontSize = "13px";

    // Creating a pin bullet
    var pin = imageTemplate.createChild(am4plugins_bullets.PinBullet);

    // Colors
    var color1 = am4core.color("#0a3336");

    // Configuring pin appearance
    pin.background.fill = color1;
    pin.background.pointerBaseWidth = 1;
    pin.background.pointerLength = 20;
    pin.background.propertyFields.pointerLength = 10;
    pin.circle.fill = pin.background.fill;

    //var color22 = am4core.color("#ed4e4e");
    var weight = dic_meta["產業聚落標籤字體"];
    var color = dic_meta["產業聚落公司家數文字顏色"];
    var size = dic_meta["產業聚落產值文字大小"];

    var text =
      "[" +
      weight +
      "]" +
      "{category}[/]\n[" +
      color +
      "]{count}家\n[font-size:" +
      size +
      "]({value}億元)[/]";

    var label = pin.createChild(am4core.Label);
    label.fontSize = "13px";
    label.text = text;
    //"[bold]{category}[/]\n[#ed4e4e]{count}家\n[font-size: 10]({value}億元)[/]";
    label.propertyFields.dy = 10;
    label.propertyFields.dx = -5;
    label.verticalCenter = "middle";
    label.fill = am4core.color("#242323");
    label.adapter.add("dy", function (dy) {
      return (5 + dy) * -1;
    });

    // Creating a "heat rule" to modify "radius" of the bullet based
    // on value in data
    imageSeries.heatRules.push({
      target: pin.background,
      property: "radius",
      min: 5,
      max: 10,
      dataField: dic_meta["產業聚落泡泡大小(資料來源)"]
    });

    imageSeries.heatRules.push({
      target: label,
      property: "dx",
      min: 8,
      max: 15,
      dataField: dic_meta["產業聚落泡泡大小(資料來源)"]
    });

    // Pin data
    imageSeries.data = ary_chart_data;
    /*
    imageSeries.data = [
      {
        latitude: 25.0661064,
        longitude: 121.481374,
        category: "創新智樞總部及傳統聚落",
        description:
          "國際經貿重鎮，扮演經濟創新領頭羊角色，\n串聯各縣市特殊元素，打造區域為主要經貿核\n心、宜居永續都會、國際企業首選",
        industry:
          "證券金融、管顧、科學技術服務、\n資料及資訊服務、電腦設計、電子零組件製造\n、印刷、倉儲等",
        count: 470391,
        value: 100949
      },
      {
        latitude: 24.55,
        longitude: 121,
        category: "高科技聚落",
        description:
          "以客家文化為基底，電子與生技產業的科技元\n素為發展特色，為一既傳統又現代的生活圈",
        industry: "資通訊、檢測、廢物處理、電子零\n組件等",
        count: 188785,
        value: 66863
      },
      {
        latitude: 23.93,
        longitude: 120.65,
        category: "機械及生活傳產聚落",
        description:
          "國際級精密機械聚落，並具多元生活產業，\n近年串聯區域觀光與產業活動，成為中臺灣\n國際大都會",
        industry:
          "機械、金屬製品、皮革、毛皮及\n其製品製造、其他運輸工具及其零件製造、\n家具、紡織、木竹等",
        count: 280427,
        value: 50547
      },
      {
        latitude: 23.333609077319028,
        longitude: 120.24447256869583,
        category: "農食基地",
        description:
          "有深厚傳統文化基底，扮演著臺灣大糧倉的角\n色，將來朝先進農業重要發展基地邁進",
        industry: "農、牧業、食品製造、石油及煤製\n品、化學材料等",
        count: 183711,
        value: 39077
      },
      {
        latitude: 22.6093283,
        longitude: 120.3536056,
        category: "工業聚落親水聚落",
        description:
          "在既有能源、生技、金屬產業基礎上，發展海\n洋與陽光相關產業，發揮海洋文化特色，扮演\n臺灣重要的國際門戶",
        industry: "化學材料、基本金屬、汙染整治、\n水上運輸、漁業等",
        count: 213612,
        value: 39577
      },
      {
        latitude: 23.43054,
        longitude: 121.29746,
        category: "天然資源觀光據點",
        description:
          "以「觀光美地、繁榮家園」為願景，為生態資\n源和休閒旅遊勝地，友善利用獨特的珍貴資源，\n為世代居民創造優質生活空間",
        industry: "礦及土石、非金屬礦物製品、觀光\n(住宿服務、休閒服務)等",
        count: 30071,
        value: 2324
      },
      {
        latitude: 24.4322,
        longitude: 118.3741,
        category: "生態觀光區",
        description:
          "對外為永續觀光勝地，對內為幸福宜居環境，\n善用在地特色推動智慧低碳觀光",
        industry: "航空運輸、水上運輸、住宿服務等",
        count: 4296,
        value: 493
      }
      
    ];
    */
  }
}

customElements.define("cameo-map-tw", CameoMapTw);
