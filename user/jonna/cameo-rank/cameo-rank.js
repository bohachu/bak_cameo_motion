import dfjs from "https://jspm.dev/dataframe-js";
import { load_js_async, load_css } from "../cameo-common/cameo-load.js";

// import { load_js, load_css } from "./cameo-load.js";
// load_js("https://gmousse.github.io/dataframe-js/dist/dataframe.min.js", main);

class CameoRank extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-rank" id="${this.str_random_id}" 
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
    console.log("11111");
    console.log(dic_meta);
    return dic_meta;
  }
  //2020-12-06 caro 專屬於本動圖的解析程式碼
  parse_ary_icon_file(dic_meta) {
    let ary_icon_file = [];
    for (let str_key in dic_meta) {
      if (str_key.includes("圖示_")) {
        ary_icon_file.push(dic_meta[str_key]);
      }
    }
    return ary_icon_file;
  }

  //2020-12-09 jonna 專屬於本動圖的解析程式碼
  parse_ary_chart_data(ary_data, ary_icon_file) {
    let i = 0;
    let ary_chart_data = [];
    for (; i < ary_data[0].length; i++) {
      let dic_data = {};
      dic_data["name"] = ary_data[0][i] + " " + ary_data[1][i];
      // arry 0 和 1 合併在 name
      dic_data["steps"] = ary_data[2][i];
      dic_data["file"] = ary_icon_file[i];
      ary_chart_data.push(dic_data);
    }
    return ary_chart_data;
  }

  async chart_render() {
    //2020-12-09 jonna 專屬於本動圖的：總資料準備
    const ary_data = await this.load_ary_data();
    const dic_meta = await this.load_dic_meta();
    const ary_icon_file = this.parse_ary_icon_file(dic_meta);
    const ary_chart_data = this.parse_ary_chart_data(ary_data, ary_icon_file);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    /**
     * Chart design taken from Samsung health app
     */

    var chart = am4core.create(this.str_random_id, am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 40;

    // var title = chart.titles.create();
    // title.text = "[bold font-size: 20]台灣半導體營收排行榜";
    // title.textAlign = "middle";
    // 12/09 rank 資料目前無法自動排序，對應的圖片檔案也是特別調整過
    chart.data = ary_chart_data;

    // watermark
    var watermark = chart.createChild(am4core.Label);
    watermark.text = dic_meta["資料來源"];
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
    valueAxis.title.text = dic_meta["X軸標題文字"];
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
      max: am4core.color(dic_meta["圖表漸層最深色"]),
      min: am4core.color(dic_meta["圖表漸層最淺色"])
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
  }
}

customElements.define("cameo-rank", CameoRank);

// Add amCharts 4 license
am4core.addLicense("CH251292242");
