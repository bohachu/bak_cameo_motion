//apex-line-column.js
var dfjs, ApexCharts; //防止編輯器告警
function load(url) {
  var script = document.createElement("script"); // create a script DOM node
  script.src = url; // set its src to the provided URL
  document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

var dic_jsonp; //先從 ragic 拿到資料之後才呼叫 ApexLineColumn
function jsonp_callback(data) {
  console.log("should 001");
  dic_jsonp = data;
  customElements.define("apex-line-column", ApexLineColumn);
}
load(
  "https://ap5.ragic.com/cameomotion/config-apex-line-column/2?api&listing&callback=jsonp_callback"
);
load("https://cdn.jsdelivr.net/npm/apexcharts");

class ApexLineColumn extends HTMLElement {
  connectedCallback() {
    console.log("should 002");
    console.log(dic_jsonp);
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <style>
        @import url(https://fonts.googleapis.com/css?family=Roboto);
        body {
          font-family: Roboto, sans-serif;
        }
        .apex-line-column {
          max-width: 650px;
          margin: 35px auto;
          color: black;
        }
      </style>
      <div class="apex-line-column" id="${this.str_random_id}"></div>
    `;
    this.chart_render();
    // this.original_render();
  }
  async load_config_csv() {
    let df = await dfjs.DataFrame.fromCSV(this.getAttribute("src"));
    let ary = df.transpose().toArray();
    let ary_keys = ary[0];
    let ary_values = ary[1];
    this.dic_config = {};
    ary_keys.forEach(
      (str_key, i) => (this.dic_config[str_key] = ary_values[i])
    );
  }
  async load_data_csv() {
    let df = await dfjs.DataFrame.fromCSV(this.dic_config["資料檔案"]);
    df = df.transpose();
    let ary = df.toArray();
    return ary;
  }
  async chart_render() {
    await this.load_config_csv();
    let ary = await this.load_data_csv();
    let options = {
      series: [
        {
          name: this.dic_config["Y軸左側名稱"],
          type: "column",
          data: ary[1]
        },
        {
          name: this.dic_config["Y軸右側名稱"],
          type: "line",
          data: ary[2]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: this.dic_config["標題名稱"]
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: ary[0],
      xaxis: {
        type: "string"
      },
      yaxis: [
        {
          title: {
            text: this.dic_config["Y軸左側名稱"]
          }
        },
        {
          opposite: true,
          title: {
            text: this.dic_config["Y軸右側名稱"]
          }
        }
      ]
    };
    let chart = new ApexCharts(
      document.querySelector("#" + this.str_random_id),
      options
    );
    chart.render();
  }

  original_render() {
    var options = {
      series: [
        {
          name: "Website Blog",
          type: "column",
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        },
        {
          name: "Social Media",
          type: "line",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Traffic Sources"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
        "10 Jan 2001",
        "11 Jan 2001",
        "12 Jan 2001"
      ],
      xaxis: {
        type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Website Blog"
          }
        },
        {
          opposite: true,
          title: {
            text: "Social Media"
          }
        }
      ]
    };
    var chart = new ApexCharts(
      document.querySelector("#" + this.str_random_id),
      options
    );
    chart.render();
  }
}
