#!/bin/bash
# 起始執行目錄: 專案目錄/sh
# 請先把sh變成可以執行: chmod a+x *.sh
# 請先設定好nginx
# after install, launch with: 
# jupyterhub: sudo systemctl start jupyterhub.service or
#     /opt/jupyterhub/bin/jupyterhub -f /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
# jupyterhub設定檔: 專案目錄/sh/jupyter_config.py -> /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
# 修改設定後重啟服務: ./update_jupyterhub_config_then_restart.sh
# nginx設定檔: cp 專案目錄/sh/nginx_http.conf
# 靜態網頁目錄: cp 專案目錄/src 
# cd /home/$USER/$PRJ_DIR_NAME/sh
if [[ ! -f .env ]]; then
    echo "Copying environment template..."
    cp .env-template .env
fi

source .env

# 設定時區為Taipei時區
sudo timedatectl set-timezone Asia/Taipei

cd /home/$USER/

# conda ppa
curl https://repo.anaconda.com/pkgs/misc/gpgkeys/anaconda.asc | gpg --dearmor > conda.gpg
sudo install -o root -g root -m 644 conda.gpg /etc/apt/trusted.gpg.d/
sudo echo "deb [arch=amd64] https://repo.anaconda.com/pkgs/misc/debrepo/conda stable main" | sudo tee /etc/apt/sources.list.d/conda.list
sudo apt update && sudo apt install conda --upgrade -y

# # postgresql ppa
# wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
# sudo echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
# sudo apt install postgresql-12 postgresql-client-12  --upgrade -y

# vscode ppa
# curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
# sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
# sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
# sudo apt install apt-transport-https
# sudo apt update && sudo apt install code -y

# sudo /opt/jupyterhub/bin/python3 -m pip install keplergl opencv-python
# sudo ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime && \
sudo add-apt-repository -y ppa:ubuntugis/ppa && \
sudo apt update && \
    sudo apt install python3 python3-dev --upgrade -y \
    nodejs npm curl wget sudo cron joe nano \
    zip unzip file fonts-dejavu acl
    # software-properties-common apt-utils ffmpeg libssl1.1 libssl-dev \
    # libxtst6 xvfb xdotool wmctrl cmake \
    #  tzdata graphviz graphviz-dev \
    # libxml2-dev libxslt-dev libjpeg-dev zlib1g-dev libpng-dev  \
sudo apt install git-lfs mc nginx && \
    sudo export LD_LIBRARY_PATH=/lib:/usr/lib:/usr/local/lib && \
    sudo apt clean -y && \
    sudo apt -y autoremove 

# sudo add-apt-repository -y ppa:ubuntugis/ppa && \


# # nginx 安裝啟動設定

# cd /home/$USER/$PRJ_DIR_NAME/sh
# sudo systemctl stop nginx
# sudo mkdir -p /etc/nginx/sites-available/$SITE_DOMAIN
# sudo cp /home/$USER/$PRJ_DIR_NAME/sh/nginx_http.conf /etc/nginx/sites-available/$SITE_DOMAIN/nginx_http.conf
# sudo cp /home/$USER/$PRJ_DIR_NAME/sh/htpasswd /etc/nginx/htpasswd
# sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096

# # sudo /etc/init.d/nginx reload
# # sudo systemctl stop nginx

# # 設定靜態網頁檔案
# sudo mkdir -p /var/www/$SITE_DOMAIN/html/
# sudo cp -R /home/$USER/$PRJ_DIR_NAME/src/* /var/www/$SITE_DOMAIN/html/

# # www需要讓特定使用者(如admin group)可以寫入 但是analysts不能寫入
# sudo chown -R $USER:$USER /var/www/$SITE_DOMAIN/html
# # sudo chmod -R 755 /var/www/iek.cameo.tw
# cd /var/www/$SITE_DOMAIN
# sudo find . -type d -exec chmod 0755 {} \;
# sudo find . -type f -exec chmod 0644 {} \;
# sudo ln -s /etc/nginx/sites-available/$SITE_DOMAIN/nginx_http.conf /etc/nginx/sites-enabled/$SITE_DOMAIN

