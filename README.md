== 2020-10-25 22:44 Bowen Chiu ==
希望可以透過 js url 直接讀取 tornado csv 檔案而不需要透過其他的方法 genie server 之類的

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
