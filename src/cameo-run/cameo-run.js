import dfjs from "https://jspm.dev/dataframe-js";
import { load_js_async, load_css } from "../cameo-common/cameo-load.js";

class CameoRun extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-run" id="${this.str_random_id}" 
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
    console.log(ary_data);
    let i = 0;
    let ary_chart_data = [];
    for (; i < ary_data[0].length; i++) {
      let dic_data = {};
      dic_data["name"] = ary_data[0][i];
      dic_data["file"] = "??";
      dic_data["track"] = i + 1;
      dic_data["value"] = parseFloat(ary_data[1][i]);
      ary_chart_data.push(dic_data);
    }
    console.log("ary_chart_data:");
    console.log(ary_chart_data);
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

    var insterfaceColors = new am4core.InterfaceColorSet();
    var lineColor = insterfaceColors.getFor("background");

    var chart = am4core.create(
      this.str_random_id,
      am4plugins_timeline.CurveChart
    );
    chart.curveContainer.padding(50, 50, 50, 50);

    chart.data = ary_chart_data;
    //   [
    //   {
    //     name: "面板",
    //     file: "img/lcd.png",
    //     track: 1,
    //     value: 17.4
    //   },
    //   {
    //     name: "石化",
    //     file: "img/petrochemical.png",
    //     track: 2,
    //     value: 19.5
    //   },
    //   {
    //     name: "汽車",
    //     file: "img/car.png",
    //     track: 3,
    //     value: 26.1
    //   },
    //   {
    //     name: "半導體",
    //     file: "img/cpu.png",
    //     track: 4,
    //     value: 27.1
    //   },
    //   {
    //     name: "工具機",
    //     file: "img/machine.png",
    //     track: 5,
    //     value: 29.4
    //   },
    //   {
    //     name: "電子零組件",
    //     file: "img/electronic.png",
    //     track: 6,
    //     value: 33.2
    //   }
    // ];
    draw_on_browser();

    // fetch("julia_data.json")
    //     .then(draw_on_browser);

    // fetch("julia_data.json")
    //     .then(response => chart.data=response.json())
    //     .then(draw_on_browser);

    //$.getJSON("julia_data.json", function(julia_data) {
    //    chart.data = julia_data
    //});

    function draw_on_browser() {
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.minGridDistance = 10;
      categoryAxis.renderer.innerRadius = 5;
      categoryAxis.renderer.radius = 145;
      categoryAxis.renderer.line.stroke = lineColor;
      categoryAxis.renderer.line.strokeWidth = 5;
      categoryAxis.renderer.line.strokeOpacity = 1;

      var labelTemplate = categoryAxis.renderer.labels.template;
      labelTemplate.fill = lineColor;
      labelTemplate.fontWeight = 600;
      labelTemplate.fontSize = 12;

      var gridTemplate = categoryAxis.renderer.grid.template;
      gridTemplate.strokeWidth = 1;
      gridTemplate.strokeOpacity = 1;
      gridTemplate.stroke = lineColor;
      gridTemplate.location = 0;
      gridTemplate.above = true;

      var fillTemplate = categoryAxis.renderer.axisFills.template;
      fillTemplate.disabled = false;
      fillTemplate.fill = am4core.color("#b84f49");
      fillTemplate.fillOpacity = 1;

      categoryAxis.fillRule = function (dataItem) {
        dataItem.axisFill.__disabled = false;
        dataItem.axisFill.opacity = 1;
      };

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.renderer.points = [
        { x: 0, y: -100 },
        { x: 200, y: -100 },
        { x: 200, y: 100 },
        { x: 0, y: 100 },
        {
          x: -200,
          y: 100
        },
        { x: -200, y: -100 },
        { x: 0, y: -100 }
      ];
      valueAxis.renderer.polyspline.tensionX = 0.4;
      valueAxis.renderer.line.strokeOpacity = 0.1;
      valueAxis.renderer.line.strokeWidth = 10;
      valueAxis.renderer.maxLabelPosition = 0.98;
      valueAxis.renderer.minLabelPosition = 0.02;

      // Flag bullet
      var flagRange = valueAxis.axisRanges.create();
      flagRange.value = 0;
      var flagBullet = new am4plugins_bullets.FlagBullet();
      flagBullet.label.text = "START";
      flagRange.bullet = flagBullet;
      //flagBullet.dy = -145;
      flagBullet.adapter.add("dy", function (dy, target) {
        return -categoryAxis.renderer.radius;
      });

      var valueLabelTemplate = valueAxis.renderer.labels.template;
      valueLabelTemplate.fill = lineColor;
      valueLabelTemplate.fontSize = 8;
      valueLabelTemplate.fontWeight = 600;
      valueLabelTemplate.fillOpacity = 1;
      valueLabelTemplate.horizontalCenter = "right";
      valueLabelTemplate.verticalCenter = "bottom";
      valueLabelTemplate.padding(0, 10, 0, 0);
      valueLabelTemplate.adapter.add("rotation", function (rotation, target) {
        var value = target.dataItem.value;
        var position = valueAxis.valueToPosition(value);

        var angle = valueAxis.renderer.positionToAngle(position);
        return angle;
      });

      var valueGridTemplate = valueAxis.renderer.grid.template;
      valueGridTemplate.strokeOpacity = 0.3;
      valueGridTemplate.stroke = lineColor;

      // SERIES
      var series = chart.series.push(
        new am4plugins_timeline.CurveColumnSeries()
      );
      series.dataFields.categoryY = "name";
      series.stroke = lineColor;
      series.fill = lineColor;
      series.dataFields.valueX = "value";
      series.defaultState.transitionDuration = 4000;

      var columnTemplate = series.columns.template;
      columnTemplate.fill = lineColor;
      columnTemplate.strokeOpacity = 0;
      columnTemplate.fillOpacity = 0.3;
      columnTemplate.height = am4core.percent(100);

      var hoverState = columnTemplate.states.create("hover");
      hoverState.properties.fillOpacity = 0.9;

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.fill = lineColor;

      // LEGEND
      chart.legend = new am4charts.Legend();
      chart.legend.data = chart.data;
      chart.legend.parent = chart.curveContainer;
      chart.legend.width = 360;
      chart.legend.horizontalCenter = "middle";
      chart.legend.verticalCenter = "middle";
      chart.legend.fontSize = 12;

      var markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 25;
      markerTemplate.height = 25;

      chart.legend.itemContainers.template.events.on("over", function (event) {
        series.dataItems.each(function (dataItem) {
          if (dataItem.dataContext == event.target.dataItem.dataContext) {
            dataItem.column.isHover = true;
          } else {
            dataItem.column.isHover = false;
          }
        });
      });

      chart.legend.itemContainers.template.events.on("hit", function (event) {
        series.dataItems.each(function (dataItem) {
          if (dataItem.dataContext == event.target.dataItem.dataContext) {
            if (dataItem.visible) {
              dataItem.hide(1000, 0, 0, ["valueX"]);
            } else {
              dataItem.show(1000, 0, ["valueX"]);
            }
          }
        });
      });

      var rect = markerTemplate.children.getIndex(0);
      rect.cornerRadius(20, 20, 20, 20);

      var as = markerTemplate.states.create("active");
      as.properties.opacity = 0.5;

      var image = markerTemplate.createChild(am4core.Image);
      image.propertyFields.href = "file";
      image.width = 25;
      image.height = 25;
      image.filters.push(new am4core.DesaturateFilter());

      image.events.on("inited", function (event) {
        var image = event.target;
        var parent = image.parent;
        image.mask = parent.children.getIndex(0);
      });
    }
  }
}

customElements.define("cameo-run", CameoRun);
