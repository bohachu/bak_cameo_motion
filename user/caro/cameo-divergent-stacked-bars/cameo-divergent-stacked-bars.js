import dfjs from "https://jspm.dev/dataframe-js";
import { load_js_async, load_css } from "../cameo-common/cameo-load.js";

class CameoDivergentStackedBars extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-divergent-stacked-bars" id="${this.str_random_id}" 
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

  //2020-12-06 caro 專屬於本動圖的解析程式碼
  parse_ary_chart_data(ary_data) {
    let ary_chart_data = [];
    for (let i = 0; i < ary_data[0].length; i++) {
      let dic_data = {};
      let flo_value = parseFloat(ary_data[1][i]);
      dic_data["category"] = ary_data[0][i];
      dic_data["negative1"] = 0;
      dic_data["negative2"] = 0;
      dic_data["positive1"] = 0;
      dic_data["positive2"] = 0;
      if (flo_value < -10) {
        dic_data["negative1"] = flo_value;
      }
      if (flo_value >= -10 && flo_value < 0) {
        dic_data["negative2"] = flo_value;
      }
      if (flo_value > 0 && flo_value <= 10) {
        dic_data["positive1"] = flo_value;
      }
      if (flo_value > 10) {
        dic_data["positive2"] = flo_value;
      }
      ary_chart_data.push(dic_data);
    }
    return ary_chart_data;
  }
  async chart_render() {
    //2020-12-06 caro 專屬於本動圖的：總資料準備
    const ary_data = await this.load_ary_data();
    const dic_meta = await this.load_dic_meta();
    const ary_chart_data = this.parse_ary_chart_data(ary_data);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // amcharts License
    am4core.addLicense("CH1234567");
    // Create chart instance
    var chart = am4core.create(this.str_random_id, am4charts.XYChart);

    // Title
    var title = chart.titles.push(new am4core.Label());
    // title.text = "臺灣產業產值與同期比較：可關注新興能源產值";
    title.text = dic_meta["圖表標題"];
    title.fontSize = 25;
    title.marginBottom = 15;

    // watermark
    var watermark = chart.createChild(am4core.Label);
    watermark.text = dic_meta["資料來源"];
    watermark.fontSize = 10;
    watermark.align = "right";
    // watermark.paddingRight = 10;
    watermark.fillOpacity = 0.5;

    // Add data
    chart.data = ary_chart_data;
    // [
    //   {
    //     category: "新興能源產值",
    //     negative1: 0,
    //     negative2: 0,
    //     positive1: 0,
    //     positive2: 21
    //   },
    //   {
    //     category: "醫療器材產值",
    //     negative1: 0,
    //     negative2: 0,
    //     positive1: 0,
    //     positive2: 18
    //   },
    //   {
    //     category: "半導體產值",
    //     negative1: 0,
    //     negative2: 0,
    //     positive1: 10,
    //     positive2: 0
    //   },
    //   {
    //     category: "汽機車產值",
    //     negative1: 0,
    //     negative2: 0,
    //     positive1: 0,
    //     positive2: 0
    //   },
    //   {
    //     category: "顯示器產值",
    //     negative1: 0,
    //     negative2: -1,
    //     positive1: 0,
    //     positive2: 0
    //   },
    //   {
    //     category: "電子材料產值",
    //     negative1: 0,
    //     negative2: -1,
    //     positive1: 0,
    //     positive2: 0
    //   },
    //   {
    //     category: "製造業產值",
    //     negative1: 0,
    //     negative2: -2,
    //     positive1: 0,
    //     positive2: 0
    //   },
    //   {
    //     category: "特化產值",
    //     negative1: 0,
    //     negative2: -3,
    //     positive1: 0,
    //     positive2: 0
    //   },
    //   {
    //     category: "通訊產值",
    //     negative1: 0,
    //     negative2: -8,
    //     positive1: 0,
    //     positive2: 0
    //   },
    //   {
    //     category: "機械產值",
    //     negative1: 0,
    //     negative2: -8,
    //     positive1: 0,
    //     positive2: 0
    //   },
    //   {
    //     category: "石化產值",
    //     negative1: -23,
    //     negative2: 0,
    //     positive1: 0,
    //     positive2: 0
    //   }
    // ];

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
    valueAxis.min = parseFloat(dic_meta["X軸顯示最小值"]);
    valueAxis.max = parseFloat(dic_meta["X軸顯示最大值"]);
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

    var positiveColor = am4core.color(dic_meta["強烈正值顏色"]);
    var negativeColor = am4core.color(dic_meta["強烈負值顏色"]);

    createSeries("positive2", dic_meta["強烈正值名稱"], positiveColor);
    createSeries("positive1", dic_meta["正值名稱"], positiveColor.lighten(0.5));
    createSeries("negative2", dic_meta["負值名稱"], negativeColor.lighten(0.5));
    createSeries("negative1", dic_meta["強烈負值名稱"], negativeColor);
  }
}

customElements.define(
  "cameo-divergent-stacked-bars",
  CameoDivergentStackedBars
);

  }
}

customElements.define(
  "cameo-divergent-stacked-bars",
  CameoDivergentStackedBars
);
