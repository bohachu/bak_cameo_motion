FROM nginx:1.15-alpine

COPY nginx_http.conf /etc/nginx/conf.d/default.conf
COPY htpasswd /etc/nginx/htpasswd
COPY docker-entrypoint.sh .

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
