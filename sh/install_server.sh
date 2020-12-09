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
# sudo /opt/jupyterhub/bin/python3 -m pip install keplergl opencv-python

sudo apt install -y nodejs npm curl wget sudo cron joe nano python3-dev \
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
# cd /opt/jupyterhub/etc/jupyterhub/

# sudo /opt/jupyterhub/bin/jupyterhub --generate-config
sudo cp ~/cameo_motion/sh/jupyterhub_config.py /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
sudo chmod a+x /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
sudo mkdir -p /opt/jupyterhub/etc/systemd
sudo cp ~/cameo_motion/sh/jupyterhub.service /opt/jupyterhub/etc/systemd/jupyterhub.service
sudo ln -s /opt/jupyterhub/etc/systemd/jupyterhub.service /etc/systemd/system/jupyterhub.service
sudo chmod a+x /opt/jupyterhub/etc/systemd/jupyterhub.service

sudo curl https://repo.anaconda.com/pkgs/misc/gpgkeys/anaconda.asc | sudo gpg --dearmor > conda.gpg
sudo install -o root -g root -m 644 conda.gpg /etc/apt/trusted.gpg.d/
sudo echo "deb [arch=amd64] https://repo.anaconda.com/pkgs/misc/debrepo/conda stable main" | sudo tee /etc/apt/sources.list.d/conda.list

sudo apt update && sudo apt install conda -y
# 會將conda安裝在 /opt/conda/; 指令會在 /opt/conda/bin/conda
sudo ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh


sudo /opt/conda/bin/conda install -c conda-forge -y 'conda-build' && \
    sudo /opt/conda/bin/conda config --prepend channels conda-forge

# Install a default conda environment for all users
sudo mkdir -p /opt/conda/envs/
sudo chmod -R a+w /opt/conda/ && \
    sudo chown -R root:users /opt/conda && \
    sudo chmod g+s /opt/conda

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
    nose pandas scikit-learn -y 
sudo /opt/conda/bin/conda build purge-all && \
    sudo /opt/conda/bin/conda clean --all -f -y && \
    sudo rm -fvR /opt/conda/pkgs/*
sudo /opt/conda/envs/python/bin/
sudo /opt/conda/envs/python/bin/pip3 install keplergl opencv-python --no-cache

export NODE_OPTIONS=--max-old-space-size=4096 && \
    sudo /opt/conda/envs/python/bin/jupyter serverextension enable --py jupyterlab --sys-prefix && \
    sodo /opt/conda/envs/python/bin/jupyter serverextension enable voila --sys-prefix && \
    sodo /opt/conda/envs/python/bin/jupyter nbextension install --py widgetsnbextension --sys-prefix && \
    sudo /opt/conda/envs/python/bin/jupyter nbextension enable widgetsnbextension --py --sys-prefix && \
    sudo /opt/conda/envs/python/bin/jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build && \
    sudo /opt/conda/envs/python/bin/jupyter labextension install @jupyter-widgets/jupyterlab-manager keplergl-jupyter --no-build && \
    sudo /opt/conda/envs/python/bin/jupyter labextension install @jupyter-widgets/jupyterlab-sidecar --no-build && \
    sudo /opt/conda/envs/python/bin/jupyter labextension install @jupyterlab/geojson-extension --no-build && \
    sudo /opt/conda/envs/python/bin/jupyter labextension install jupyter-matplotlib --no-build && \
    sudo /opt/conda/envs/python/bin/jupyter labextension install spreadsheet-editor --no-build && \
    sudo /opt/conda/envs/python/bin/jupyter labextension install @jupyter-voila/jupyterlab-preview --no-build && \
    sudo /opt/conda/envs/python/bin/jupyter lab build && \
    unset NODE_OPTIONS 
    # jupyter labextension install jupyterlab-plotly@4.6.0 --no-build && \
    # jupyter labextension install plotlywidget@4.6.0 --no-build && \


# sudo rm -rf /var/lib/apt/lists/*

# 啟動jupyterhub服務; 需要重開機才會生效
# sudo systemctl daemon-reload
# sudo systemctl enable jupyterhub.service
# sudo systemctl start jupyterhub.service


# 共享目錄設定
sudo groupadd analysts
sudo mkdir -p /srv/data/share_data_analysts
sudo chown -R cameo:analysts /srv/data/share_data_analysts
sudo chmod -R 770 /srv/data/share_data_analysts

# setfacl only works in native linux; not working for WSL 
# Granting permission for a group named "analysts" would look something like this:
sudo setfacl -R -m d:g:analysts:rwx /srv/data/share_data_analysts
# 非群組的應該都看不到
sudo setfacl -R -m d:o::r /srv/data/share_data_analysts
# 加入權限使預設新建立的檔案都是rwx權限:
sudo setfacl -R -m d:mask:rwx /srv/data/share_data_analysts





# TODO www需要讓特定使用者(如admin group)可以寫入 但是analysts不能寫入

# TODO jupyterhub_config.py 需要設定建立新使用者時, 自動加入group以及連結上述資料夾到home目錄中

# nginx 安裝啟動設定
# sudo add-apt-repository ppa:nginx/stable -y
sudo apt update
sudo apt install nginx -y
# cd ~/cameo_motion/sh
sudo mkdir -p /etc/nginx/sites-enabled/cameo.tw
sudo cp ~/cameo_motion/sh/nginx_http.conf /etc/nginx/sites-enabled/cameo.tw
sudo cp ~/cameo_motion/sh/htpasswd /etc/nginx/htpasswd
# sudo /etc/init.d/nginx reload
sudo systemctl stop nginx

# 設定靜態網頁檔案
sudo mkdir -p /var/www/cameo.tw/html/
sudo cp ../src/* /var/www/cameo.tw/html/
sudo chown -R $USER:$USER /var/www/cameo.tw/html/
sudo chmod -R 755 /var/www/cameo.tw/html/
sudo ln -s /etc/nginx/sites-available/cameo.tw /etc/nginx/sites-enabled/

sudo systemctl enable nginx
sudo systemctl start nginx

## install julia
cd ~
wget https://julialang-s3.julialang.org/bin/linux/x64/1.5/julia-1.5.3-linux-x86_64.tar.gz
tar xvfz julia-1.5.3-linux-x86_64.tar.gz
# cd /usr/local/bin/
sudo ln -s ~/julia-1.5.3/bin/julia /usr/local/bin/julia

source ~/.bashrc
## jupyterlab julia 
/usr/local/bin/julia -e 'import Pkg; Pkg.add("IJulia"); Pkg.build("IJulia"); using IJulia; notebook(detached=true);'

## install julia genie
/usr/local/bin/julia -e 'import Pkg; Pkg.add("PackageCompiler");using PackageCompiler;Pkg.add("Genie");@time using Genie;@time PackageCompiler.create_sysimage(:Genie; replace_default=true)'

## interact.jl
/usr/local/bin/julia -e 'using Pkg;Pkg.add("Interact");Pkg.add("IJulia");Pkg.add("WebIO")'
/usr/local/bin/julia -e 'using WebIO; using Interact; WebIO.install_jupyter_labextension();'

## github
git config --global user.email "ycchang.pmp@cameo.tw"
git config --global user.name "austinyuch"
git config --global credential.helper cache
git config --global credential.helper store

## deno
curl -fsSL https://deno.land/x/install/install.sh | sh
cd /usr/local/bin/
sudo ln -s /home/cameo/.deno/bin/deno deno


# setting firewall