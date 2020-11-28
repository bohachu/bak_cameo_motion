import dfjs from "https://jspm.dev/dataframe-js";
import { load_js_async, load_css } from "./cameo-load.js";
load_css("https://bossanova.uk/jsuites/v3/jsuites.css");
load_css("https://bossanova.uk/jexcel/v4/jexcel.css");
(async () => {
  await load_js_async("https://bossanova.uk/jsuites/v3/jsuites.js");
  await load_js_async("https://bossanova.uk/jexcel/v4/jexcel.js");
})();

var DataFrame = dfjs.DataFrame;
class CameoSheet extends HTMLElement {
  connectedCallback() {
    this.str_random_id = "id_" + Math.random().toString(36).substr(2, 9);
    this.innerHTML = `
      <div id="${this.str_random_id}"></div>
    `;
    this.render();
  }
  async load_meta_csv() {
    // let df = await DataFrame.fromCSV(
    //   `${window.location.href}/data/cameo_line_column_meta.csv`
    // );
    // let ary = df.transpose().toArray();
    // let ary_keys = ary[0];
    // let ary_values = ary[1];
    // this.dic_meta = {};
    // ary_keys.forEach((str_key, i) => (this.dic_meta[str_key] = ary_values[i]));
  }
  async render() {
    let df = await DataFrame.fromCSV(
      `${window.location.href}/../${this.getAttribute("src")}`
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
customElements.define("cameo-sheet", CameoSheet);
