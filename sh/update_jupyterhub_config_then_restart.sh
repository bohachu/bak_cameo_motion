#!/bin/bash
# in 專案目錄/sh/
# cd /home/$USER/cameo_motion/sh
if [[ ! -f .env ]]; then
    echo "Copying environment template..."
    cp .env-template .env
fi

source .env

sudo systemctl stop jupyterhub.service
sudo cp /home/$USER/$PRJ_DIR_NAME/sh/jupyterhub_config.py /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
sudo chmod a+x /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
sudo systemctl start jupyterhub.service