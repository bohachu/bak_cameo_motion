import { load_js, load_css } from "./cameo_load.js";
load_css("https://bossanova.uk/jsuites/v3/jsuites.css");
load_css("https://bossanova.uk/jexcel/v4/jexcel.css");
load_js("https://bossanova.uk/jsuites/v3/jsuites.js");
load_js("https://bossanova.uk/jexcel/v4/jexcel.js", function(){
load_js("https://gmousse.github.io/dataframe-js/dist/dataframe.min.js",main);});

class CameoSheet extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div id="${this.str_random_id}"></div>
    `;
    this.render();
  }
  async render() {
    let df = await dfjs.DataFrame.fromCSV(
      `${this.getAttribute("src")}`
    );
    let ary = df.toArray();
    let ary_head = [];
    let i;
    let ary_columns = df.listColumns();
    for (i = 0; i < ary_columns.length; i++) {
      ary_head.push({ title: ary_columns[i], width: 100 });
    }
    jexcel(document.getElementById(this.str_random_id), {
      data: ary,
      columns: ary_head
    });
  }
}

function main() {
  customElements.define("cameo-sheet", CameoSheet);
}
