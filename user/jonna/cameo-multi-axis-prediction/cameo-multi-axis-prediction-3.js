// 2020-12-06 xxx-3 版本是週日 bowen caro 協助修改測試實線與虛線的版本

import dfjs from "https://jspm.dev/dataframe-js";
import { load_js_async, load_css } from "../cameo-common/cameo-load.js";

class CameoMultiAxisPrediction extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-multi-axis-prediction" id="${this.str_random_id}" 
        style="width: 100%; height: 500px;"></div>
    `;
    this.chart_render();
  }
  async load_data_csv() {
    let str_data_path = this.getAttribute("data");
    // let str_meta_path = this.getAttribute("meta");
    let str_url = `${window.location.href}/../${str_data_path}`;
    console.log(str_url);
    let df = await dfjs.DataFrame.fromCSV(str_url);
    df = df.transpose();
    let ary = df.toArray();
    return ary;
  }
  async chart_render() {
    let ary_data = await this.load_data_csv();
    console.log("001 ---------------");
    console.log(ary_data);
    console.log("002 ---------------");

    let i = 0;
    let ary_chart_data = [];
    for (; i < ary_data[0].length; i++) {
      let dic_data = {};
      let str_value = ary_data[3][i];
      dic_data["季度"] = ary_data[0][i];
      dic_data["產值"] = 0;
      dic_data["預測產值"] = 0;
      dic_data["年增率"] = 0;
      dic_data["預測年增率"] = 0;
      dic_data["是否為預測"] = str_value;

      if (str_value === "N") {
        dic_data["產值"] = parseFloat(ary_data[1][i]);
        dic_data["年增率"] = parseFloat(ary_data[2][i]);
        delete dic_data["預測年增率"];
      }
      if (str_value === "Y") {
        dic_data["預測產值"] = parseFloat(ary_data[1][i]);
        dic_data["預測年增率"] = parseFloat(ary_data[2][i]);
        delete dic_data["年增率"];
      }
      delete dic_data["是否為預測"];
      ary_chart_data.push(dic_data);
    }
    console.log("ary_chart_data:");
    console.log(ary_chart_data);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(this.str_random_id, am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // watermark
    var watermark = chart.createChild(am4core.Label);
    watermark.text = "資料來源: 工研院產科國際所[/]";
    watermark.fontSize = 10;
    watermark.align = "right";
    // watermark.paddingRight = 10;
    watermark.fillOpacity = 0.5;

    // 需要改寫程式碼，判斷預測與非預測
    // Data for both series

    var data = ary_chart_data;
    // var data = [
    //   {
    //     期間: "2020 Q1",
    //     產值: 4.57,
    //     年增率: -2.22
    //   },
    //   {
    //     期間: "2020 Q2",
    //     產值: 4.51,
    //     年增率: -8.37
    //   },
    //   {
    //     期間: "2020 Q3",
    //     產值: 4.79,
    //     年增率: -3.25
    //   },
    //   {
    //     期間: "2020 Q4",
    //     產值: 4.92,
    //     年增率: -2.3
    //   },
    //   {
    //     期間: "2021 Q1",
    //     預測產值: 4.73,
    //     年增率: 3.58,
    //     預測年增率: 3.58
    //   },
    //   {
    //     期間: "2021 Q2",
    //     預測產值: 4.78,
    //     預測年增率: 6.06
    //   },
    //   {
    //     期間: "2021 Q3",
    //     預測產值: 5.02,
    //     預測年增率: 4.77
    //   },
    //   {
    //     期間: "2021 Q4",
    //     預測產值: 5.15,
    //     預測年增率: 4.63
    //   }
    // ];

    /* Create axes */
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "季度";
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
    columnSeries.dataFields.categoryX = "季度";
    columnSeries.clustered = false;
    columnSeries.columns.template.tooltipText =
      "[#072448font-size: 12px]{additional}產值[/] [#072448 font-size: 12px]{valueY}[/]";
    columnSeries.columns.template.stroke = "stroke";
    columnSeries.columns.template.strokeWidth = 1.3;
    columnSeries.columns.template.stroke = am4core.color("#ffcb00");
    columnSeries.tooltip.label.textAlign = "middle";
    columnSeries.fill = am4core.color("#ffcb00");

    var column2Series = chart.series.push(new am4charts.ColumnSeries());
    column2Series.name = "預測產值";
    column2Series.dataFields.valueY = "預測產值";
    column2Series.dataFields.categoryX = "季度";
    column2Series.clustered = false;
    column2Series.columns.template.width = am4core.percent(80);
    column2Series.columns.template.tooltipText =
      "[#072448font-size: 12px]預測產值[/] [#072448 font-size: 12px]{valueY}[/]";
    column2Series.columns.template.fillOpacity = 0.4;
    column2Series.columns.template.stroke = "stroke";
    column2Series.columns.template.strokeWidth = 1.3;
    column2Series.columns.template.stroke = am4core.color("#ffcb00");
    column2Series.columns.template.strokeDasharray = 5.5;
    column2Series.tooltip.label.textAlign = "middle";
    column2Series.fill = am4core.color("#ffcb00").lighten(0.7);

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "年增率";
    lineSeries.dataFields.valueY = "年增率";
    lineSeries.dataFields.categoryX = "季度";
    lineSeries.yAxis = y2Axis;
    lineSeries.stroke = am4core.color("#ff6150");
    lineSeries.strokeWidth = 2.5;
    lineSeries.tooltip.label.textAlign = "middle";

    var line2Series = chart.series.push(new am4charts.LineSeries());
    line2Series.name = "預測年增率";
    line2Series.dataFields.valueY = "預測年增率";
    line2Series.dataFields.categoryX = "季度";
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
  }
}

customElements.define("cameo-multi-axis-prediction", CameoMultiAxisPrediction);
