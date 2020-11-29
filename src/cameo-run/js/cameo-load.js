export function load_js(str_url, func_onload = null) {
  var script = document.createElement("script");
  script.onload = func_onload;
  script.src = str_url;
  document.head.appendChild(script); //or something of the likes
}

export function load_css(str_url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = str_url;
  link.type = "text/css";
  document.head.appendChild(link); //or something of the likes
}

export async function load_js_async(str_url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.onload = (event) => {
      resolve();
    };
    script.src = str_url;
    document.head.appendChild(script);
  });
}
