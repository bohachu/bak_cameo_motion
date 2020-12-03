# clone git to destination path
cd ~
mkdir service
cd service 
git clone https://github.com/bohachu/cameo_motion.git
# run docker compose
cd ~/service/cameo_motion/deploy
docker-compose up -d --build