kill -9 $(ps ax | grep 'deno run -A web_server.ts' | awk '{print $1}')
deno run -A web_server.ts
