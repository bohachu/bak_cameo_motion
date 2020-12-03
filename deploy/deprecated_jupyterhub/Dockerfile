FROM python:3.8

USER root

# 改時間為Taipei zone
RUN mv /etc/localtime /etc/localtime.old \
	&& ln -s /usr/share/zoneinfo/Asia/Taipei /etc/localtime

RUN apt-get update \
	&& apt-get -y dist-upgrade \
	&& apt-get -y autoremove

RUN apt-get -q -y install \
	sudo \
	cron \
	joe \
    git-core \
    vim \
    wget \
    curl \
    nano \
    && apt-get -q clean \
    && rm -rf /var/lib/apt/lists/*

# 預設git user設定
# RUN git config --global user.email "cbh@cameo.tw" \
#     && git config --global user.name "bohachu" \
#     && git config --global credential.helper cache \
#     && git config --global credential.helper store 
    # && cd ~ \
    # && git clone https://github.com/bohachu/cameo_motion.git

RUN apt -y update \
	&& apt -y install python3-pip

RUN apt-get -y install \
	zip \
	htop \
    npm


RUN mkdir -p /home/cameo

# 須從 cameo_motion 上一層執行 詳見readme.md
COPY cameo_motion ./cameo_motion

#RUN addgroup --system iotturbo \ 
#	&& useradd -r -m -g iotturbo -s /bin/bash bohachu
#ADD --chown=bohachu:iotturbo ./iot_turbo/docker/crontab /etc/crontabs/bohachu

WORKDIR /home/cameo

# sudo python3 -m venv /opt/jupyterhub/

# sudo /opt/jupyterhub/bin/python3 -m pip install wheel
# sudo /opt/jupyterhub/bin/python3 -m pip install jupyterhub jupyterlab
# sudo /opt/jupyterhub/bin/python3 -m pip install 

# ENV LANG=zh_TW.UTF-8
ENV SHELL=/bin/bash \
    LANG=zh_TW.UTF-8

# sudo apt install nodejs npm -y
# sudo npm install -g configurable-http-proxy -y

RUN apt-get install nodejs npm -y \
RUN npm install -g configurable-http-proxy -y \
    &&  rm -rf ~/.npm

RUN ln -sf /usr/local/bin/python3.8 /usr/bin/python3

RUN pip3 install --user --upgrade pip && \
	pip3 install \
	pandas \
	# requests \
	# aiohttp \
	# psutil \
	# google-cloud-storage \
	numpy \
	numba \
    voila \
    sqlalchemy \
    matplotlib \
 
    wheel

ARG JUPYTERHUB_VERSION=1.2.2

# sudo apt install nodejs npm -y
# sudo npm install -g configurable-http-proxy -y

RUN pip3 install --no-cache jupyterhub==${JUPYTERHUB_VERSION} \
    jupyterlab \
    ipywidgets 

RUN pip 3 install ipympl 

RUN EXPORT JUPYTERLAB_DIR="$HOME/.local/share/jupyter/lab"

RUN RUN sudo chmod 777 /usr/ && \
    /usr/bin/python3 -m jupyter labextension install @jupyter-widgets/jupyterlab-manager \
    && /usr/bin/python3 -m jupyter labextension install spreadsheet-editor \
    && /usr/bin/python3 -m jupyter labextension install @jupyter-voila/jupyterlab-preview \
    && /usr/bin/python3 -m jupyter labextension install jupyter-matplotlib \
    && /usr/bin/python3 -m jupyter nbextension enable --py widgetsnbextension \
    && /usr/bin/python3 -m jupyter serverextension enable voila --sys-prefix


LABEL maintainer="Cameo Inc. <service@cameo.tw>"
# LABEL org.jupyter.service="jupyterhub"
LABEL tw.cameo.jupyter.service="jupyterhub"

# cp jupyterhub_config.py; execute from 專案目錄上一層
COPY cameo_motion/docker/jupyterhub_config.py /srv/jupyterhub/jupyterhub_config.py

# 設定共享權限,建立連結


EXPOSE 3800

CMD ["jupyterhub", "-f", "/srv/jupyterhub/jupyterhub_config.py"]

# USER nobody
# CMD ["jupyterhub"]