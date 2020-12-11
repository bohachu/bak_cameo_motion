import dfjs from "https://jspm.dev/dataframe-js";
import { load_js_async, load_css } from "../cameo-common/cameo-load.js";

class CameoLine extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-line" id="${this.str_random_id}" 
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

  // async chart_render() {
  //   let ary_data = await this.load_data_csv();
  //   console.log("001 ---------------");
  //   console.log(ary_data);
  //   console.log("002 ---------------");

  //2020-12-06 caro 專屬於本動圖的解析程式碼
  parse_ary_chart_data(ary_data) {
    let i = 0;
    let ary_chart_data = [];
    for (; i < ary_data[0].length; i++) {
      let dic_data = {};
      dic_data["year"] = ary_data[0][i];
      dic_data["中華民國"] = parseFloat(ary_data[1][i]);
      dic_data["美國"] = parseFloat(ary_data[2][i]);
      dic_data["日本"] = parseFloat(ary_data[3][i]);
      dic_data["德國"] = parseFloat(ary_data[4][i]);
      dic_data["法國"] = parseFloat(ary_data[5][i]);
      dic_data["英國"] = parseFloat(ary_data[6][i]);
      dic_data["新加坡"] = parseFloat(ary_data[7][i]);
      dic_data["韓國"] = parseFloat(ary_data[8][i]);
      dic_data["香港"] = parseFloat(ary_data[9][i]);
      dic_data["中國大陸"] = parseFloat(ary_data[10][i]);
      ary_chart_data.push(dic_data);
    }
    return ary_chart_data;
    // console.log("ary_chart_data:");
    // console.log(ary_chart_data);
  }

  async chart_render() {
    //2020-12-06 caro 專屬於本動圖的：總資料準備
    const ary_data = await this.load_ary_data();
    const dic_meta = await this.load_dic_meta();
    const ary_chart_data = this.parse_ary_chart_data(ary_data);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(this.str_random_id, am4charts.XYChart);

    // watermark
    var watermark = chart.createChild(am4core.Label);
    watermark.text = dic_meta["資料來源"];
    watermark.fontSize = 10;
    watermark.align = "right";
    // watermark.paddingRight = 10;
    watermark.fillOpacity = 0.5;

    // Add data
    chart.data = ary_chart_data;
    /*
    chart.data = [
      {
        year: "2012",
        中華民國: 4955,
        美國: 161970,
        日本: 62032,
        德國: 35273,
        法國: 26838,
        英國: 26862,
        中國大陸: 85322,
        韓國: 12224,
        新加坡: 2916,
        香港: 2626
      },
      {
        year: "2013",
        中華民國: 5130,
        美國: 167849,
        日本: 51555,
        德國: 37327,
        法國: 28111,
        英國: 27881,
        中國大陸: 95705,
        韓國: 13708,
        新加坡: 3076,
        香港: 2757
      },
      {
        year: "2014",
        中華民國: 5353,
        美國: 175273,
        日本: 48506,
        德國: 38839,
        法國: 28522,
        英國: 30674,
        中國大陸: 104385,
        韓國: 14843,
        新加坡: 3149,
        香港: 2915
      },
      {
        year: "2015",
        中華民國: 5345,
        美國: 182248,
        日本: 43896,
        德國: 33606,
        法國: 24382,
        英國: 29309,
        中國大陸: 110156,
        韓國: 14658,
        新加坡: 3080,
        香港: 3094
      },
      {
        year: "2016",
        中華民國: 5430,
        美國: 187150,
        日本: 49227,
        德國: 34668,
        法國: 24713,
        英國: 27049,
        中國大陸: 111380,
        韓國: 15001,
        新加坡: 3186,
        香港: 3208
      },
      {
        year: "2017",
        中華民國: 5908,
        美國: 195194,
        日本: 48667,
        德國: 36568,
        法國: 25863,
        英國: 26662,
        中國大陸: 121436,
        韓國: 16239,
        新加坡: 3419,
        香港: 3412
      },
      {
        year: "2018",
        中華民國: 6082,
        美國: 205802,
        日本: 49549,
        德國: 39476,
        法國: 26595,
        英國: 28607,
        中國大陸: 136082,
        韓國: 17206,
        新加坡: 3732,
        香港: 3617
      },
      {
        year: "2019",
        中華民國: 6113,
        美國: 214277,
        日本: 50818,
        德國: 38463,
        法國: 27080,
        英國: 28271,
        中國大陸: 143429,
        韓國: 16422,
        新加坡: 3721,
        香港: 3660
      }
    ];
    */

    // Create category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.fontSize = "12px";
    // categoryAxis.renderer.opposite = true;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inversed = false;
    valueAxis.title.text = dic_meta["左側 Y 軸標題"];
    valueAxis.renderer.minLabelPosition = 0.01;
    valueAxis.fontSize = "12px";

    // Create series
    // var tooltipText = "{name}：{valueY} 億美元";
    var tooltipText = "{name}";
    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "美國";
    series1.dataFields.categoryX = "year";
    series1.name = "美國";
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = tooltipText;
    series1.tooltip.fontSize = "10px";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;
    series1.fill = am4core.color("#EEAC5D");
    series1.stroke = am4core.color("#EEAC5D");

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "中國大陸";
    series2.dataFields.categoryX = "year";
    series2.name = "中國大陸";
    series2.bullets.push(new am4charts.CircleBullet());
    series2.tooltipText = tooltipText;
    series2.tooltip.fontSize = "10px";
    series2.legendSettings.valueText = "{valueY}";
    series2.visible = false;
    series2.fill = am4core.color("#F7CB46");
    series2.stroke = am4core.color("#F7CB46");

    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "日本";
    series3.dataFields.categoryX = "year";
    series3.name = "日本";
    series3.bullets.push(new am4charts.CircleBullet());
    series3.tooltipText = tooltipText;
    series3.tooltip.fontSize = "10px";
    series3.legendSettings.valueText = "{valueY}";
    series3.visible = false;
    series3.fill = am4core.color("#EAE660");
    series3.stroke = am4core.color("#EAE660");

    var series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = "德國";
    series4.dataFields.categoryX = "year";
    series4.name = "德國";
    series4.bullets.push(new am4charts.CircleBullet());
    series4.tooltipText = tooltipText;
    series4.tooltip.fontSize = "10px";
    series4.legendSettings.valueText = "{valueY}";
    series4.visible = false;
    series4.fill = am4core.color("#8BC9BD");
    series4.stroke = am4core.color("#8BC9BD");

    var series5 = chart.series.push(new am4charts.LineSeries());
    series5.dataFields.valueY = "英國";
    series5.dataFields.categoryX = "year";
    series5.name = "英國";
    series5.bullets.push(new am4charts.CircleBullet());
    series5.tooltipText = tooltipText;
    series5.tooltip.fontSize = "10px";
    series5.legendSettings.valueText = "{valueY}";
    series5.visible = false;
    series5.fill = am4core.color("#4DD6C1");
    series5.stroke = am4core.color("#4DD6C1");

    var series6 = chart.series.push(new am4charts.LineSeries());
    series6.dataFields.valueY = "法國";
    series6.dataFields.categoryX = "year";
    series6.name = "法國";
    series6.bullets.push(new am4charts.CircleBullet());
    series6.tooltipText = tooltipText;
    series6.tooltip.fontSize = "10px";
    series6.legendSettings.valueText = "{valueY}";
    series6.visible = false;
    series6.fill = am4core.color("#31AFA0");
    series6.stroke = am4core.color("#31AFA0");

    var series7 = chart.series.push(new am4charts.LineSeries());
    series7.dataFields.valueY = "韓國";
    series7.dataFields.categoryX = "year";
    series7.name = "韓國";
    series7.bullets.push(new am4charts.CircleBullet());
    series7.tooltipText = tooltipText;
    series7.tooltip.fontSize = "10px";
    series7.legendSettings.valueText = "{valueY}";
    series7.visible = false;
    series7.fill = am4core.color("#357993");
    series7.stroke = am4core.color("#357993");

    var series8 = chart.series.push(new am4charts.LineSeries());
    series8.dataFields.valueY = "中華民國";
    series8.dataFields.categoryX = "year";
    series8.name = "中華民國";
    series8.bullets.push(new am4charts.CircleBullet());
    series8.tooltipText = tooltipText;
    series8.tooltip.fontSize = "10px";
    series8.legendSettings.valueText = "{valueY}";
    series8.visible = false;
    series8.fill = am4core.color("#276074");
    series8.stroke = am4core.color("#276074");

    var series9 = chart.series.push(new am4charts.LineSeries());
    series9.dataFields.valueY = "香港";
    series9.dataFields.categoryX = "year";
    series9.name = "香港";
    series9.bullets.push(new am4charts.CircleBullet());
    series9.tooltipText = tooltipText;
    series9.tooltip.fontSize = "10px";
    series9.legendSettings.valueText = "{valueY}";
    series9.visible = false;
    series9.fill = am4core.color("#3A5697");
    series9.stroke = am4core.color("#3A5697");

    var series10 = chart.series.push(new am4charts.LineSeries());
    series10.dataFields.valueY = "新加坡";
    series10.dataFields.categoryX = "year";
    series10.name = "新加坡";
    series10.bullets.push(new am4charts.CircleBullet());
    series10.tooltipText = tooltipText;
    series10.tooltip.fontSize = "10px";
    series10.legendSettings.valueText = "{valueY}";
    series10.visible = false;
    series10.fill = am4core.color("#253875");
    series10.stroke = am4core.color("#253875");

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    let hs1 = series1.segments.template.states.create("hover");
    hs1.properties.strokeWidth = 1;
    series1.segments.template.strokeWidth = 1;

    let hs2 = series2.segments.template.states.create("hover");
    hs2.properties.strokeWidth = 1;
    series2.segments.template.strokeWidth = 1;

    let hs3 = series3.segments.template.states.create("hover");
    hs3.properties.strokeWidth = 1;
    series3.segments.template.strokeWidth = 1;

    let hs4 = series4.segments.template.states.create("hover");
    hs4.properties.strokeWidth = 1;
    series4.segments.template.strokeWidth = 1;

    let hs5 = series5.segments.template.states.create("hover");
    hs5.properties.strokeWidth = 1;
    series5.segments.template.strokeWidth = 1;

    let hs6 = series6.segments.template.states.create("hover");
    hs6.properties.strokeWidth = 1;
    series6.segments.template.strokeWidth = 1;

    let hs7 = series7.segments.template.states.create("hover");
    hs7.properties.strokeWidth = 1;
    series7.segments.template.strokeWidth = 1;

    let hs8 = series8.segments.template.states.create("hover");
    hs8.properties.strokeWidth = 1;
    series8.segments.template.strokeWidth = 1;

    let hs9 = series9.segments.template.states.create("hover");
    hs9.properties.strokeWidth = 1;
    series9.segments.template.strokeWidth = 1;

    let hs10 = series10.segments.template.states.create("hover");
    hs10.properties.strokeWidth = 1;
    series10.segments.template.strokeWidth = 1;

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.itemContainers.template.events.on("over", function (event) {
      var segments = event.target.dataItem.dataContext.segments;
      segments.each(function (segment) {
        segment.isHover = true;
      });
    });
    chart.legend.position = "right";
    chart.legend.fontSize = "12px";

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center";

    chart.legend.itemContainers.template.events.on("out", function (event) {
      var segments = event.target.dataItem.dataContext.segments;
      segments.each(function (segment) {
        segment.isHover = false;
      });
    });
  }
}

customElements.define("cameo-line", CameoLine);

// Add amCharts 4 license
am4core.addLicense("CH251292242");
// Add Maps license
am4core.addLicense("MP251292242");
// Add TimeLine license
am4core.addLicense("TL251292242");
