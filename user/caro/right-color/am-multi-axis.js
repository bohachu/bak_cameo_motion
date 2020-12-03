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
var chart = am4core.create("chartdiv-multi-axis", am4charts.XYChart);

// Export
chart.exporting.menu = new am4core.ExportMenu();

// watermark
var watermark = chart.createChild(am4core.Label);
watermark.text = "資料來源: 工研院產科國際所[/]";
watermark.fontSize = 10;
watermark.align = "right";
// watermark.paddingRight = 10;
watermark.fillOpacity = 0.5;

// Data for both series
var data = [
  {
    期間: "2020 Q1",
    產值: 4.57,
    年增率: -2.22
  },
  {
    期間: "2020 Q2",
    產值: 4.51,
    年增率: -8.37
  },
  {
    期間: "2020 Q3",
    產值: 4.79,
    年增率: -3.25
  },
  {
    期間: "2020 Q4",
    產值: 4.92,
    年增率: -2.3
  },
  {
    期間: "2021 Q1",
    預測產值: 4.73,
    年增率: 3.58,
    預測年增率: 3.58
  },
  {
    期間: "2021 Q2",
    預測產值: 4.78,
    預測年增率: 6.06
  },
  {
    期間: "2021 Q3",
    預測產值: 5.02,
    預測年增率: 4.77
  },
  {
    期間: "2021 Q4",
    預測產值: 5.15,
    預測年增率: 4.63
  }
];

/* Create axes */
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "期間";
// categoryAxis.renderer.minGridDistance = 30;
categoryAxis.fontSize = "12px";

/* Create value axis */
var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
yAxis.min = 0;
yAxis.title.text = "兆台幣";
// yAxis.title.fontWeight = "bold";
yAxis.title.fontSize = 12;
yAxis.renderer.labels.template.fontSize = 12;

var y2Axis = chart.yAxes.push(new am4charts.ValueAxis());
y2Axis.title.text = "年增率 %";
y2Axis.title.fontSize = 12;
// Add percent sign to all numbers
// y2Axis.numberFormatter.numberFormat = "#.#'%'";
y2Axis.renderer.labels.template.fontSize = 12;
//x2Axis.renderer.grid.template.disabled = true;
y2Axis.renderer.opposite = true;
y2Axis.syncWithAxis = yAxis;

/* Create series */
var columnSeries = chart.series.push(new am4charts.ColumnSeries());
columnSeries.name = "產值";
columnSeries.dataFields.valueY = "產值";
columnSeries.dataFields.categoryX = "期間";
columnSeries.clustered = false;
columnSeries.columns.template.tooltipText =
  "[#072448font-size: 12px]{additional}產值[/] [#072448 font-size: 12px]{valueY}[/]";
columnSeries.columns.template.stroke = "stroke";
columnSeries.columns.template.strokeWidth = 1.3;
columnSeries.columns.template.stroke = am4core.color("#F7CB46");
columnSeries.tooltip.label.textAlign = "middle";
columnSeries.fill = am4core.color("#F7CB46");

var column2Series = chart.series.push(new am4charts.ColumnSeries());
column2Series.name = "預測產值";
column2Series.dataFields.valueY = "預測產值";
column2Series.dataFields.categoryX = "期間";
column2Series.clustered = false;
column2Series.columns.template.width = am4core.percent(80);
column2Series.columns.template.tooltipText =
  "[#072448font-size: 12px]預測產值[/] [#072448 font-size: 12px]{valueY}[/]";
column2Series.columns.template.fillOpacity = 0.4;
column2Series.columns.template.stroke = "stroke";
column2Series.columns.template.strokeWidth = 1.3;
column2Series.columns.template.stroke = am4core.color("#F7CB46");
column2Series.columns.template.strokeDasharray = 5.5;
column2Series.tooltip.label.textAlign = "middle";
column2Series.fill = am4core.color("#F7CB46").lighten(0.7);

var lineSeries = chart.series.push(new am4charts.LineSeries());
lineSeries.name = "年增率";
lineSeries.dataFields.valueY = "年增率";
lineSeries.dataFields.categoryX = "期間";
lineSeries.yAxis = y2Axis;
lineSeries.stroke = am4core.color("#ff6150");
lineSeries.strokeWidth = 2.5;
lineSeries.tooltip.label.textAlign = "middle";

var line2Series = chart.series.push(new am4charts.LineSeries());
line2Series.name = "預測年增率";
line2Series.dataFields.valueY = "預測年增率";
line2Series.dataFields.categoryX = "期間";
line2Series.yAxis = y2Axis;
line2Series.stroke = am4core.color("#ff6150");
line2Series.strokeWidth = 2.5;
line2Series.strokeDasharray = 5.5;
line2Series.tooltip.label.textAlign = "middle";

chart.legend = new am4charts.Legend();
chart.legend.position = "buttom";
chart.legend.fontSize = "12px";
// chart.legend.useDefaultMarker = true;
// var marker = chart.legend.markers.template.children.getIndex(0);
// marker.width = 18;
// marker.height = 18;
columnSeries.name = "產值（兆台幣）";
column2Series.name = "預測產值（兆台幣）";
lineSeries.name = "年增率 %";
line2Series.name = "預測年增率 %";
lineSeries.yAxis = y2Axis;

var bullet = lineSeries.bullets.push(new am4charts.Bullet());
bullet.fill = am4core.color("#ff6150");
bullet.tooltipText =
  "[#072448font-size: 12px]{additional}年增率[/] [#072448 font-size: 12px]{valueY}%[/]";
var circle = bullet.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#ff6150");
circle.strokeWidth = 2;

var bullet = line2Series.bullets.push(new am4charts.Bullet());
bullet.fill = am4core.color("#ff6150");
bullet.tooltipText =
  "[#072448font-size: 12px]預測年增率[/] [#072448 font-size: 12px]{valueY}%[/]";
var circle = bullet.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#ffffff");
circle.strokeWidth = 2;

chart.data = data;
