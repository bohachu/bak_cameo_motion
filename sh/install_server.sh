#!/bin/bash

# 執行目錄: 專案目錄/sh
# 靜態網頁目錄: 專案目錄/src

if [[ ! -f .env ]]; then
    echo "Copying environment template..."
    cp .env-template .env
fi

source .env

# 設定時區為Taipei時區
sudo timedatectl set-timezone Asia/Taipei


sudo python3 -m venv /opt/jupyterhub/

sudo /opt/jupyterhub/bin/python3 -m pip install wheel
sudo /opt/jupyterhub/bin/python3 -m pip install jupyterhub jupyterlab
sudo /opt/jupyterhub/bin/python3 -m pip install ipywidgets
sudo /opt/jupyterhub/bin/python3 -m pip install keplergl opencv-python

sudo apt install nodejs npm curl wget sudo cron joe nano python3-dev \
   software-properties-common apt-utils ffmpeg libssl1.1 libssl-dev libxtst6 xvfb xdotool wmctrl cmake \
      zip unzip file fonts-dejavu tzdata graphviz graphviz-dev \
      libxml2-dev libxslt-dev libjpeg-dev zlib1g-dev libpng-dev python3-dev \
      git-lfs mc && \
    add-apt-repository -y ppa:ubuntugis/ubuntugis-unstable && \
    apt-get update && \
    ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime && \
    export LD_LIBRARY_PATH=/lib:/usr/lib:/usr/local/lib && \
    apt-get clean -y && \
    apt-get -y autoremove 
    
sudo npm install -g configurable-http-proxy -y

sudo mkdir -p /opt/jupyterhub/etc/jupyterhub/
cd /opt/jupyterhub/etc/jupyterhub/

# sudo /opt/jupyterhub/bin/jupyterhub --generate-config
sudo cp jupyterhub_config.py /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py

sudo cp jupyterhub.service /opt/jupyterhub/etc/systemd/jupyterhub.service
sudo ln -s /opt/jupyterhub/etc/systemd/jupyterhub.service /etc/systemd/system/jupyterhub.service


curl https://repo.anaconda.com/pkgs/misc/gpgkeys/anaconda.asc | gpg --dearmor > conda.gpg
sudo install -o root -g root -m 644 conda.gpg /etc/apt/trusted.gpg.d/
echo "deb [arch=amd64] https://repo.anaconda.com/pkgs/misc/debrepo/conda stable main" | sudo tee /etc/apt/sources.list.d/conda.list

sudo apt update && sudo apt install conda -y
# 會將conda安裝在 /opt/conda/; 指令會在 /opt/conda/bin/conda
sudo ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh


conda install -c conda-forge -y 'conda-build' && \
    conda config --prepend channels conda-forge

# Install a default conda environment for all users
sudo mkdir /opt/conda/envs/
sudo chmod -R a+w /opt/conda/ && \
    chown -R root:users /opt/conda && \
    chmod g+s /opt/conda

# 將jupyterhub內的conda env 放在為jupyterhub安裝的虛擬環境中
sudo /opt/conda/bin/conda create --prefix /opt/conda/envs/python python=3.8 \
      "jupyterhub=$JUPYTERHUB_VERSION" \
      "jupyterlab=$JUPYTERLAB_VERSION" \
      "notebook=$NOTEBOOK_VERSION" \
      "nodejs=12.4" \
      "icu=58.2" \
      "python-libarchive-c=2.9" \
      "conda-package-handling" \
      "libarchive=3.5" \
      "ipywidgets=7.5.1" \
      "widgetsnbextension=3.5.1" \
      "matplotlib=3.3.2" \
      "scipy=1.5.3" \
      "numba=0.52" \
      "numexpr=2.7.1" \
      "psycopg2=2.8.6" \
      "xlrd=1.2" \
      "pandas=1.1.4" \
      "ipympl=0.5.8" \
      "nbgitpuller=0.9" \
      "voila=0.2.4" \
      "voila-gridstack=0.0.12" \
      "ipyleaflet=0.13.3" \
      "psutil=5.7.3" \
      "google-cloud-storage" \
    nose pandas scikit-learn -y && \
    conda build purge-all && \
    conda clean --all -f -y && \
    rm -fvR /opt/conda/pkgs/*


sudo jupyter serverextension enable --py jupyterlab --sys-prefix && \
    jupyter serverextension enable voila --sys-prefix && \
    jupyter nbextension install --py widgetsnbextension --sys-prefix && \
    jupyter nbextension enable widgetsnbextension --py --sys-prefix && \
    export NODE_OPTIONS=--max-old-space-size=4096 && \
    jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build && \
    # jupyter labextension install jupyterlab-plotly@4.6.0 --no-build && \
    # jupyter labextension install plotlywidget@4.6.0 --no-build && \
    jupyter labextension install @jupyter-widgets/jupyterlab-manager keplergl-jupyter --no-build && \
    jupyter labextension install @jupyter-widgets/jupyterlab-sidecar --no-build && \
    jupyter labextension install @jupyterlab/geojson-extension --no-build && \
    jupyter labextension install jupyter-matplotlib --no-build && \
    jupyter labextension install spreadsheet-editor --no-build && \
    jupyter labextension install @jupyter-voila/jupyterlab-preview --no-build && \
    jupyter lab build && \
    unset NODE_OPTIONS 


sudo rm -rf /var/lib/apt/lists/*

# 啟動jupyterhub服務
sudo systemctl daemon-reload
sudo systemctl enable jupyterhub.service
sudo systemctl start jupyterhub.service


# 共享目錄設定
sudo groupadd analysts
sudo mkdir /srv/data/share_data_analysts

sudo chown -R cameo:analysts /srv/data/share_data_analysts

sudo chmod -R 770 /srv/data/_share_data_analyst
# Granting permission for a group named "analysts" would look something like this:
sudo setfacl -R -m d:g:analysts:rwx /srv/data/share_data_analysts
# 非群組的應該都看不到
sudo setfacl -R -m d:o::r /srv/data/share_data_analysts
# 加入權限使預設新建立的檔案都是rwx權限:
sudo setfacl -R -m d:mask:rwx /srv/data/share_data_analysts


# 設定靜態網頁檔案
sudo mkdir /var/www/html/
sudo cp ../src/* /var/www/html/

# TODO www需要讓特定使用者(如admin group)可以寫入 但是analysts不能寫入

# TODO jupyterhub_config.py 需要設定建立新使用者時, 自動加入group以及連結上述資料夾到home目錄中



## install julia
cd ~
wget https://julialang-s3.julialang.org/bin/linux/x64/1.5/julia-1.5.2-linux-x86_64.tar.gz
tar xvfz julia-1.5.2-linux-x86_64.tar.gz
cd /usr/local/bin/
sudo ln -s ~/julia-1.5.2/bin/julia julia

## deno
curl -fsSL https://deno.land/x/install/install.sh | sh
cd /usr/local/bin/
sudo ln -s /home/bohachu/.deno/bin/deno deno


# nginx 安裝啟動設定