# sudo mkdir -p /var/ssl
# # ssl_certificate 
# sudo cp /home/$USER/$PRJ_DIR_NAME/secrets/certificate.crt /var/ssl/certificate.crt
# # ssl_certificate_key 
# sudo cp /home/$USER/$PRJ_DIR_NAME/secrets/private.key /var/ssl/private.key
# cd /home/$USER

# sudo systemctl daemon-reload
# sudo systemctl enable nginx
# sudo systemctl start nginx


sudo npm install -g configurable-http-proxy -y

sudo apt install python3-venv -y 
sudo python3 -m venv /opt/jupyterhub/
sudo /opt/jupyterhub/bin/python3 -m pip install --upgrade pip
sudo /opt/jupyterhub/bin/python3 -m pip install wheel jupyterhub \
    jupyterlab ipywidgets jupyterhub-nativeauthenticator --no-cache-dir

sudo mkdir -p /opt/jupyterhub/etc/jupyterhub/
cd /opt/jupyterhub/etc/jupyterhub/
# sudo echo "deb [arch=amd64] https://repo.anaconda.com/pkgs/misc/debrepo/conda stable main" | sudo tee /etc/apt/sources.list.d/conda.list

# userlist
cd /home/$USER/$PRJ_DIR_NAME/sh
if [[ ! -f userlist ]]; then
    echo "Copying environment template..."
    cp userlist-template userlist
fi
sudo cp /home/$USER/$PRJ_DIR_NAME/sh/userlist /opt/jupyterhub/etc/jupyterhub/userlist


# sudo /opt/jupyterhub/bin/jupyterhub --generate-config
sudo cp /home/$USER/$PRJ_DIR_NAME/sh/jupyterhub_config.py /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
sudo chmod a+x /opt/jupyterhub/etc/jupyterhub/jupyterhub_config.py
sudo mkdir -p /opt/jupyterhub/etc/systemd
sudo cp /home/$USER/$PRJ_DIR_NAME/sh/jupyterhub.service /opt/jupyterhub/etc/systemd/jupyterhub.service
sudo ln -s /opt/jupyterhub/etc/systemd/jupyterhub.service /etc/systemd/system/jupyterhub.service
sudo chmod a+x /opt/jupyterhub/etc/systemd/jupyterhub.service


export NODE_OPTIONS=--max-old-space-size=4096 && \
    # sudo /opt/conda/envs/python/bin/jupyter serverextension enable --py jupyterlab --sys-prefix && \
    # sudo /opt/conda/envs/python/bin/jupyter serverextension enable voila --sys-prefix && \
    # sudo /opt/conda/envs/python/bin/jupyter nbextension install --py widgetsnbextension --sys-prefix && \
    # sudo /opt/conda/envs/python/bin/jupyter nbextension enable widgetsnbextension --py --sys-prefix
sudo /opt/jupyterhub/bin/jupyter serverextension enable --py jupyterlab --sys-prefix && \
sudo /opt/jupyterhub/bin/jupyter serverextension enable voila --sys-prefix && \
sudo /opt/jupyterhub/bin/jupyter nbextension install --py widgetsnbextension --sys-prefix && \
sudo /opt/jupyterhub/bin/jupyter nbextension enable widgetsnbextension --py --sys-prefix
sudo /opt/jupyterhub/bin/jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build 
sudo /opt/jupyterhub/bin/jupyter labextension install @jupyter-widgets/jupyterlab-manager keplergl-jupyter --no-build 
sudo /opt/jupyterhub/bin/jupyter labextension install jupyter-matplotlib --no-build
sudo /opt/jupyterhub/bin/jupyter labextension install jupyterlab_filetree --no-build
sudo /opt/jupyterhub/bin/jupyter labextension install @jupyter-widgets/jupyterlab-sidecar --no-build 
sudo /opt/jupyterhub/bin/jupyter labextension install @jupyterlab/geojson-extension --no-build 
sudo /opt/jupyterhub/bin/jupyter labextension install spreadsheet-editor --no-build
sudo /opt/jupyterhub/bin/jupyter labextension install @jupyter-voila/jupyterlab-preview --no-build 
sudo /opt/jupyterhub/bin/jupyter lab build --minimize=False 
# it has memory issue wheen consecutively execute in 4GB RAM condition, so seperate the execution or use --minimize=False

