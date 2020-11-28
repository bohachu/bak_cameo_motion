//import { load_js, load_css } from "./cameo_load.js";
//load_js("https://gmousse.github.io/dataframe-js/dist/dataframe.min.js",main);

class CameoRank extends HTMLElement {
    
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div class="cameo-rank" id="${this.str_random_id}" 
        style="width: 100%; height: 500px;"></div>
    `;
    this.chart_render();
  }
  /*
  async load_data_csv() {
    let df = await dfjs.DataFrame.fromCSV(
      `data.csv`
    );
    df = df.transpose();
    let ary = df.toArray();
    console.log("@@@@@@@@@@@@");
    console.log(ary);
    console.log("!!!!!!!!!!!!");
    return ary;
  }
  */
    
  async chart_render(){


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

    chart.data = [
      {
        name: "3231 緯創",
        steps: 72192,
        href: "https://www.wistronits.com/tw/images/logo.svg"
      },
      {
        name: "2382 廣達",
        steps: 90339,
        href:
          "https://upload.wikimedia.org/wikipedia/zh/thumb/9/9b/Quanta_Computer_logo.svg/440px-Quanta_Computer_logo.svg.png"
      },
      {
        name: "2324 仁寶",
        steps: 112734,
        href:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Compal_Electronics_logo.svg/1280px-Compal_Electronics_logo.svg.png"
      },
      {
        name: "2330 台積電",
        steps: 119302,
        href:
          "https://upload.wikimedia.org/wikipedia/zh/thumb/f/fd/TSMC.svg/360px-TSMC.svg.png"
      },
      {
        name: "4938 和碩",
        steps: 138168,
        href:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Pegatron_logo.svg/1280px-Pegatron_logo.svg.png"
      },
      {
        name: "2317 鴻海",
        steps: 612553,
        href:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Foxconn_logo.svg/1200px-Foxconn_logo.svg.png"
      }
    ];

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
    valueAxis.title.text = "百萬台幣";
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
      min: am4core.color("#54d2d2"),
      max: am4core.color("#072448")
    });
    series.mainContainer.mask = undefined;

    var cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    var bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 20;
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
      return circleBullet.circle.pixelRadius + 10;
    });

    var image = bullet.createChild(am4core.Image);
    image.width = 40;
    image.height = 40;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    image.propertyFields.href = "href";
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

function main() {
    customElements.define("cameo-rank", CameoRank);
}
