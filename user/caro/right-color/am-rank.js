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

/**
 * Chart design taken from Samsung health app
 */

var chart = am4core.create("chartdiv-rank", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.paddingRight = 40;

// var title = chart.titles.create();
// title.text = "[bold font-size: 20]台灣半導體營收排行榜";
// title.textAlign = "middle";

chart.data = [
  {
    name: "2337	旺宏",
    steps: 4.66,
    file: "img/rank-icon/10.png"
  },
  {
    name: "2408	南亞科",
    steps: 5.54,
    file: "img/rank-icon/09.png"
  },
  {
    name: "6239	力成",
    steps: 6.31,
    file: "img/rank-icon/08.png"
  },
  {
    name: "2344	華邦電",
    steps: 7.48,
    file: "img/rank-icon/07.png"
  },
  {
    name: "3034 聯詠",
    steps: 7.97,
    file: "img/rank-icon/06.png"
  },
  {
    name: "2379 瑞昱",
    steps: 8.17,
    file: "img/rank-icon/05.png"
  },
  {
    name: "2303 聯電",
    steps: 14.53,
    file: "img/rank-icon/04.png"
  },
  {
    name: "2454 聯發科",
    steps: 37.87,
    file: "img/rank-icon/03.png"
  },
  {
    name: "3711 日月光投控",
    steps: 43.93,
    file: "img/rank-icon/02.png"
  },
  {
    name: "2330 台積電",
    steps: 127.58,
    file: "img/rank-icon/01.png"
  }
];

// watermark
var watermark = chart.createChild(am4core.Label);
watermark.text = "資料來源: 工研院產科國際所[/]";
watermark.fontSize = 10;
watermark.align = "right";
watermark.valign = "bottom";
// watermark.paddingRight = 10;
watermark.fillOpacity = 0.5;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.labels.template.dx = -40;
categoryAxis.renderer.minWidth = 120;
categoryAxis.renderer.tooltip.dx = -40;
categoryAxis.fontSize = "12px";

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = true;
// valueAxis.renderer.labels.template.fillOpacity = 1;
// valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;
valueAxis.renderer.baseGrid.strokeOpacity = 0;
valueAxis.renderer.labels.template.dy = 30;
valueAxis.title.text = "億元新台幣";
valueAxis.title.align = "center";
valueAxis.title.paddingTop = 30;
valueAxis.fontSize = "12px";

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueX = "steps";
series.dataFields.categoryY = "name";
series.fill = "color";
series.tooltipText = "{valueX.value}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.dy = -30;
series.columnsContainer.zIndex = 100;

var columnTemplate = series.columns.template;
columnTemplate.height = am4core.percent(50);
columnTemplate.maxHeight = 35;
columnTemplate.column.cornerRadius(60, 10, 60, 10);
columnTemplate.strokeOpacity = 0;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.align = "center";

series.heatRules.push({
  target: columnTemplate,
  property: "fill",
  dataField: "valueX",
  max: am4core.color("#357993"),
  min: am4core.color("#4DD6C1")
});
series.mainContainer.mask = undefined;

var cursor = new am4charts.XYCursor();
chart.cursor = cursor;
cursor.lineX.disabled = true;
cursor.lineY.disabled = true;
cursor.behavior = "none";

var bullet = columnTemplate.createChild(am4charts.CircleBullet);
bullet.circle.radius = 13;
bullet.valign = "middle";
bullet.align = "left";
bullet.isMeasured = true;
bullet.interactionsEnabled = false;
bullet.horizontalCenter = "right";
bullet.interactionsEnabled = false;

var hoverState = bullet.states.create("hover");
var outlineCircle = bullet.createChild(am4core.Circle);
outlineCircle.adapter.add("radius", function (radius, target) {
  var circleBullet = target.parent;
  return circleBullet.circle.pixelRadius + 3;
});

var image = bullet.createChild(am4core.Image);
image.width = 23;
image.height = 23;
image.horizontalCenter = "middle";
image.verticalCenter = "middle";
image.propertyFields.href = "file";
// chart.legend = new am4maps.Legend();
// chart.legend.useDefaultMarker = true;

// var marker = chart.legend.markers.template.children.getIndex(0);
// marker.cornerRadius(14, 14, 14, 14);
// marker.width = 10;
// marker.height = 10;

image.adapter.add("mask", function (mask, target) {
  var circleBullet = target.parent;
  return circleBullet.circle;
});

var previousBullet;
chart.cursor.events.on("cursorpositionchanged", function (event) {
  var dataItem = series.tooltipDataItem;

  if (dataItem.column) {
    var bullet = dataItem.column.children.getIndex(1);

    if (previousBullet && previousBullet != bullet) {
      previousBullet.isHover = false;
    }

    if (previousBullet != bullet) {
      var hs = bullet.states.getKey("hover");
      hs.properties.dx = dataItem.column.pixelWidth;
      bullet.isHover = true;

      previousBullet = bullet;
    }
  }
});