unset NODE_OPTIONS 
    # jupyter labextension install jupyterlab-plotly@4.6.0 --no-build && \
    # jupyter labextension install plotlywidget@4.6.0 --no-build && \


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
sudo /opt/conda/bin/conda create --prefix \
    /opt/conda/envs/python \
    -c conda-forge python=3.8 \
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
    "nose=1.3.7" \
    "scikit-learn=0.23.2" -y 
#cv2 not available

sudo /opt/conda/envs/python/bin/python -m pip install --upgrade pip --no-cache-dir 
sudo /opt/conda/envs/python/bin/pip3 install keplergl --no-cache-dir 
sudo /opt/conda/bin/conda build purge-all && \
    sudo /opt/conda/bin/conda clean --all -f -y && \
    sudo rm -fvR /opt/conda/pkgs/*

# sudo rm -rf /var/lib/apt/lists/*


# 共享目錄設定
sudo groupadd analysts
sudo usermod -aG analysts $USER
# sudo usermod -g analysts $USER
sudo mkdir -p /srv/data/share_data_analysts
sudo chown -R root:analysts /srv/data/share_data_analysts
sudo chmod -R 770 /srv/data/share_data_analysts

sudo mkdir -p /srv/data/www
sudo chown -R root:analysts /srv/data/www
sudo chmod -R 755 /srv/data/www

# 連結到主目錄




# setfacl only works in native linux; not working for WSL 
# sudo apt install -y acl
# Granting permission for a group named "analysts" would look something like this:
sudo setfacl -R -m d:g:analysts:rwx /srv/data/share_data_analysts
# 非群組的應該都看不到
sudo setfacl -R -m d:o::r /srv/data/share_data_analysts
# 加入權限使預設新建立的檔案都是rwx權限:
sudo setfacl -R -m d:mask:rwx /srv/data/share_data_analysts

sudo setfacl -R -m d:g:analysts:rwx /srv/data/www
# 非群組的應該都看不到
sudo setfacl -R -m d:o::r /srv/data/www
# 加入權限使預設新建立的檔案都是rwx權限:
sudo setfacl -R -m d:mask:rwx /srv/data/www

sudo ln -s /srv/data/share_data_analysts /home/$USER/share_data_analysts
sudo ln -s /srv/data/www /home/$USER/www

# /usr/local/bin/julia -e 'import Pkg; Pkg.add("IJulia"); Pkg.build("IJulia"); using IJulia; notebook(detached=true);'

# ## install julia
# cd ~
# wget https://julialang-s3.julialang.org/bin/linux/x64/1.5/julia-1.5.3-linux-x86_64.tar.gz
# tar xvfz julia-1.5.3-linux-x86_64.tar.gz
# sudo chown -R root:users ~/julia-1.5.3/
# # sudo chmod a+x ~/julia-1.5.3/bin/
# # cd /usr/local/bin/
# sudo ln -s ~/julia-1.5.3/bin/julia /usr/local/bin/julia

source ~/.bashrc
## jupyterlab julia 
# /usr/local/bin/julia -e 'import Pkg; Pkg.add("IJulia"); Pkg.build("IJulia"); using IJulia; notebook(detached=true);'

# ## install julia genie
# /usr/local/bin/julia -e 'import Pkg; Pkg.add("PackageCompiler");using PackageCompiler;Pkg.add("Genie");@time using Genie;@time PackageCompiler.create_sysimage(:Genie; replace_default=true)'

# ## interact.jl
# /usr/local/bin/julia -e 'using Pkg;Pkg.add("Interact");Pkg.add("IJulia");Pkg.add("WebIO")'
# /usr/local/bin/julia -e 'using WebIO; using Interact; WebIO.install_jupyter_labextension();'

# ## github
# git config --global user.email "$DEFAULT_GIT_USER_EMAIL"
# git config --global user.name "$DEFAULT_GIT_USER_NAME"
# git config --global credential.helper cache
# git config --global credential.helper store

# ## deno
# cd ~
# curl -fsSL https://deno.land/x/install/install.sh | sh
# # cd /usr/local/bin/