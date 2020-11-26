docker-compose stop ckan
docker-compose rm ckan
docker volume rm ckan_ckan_home
docker-compose up -d ckan