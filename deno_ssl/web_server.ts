// import { serve } from "https://deno.land/std@0.78.0/http/server.ts";
import { serveTLS } from "https://deno.land/std/http/server.ts";


// const server = serve({ hostname: "0.0.0.0", port: 8866 });
const server=serveTLS({
    "hostname":"0.0.0.0",
    "port":8866,
    "certFile":"certificate.crt",
    "keyFile":"private.key"
})
console.log(`HTTP webserver running.`);

for await (const request of server) {
  let bodyContent = "Your user-agent is:\n\n";
  bodyContent += request.headers.get("user-agent") || "Unknown";

  request.respond({ status: 200, body: bodyContent });
}
