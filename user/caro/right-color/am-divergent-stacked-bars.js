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
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv-divergent-bar", am4charts.XYChart);

// Title
// var title = chart.titles.push(new am4core.Label());
// title.text = "臺灣產業產值與同期比較：可關注新興能源產值";
// title.fontSize = 25;
// title.marginBottom = 15;

// watermark
var watermark = chart.createChild(am4core.Label);
watermark.text = "資料來源: 工研院產科國際所[/]";
watermark.fontSize = 10;
watermark.align = "right";
// watermark.paddingRight = 10;
watermark.fillOpacity = 0.5;

// Add data
chart.data = [
  {
    category: "新興能源產值",
    negative1: 0,
    negative2: 0,
    positive1: 0,
    positive2: 21
  },
  {
    category: "醫療器材產值",
    negative1: 0,
    negative2: 0,
    positive1: 0,
    positive2: 18
  },
  {
    category: "半導體產值",
    negative1: 0,
    negative2: 0,
    positive1: 10,
    positive2: 0
  },
  {
    category: "汽機車產值",
    negative1: 0,
    negative2: 0,
    positive1: 0,
    positive2: 0
  },
  {
    category: "顯示器產值",
    negative1: 0,
    negative2: -1,
    positive1: 0,
    positive2: 0
  },
  {
    category: "電子材料產值",
    negative1: 0,
    negative2: -1,
    positive1: 0,
    positive2: 0
  },
  {
    category: "製造業產值",
    negative1: 0,
    negative2: -2,
    positive1: 0,
    positive2: 0
  },
  {
    category: "特化產值",
    negative1: 0,
    negative2: -3,
    positive1: 0,
    positive2: 0
  },
  {
    category: "通訊產值",
    negative1: 0,
    negative2: -8,
    positive1: 0,
    positive2: 0
  },
  {
    category: "機械產值",
    negative1: 0,
    negative2: -8,
    positive1: 0,
    positive2: 0
  },
  {
    category: "石化產值",
    negative1: -23,
    negative2: 0,
    positive1: 0,
    positive2: 0
  }
];

// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.axisFills.template.disabled = false;
categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;
categoryAxis.renderer.labels.template.fontSize = 12;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = -25;
valueAxis.max = 25;
valueAxis.renderer.minGridDistance = 50;
valueAxis.renderer.ticks.template.length = 5;
valueAxis.renderer.ticks.template.disabled = false;
valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
valueAxis.renderer.labels.template.adapter.add("text", function (text) {
  return text + "%";
});
valueAxis.renderer.labels.template.fontSize = 12;

// Legend
chart.legend = new am4charts.Legend();
chart.legend.position = "bottom";
chart.legend.fontSize = "12px";
chart.legend.useDefaultMarker = true;
var marker = chart.legend.markers.template.children.getIndex(0);
// marker.cornerRadius(14, 14, 14, 14);
marker.width = 18;
marker.height = 18;

// Use only absolute numbers
chart.numberFormatter.numberFormat = "#.#s";

// Create series
function createSeries(field, name, color) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "category";
  series.stacked = true;
  series.name = name;
  series.stroke = color;
  series.fill = color;

  var label = series.bullets.push(new am4charts.LabelBullet());
  label.label.text = "{valueX}%";
  label.label.fill = am4core.color("#fff");
  label.label.strokeWidth = 0;
  label.label.truncate = false;
  label.label.hideOversized = true;
  label.locationX = 0.5;
  return series;
}

var interfaceColors = new am4core.InterfaceColorSet();
// var positiveColor = interfaceColors.getFor("positive");
var positiveColor = am4core.color("#EEAC5D");
var negativeColor = am4core.color("#4DD6C1");

createSeries("positive2", "上漲 > 10%", positiveColor);
createSeries("positive1", "上漲 < 10%", positiveColor.lighten(0.5));
createSeries("negative2", "下跌 < 10% ", negativeColor.lighten(0.5));
createSeries("negative1", "下跌 > 10%", negativeColor);

// chart.legend.events.on("layoutvalidated", function (event) {
//   chart.legend.itemContainers.each((container) => {
//     if (container.dataItem.dataContext.name == "Never") {
//       container.toBack();
//     }
//   });
// });
