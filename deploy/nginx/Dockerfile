FROM nginx:1.18-alpine

COPY nginx_http.conf /etc/nginx/conf.d/default.conf
COPY htpasswd /etc/nginx/htpasswd
COPY docker-entrypoint.sh .

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
