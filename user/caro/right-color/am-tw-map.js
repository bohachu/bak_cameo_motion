/**
   * ---------------------------------------
   * This demo was created using amCharts 4.
   *
   * For more information visit:
   * https://www.amcharts.com/
   *
   * Documentation is available at:
   * https://www.amcharts.com/docs/v4/
   * ---------------------------------------
   src="https://cdn.amcharts.com/lib/4/geodata/usaLow.js"
   src="https://cdn.amcharts.com/lib/4/geodata/chinaLow.js"
   */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("chartdiv-tw-map", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldHigh;

// Set projection
chart.projection = new am4maps.projections.Miller();

chart.homeGeoPoint = {
  latitude: 0,
  longitude: -110
};

// watermark
var watermark = chart.createChild(am4core.Label);
watermark.text = "資料來源: 工研院產科國際所[/]";
watermark.fontSize = 10;
watermark.align = "right";
watermark.valign = "bottom";
// watermark.paddingRight = 10;
watermark.fillOpacity = 0.5;

// 農食基地
var series1 = chart.series.push(new am4maps.MapPolygonSeries());
series1.geodataSource.url = "data/taiwan.json";
//series1.useGeodata = true;
series1.name = "農食基地(農牧/食品)";
series1.include = ["TW-YUN", "TW-CYQ", "TW-CYI", "TW-TNN"];
series1.fill = am4core.color("#EEAC5D");
var PolygonTemplate = series1.mapPolygons.template;
PolygonTemplate.tooltipText = "{name}";
PolygonTemplate.fill = am4core.color("#EEAC5D");
series1.tooltip.fontSize = "12px";

// 重工業聚落
var series2 = chart.series.push(new am4maps.MapPolygonSeries());
series2.geodataSource.url = "data/taiwan.json";
//series2.useGeodata = true;
series2.name = "重工業聚落/親水聚落(石化、廢物處理、水上運輸)";
series2.include = ["TW-KHH", "TW-PIF"];
series2.fill = am4core.color("#357993");
series2.mapPolygons.template.tooltipText = "{name}";
series2.mapPolygons.template.fill = am4core.color("#357993");
series2.tooltip.fontSize = "12px";

// 傳產聚落
var series3 = chart.series.push(new am4maps.MapPolygonSeries());
series3.geodataSource.url = "data/taiwan.json";
//series3.useGeodata = true;
series3.name = "傳產聚落(機械/生活產業)";
series3.include = ["TW-TXG", "TW-CHA", "TW-NAN"];
series3.fill = am4core.color("#F7CB46");
series3.mapPolygons.template.tooltipText = "{name}";
series3.mapPolygons.template.fill = am4core.color("#F7CB46");
series3.tooltip.fontSize = "12px";

// 高科技聚落
var series4 = chart.series.push(new am4maps.MapPolygonSeries());
series4.geodataSource.url = "data/taiwan.json";
//series4.useGeodata = true;
series4.name = "高科技聚落(半導體/檢測/廢物處理)";
series4.include = ["TW-TYC", "TW-HSQ", "TW-HSZ", "TW-MIA"];
series4.fill = am4core.color("#EAE660");
series4.mapPolygons.template.tooltipText = "{name}";
series4.mapPolygons.template.fill = am4core.color("#EAE660");
series4.tooltip.fontSize = "12px";

// 傳產聚落（電子、印刷、倉儲）
var series5 = chart.series.push(new am4maps.MapPolygonSeries());
series5.geodataSource.url = "data/taiwan.json";
//series5.useGeodata = true;
series5.name = "傳產聚落（電子、印刷、倉儲）";
series5.include = ["TW-KEE", "TW-NWT", "TW-ILA"];
series5.fill = am4core.color("#4DD6C1");
series5.mapPolygons.template.tooltipText = "{name}";
series5.mapPolygons.template.fill = am4core.color("#4DD6C1");
series5.tooltip.fontSize = "12px";

// 創新智樞總部(金融)
var series6 = chart.series.push(new am4maps.MapPolygonSeries());
series6.geodataSource.url = "data/taiwan.json";
//series6.useGeodata = true;
series6.name = "創新智樞總部(金融)";
series6.include = ["TW-TPE"];
series6.fill = am4core.color("#8BC9BD");
series6.mapPolygons.template.tooltipText = "{name}";
series6.mapPolygons.template.fill = am4core.color("#8BC9BD");
series6.tooltip.fontSize = "12px";

// 資源採集/觀光地點
var series7 = chart.series.push(new am4maps.MapPolygonSeries());
series7.geodataSource.url = "data/taiwan.json";
//series7.useGeodata = true;
series7.name = "資源採集/觀光地點(礦業/觀光)";
series7.include = ["TW-HUA", "TW-TTT"];
series7.fill = am4core.color("#31AFA0");
series7.mapPolygons.template.tooltipText = "{name}";
series7.mapPolygons.template.fill = am4core.color("#31AFA0");
series7.tooltip.fontSize = "12px";

// Pins
var imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.name = "公司";
var imageTemplate = imageSeries.mapImages.template;
imageTemplate.propertyFields.longitude = "longitude";
imageTemplate.propertyFields.latitude = "latitude";
imageTemplate.nonScaling = true;
imageTemplate.tooltipText =
  "產業：{industry}\n地址：{Addr}\n營業額：${Revenue}";
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
var colorpin = am4core.color("#3F3F3F");

// Configuring pin appearance
pin.background.fill = colorpin;
pin.background.pointerBaseWidth = 1;
pin.background.pointerLength = 250;
pin.background.propertyFields.pointerLength = "length";
pin.circle.fill = pin.background.fill;

var label = pin.createChild(am4core.Label);
label.text = "{Company}";
label.fontWeight = "bold";
label.fontSize = "12px";
label.propertyFields.dy = "length";
label.propertyFields.dx = 0;
label.verticalCenter = "middle";
label.fill = colorpin;
// #0a3336
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
  min: 10,
  max: 20,
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
    latitude: 22.5,
    longitude: 120.9,
    value: 1,
    Revenue: 5369504,
    length: 10,
    industry: "資源採集/觀光地點（礦業/觀光）",
    Company: "雨田家",
    Addr: "台東市長安街23號"
  },
  {
    latitude: 24.8,
    longitude: 121,
    value: 1,
    Revenue: 1026000000000,
    length: 10,
    industry: "高科技聚落(半導體/檢測/廢物處理)",
    Company: "台積電",
    Addr: "新竹市東區研新一路9號"
  },
  {
    latitude: 24.9661064,
    longitude: 121.421374,
    value: 1,
    Revenue: 205200000000000,
    length: 10,
    industry: "傳產聚落（電子、印刷、倉儲）",
    Company: "鴻海",
    Addr: "新北市土城區自由街2號"
  },
  {
    latitude: 25.1256549,
    longitude: 121.4707667,
    value: 1,
    Revenue: 1100000000000,
    length: 10,
    industry: "創新智樞總部(金融)",
    Company: "和碩",
    Addr: "台北市北投區立功街96號"
  },
  {
    latitude: 24.1,
    longitude: 120.6,
    value: 1,
    Revenue: 18912907,
    length: 10,
    industry: "傳產聚落(機械/生活產業)",
    Company: "傢櫥",
    Addr: "台中市南屯區文心路一段498號"
  },
  {
    latitude: 23.5,
    longitude: 120.5,
    value: 1,
    Revenue: 7087183,
    length: 10,
    industry: "農食基地(農牧/食品)",
    Company: "福義軒",
    Addr: "嘉義市西區成功街98號"
  },
  {
    latitude: 23,
    longitude: 120.3,
    value: 1,
    Revenue: 7099183,
    length: 10,
    industry: "農食基地(農牧/食品)",
    Company: "明新食品",
    Addr: "台南市南區新樂路56之1號"
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
    name: "高科技聚落(半導體/檢測/廢物處理)",
    fill: "#EAE660"
  },
  {
    name: "傳產聚落(機械/生活產業)",
    fill: "#F7CB46"
  },
  {
    name: "農食基地(農牧/食品) ",
    fill: "#EEAC5D"
  },
  {
    name: "重工業聚落/親水聚落(石化、廢物處理、水上運輸)",
    fill: "#357993"
  },
  {
    name: "資源採集/觀光地點(礦業/觀光)",
    fill: "#31AFA0"
  },
  {
    name: "傳產聚落（電子、印刷、倉儲）",
    fill: "#4DD6C1"
  },
  {
    name: "創新智樞總部(金融)",
    fill: "#8BC9BD"
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

/*
// Set Legend
chart.legend = new am4maps.Legend();
chart.legend.useDefaultMarker = true;
var marker = chart.legend.markers.template.children.getIndex(0);
marker.cornerRadius(14, 14, 14, 14);
marker.width = 14;
marker.height = 14;
//外框線
//marker.strokeWidth = 2;
//marker.strokeOpacity = 1;
//marker.stroke = am4core.color("#ccc");
chart.legend.position = "left";
chart.legend.align = "left";
chart.legend.labels.template.truncate = false;
chart.legend.labels.template.wrap = true;
//chart.legend.labels.template.maxWidth = 150;
chart.legend.maxWidth = 200;
chart.legend.fontSize = "12px";
*/
