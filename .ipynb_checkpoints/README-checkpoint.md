== 2020-11-06 21:48 Bowen Chiu ==
genie 已經可以 http get 驅動 julia 做事情

== 2020-10-25 00:08 Bowen Chiu ==
如果可以實驗的話，希望能夠把 voila 加入「數據動圖」製程當中

== 2020-10-25 22:44 Bowen Chiu ==
希望可以透過 js url 直接讀取 tornado csv 檔案而不需要透過其他的方法 genie server 之類的
2020-10-26 00:07:55 應該沒有成功，反而還造成 voila preview 失效了，需要 pip3 uninstall jupyterlab 重新安裝
沒有成功的程式碼在下面

### jupyterlab server extension example
#cd ~
#pip3 install --user cookiecutter
### 要看這邊的文章做相關設定 https://github.com/jupyterlab/extension-examples/tree/master/advanced/server-extension
# cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts
# jlpm add @jupyterlab/services
# jlpm add @jupyterlab/coreutils
# sudo chmod 777 /usr/local/lib/python3.7/dist-packages/
# cd ~/cameo_motion_extension/
# pip3 install -e .
# jupyter serverextension enable --py cameo_motion_extension

# # Install server extension in editable mode
# cd ~/cameo_motion_extension/
# pip3 install -e .
# # Register server extension
# jupyter serverextension enable --py cameo_motion_extension
# # Install dependencies
# jlpm
# # Build Typescript source
# jlpm build
# # Install your development version of the extension with JupyterLab
# jupyter labextension install .
# # Rebuild Typescript source after making changes
# jlpm build
# # Rebuild JupyterLab after making any changes
# jupyter lab build


== 2020-10-25 22:32 Bowen Chiu ==
voila jupyterlab 已經整合成功
### voila jupyterlab
sudo apt-get -y install npm
pip3 install voila
jupyter labextension install @jupyter-voila/jupyterlab-preview
sudo chmod 777 /usr/
jupyter serverextension enable voila --sys-prefix

再來就是把 julia 1.5.2 安裝到 jupyterlab 裡面
done 已經成功安裝

== 2020-10-25 21:28 Bowen Chiu ==
實驗 voila 與 jupyterlab 整合的方法
jupyter labextension install @jupyter-voila/jupyterlab-preview
編譯 jupyterlab-preview 機器的記憶體必須從 2GB 擴充到 4GB 否則會當機
http://35.185.170.85:8080/voila

== 2020-10-25 Bowen Chiu ==
CAMEO Motion 這個專案是「智慧動圖」 AI Charts 的github，包含了所有工研院數據動圖案，所起始的 amcharts plotly aplexcharts，Motion有時間軸的意味（代表時間序列），Motion也有行動的意味（代表高效益行動），Motion也有互動圖表的意味，所以 Cameo Motion 這個產品就是卡米爾智慧動圖產品的代表專案。

2020-10-25 18:40 folder iek:
這個 folder 是為了工研院智慧動圖，滾動實驗所創建，裡面的東西尚未產品化，但是可以不停迭代，也可以上到 github

2020-10-25 19:15
done 已經把目前 dev caro 機器上的大部分成果上 github ok
todo 尚未安裝 jupyterlab 的試算表編輯器
todo 尚未進行 jupyterlab extension server 的研發，要繼續研發這個東西
