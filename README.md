---
2020-12-01 10:05 caro
成功將 carousel 元件包 cameo-run
---

2020-11-29 11:46 Bowen
已經有 cameo-common, 而且跑跑圖已經是 load 數字 data.csv
todo 缺 meta.csv 處理
todo 缺 icon img 處理

---

2020-11-29 10:10 Bowen
如果在狗三八不好複製 cameo-run to src 那可以直接在 local machine 做，再 push

---

2020-11-29 09:55 Bowen
衝突了，這是狗三八修改

---

2020-11-28 11:45 Bowen
把命名，底線全部調整為減號，原因是可能檔名一下減號一下底線會搞錯

已經把最新的 load_js_async 調整到 github 目錄

cameo-line-column
已經找到子目錄讀取檔案錯誤的原因，原因是 /../ 需要蓋掉原本的 src/index.html 才能讀取到 data/xxx.csv

---

2020-11-28 10:48 Bowen 已經可以在狗三八與 github 連結互動，測試網址要在右邊打入：
https://fxsi5.csb.app/user/baby/am-divergent-stacked-bars/index.html

---

2020-11-28 10:44 Bowen
下面網址已經有檔案可以看到內容（透過 genie)
http://iek.cameo.tw:18866/cameo_motion/user/baby/am-divergent-stacked-bars/js/am-divergent-stacked-bars.js

下面網址已經可以測試網頁有圖表
http://iek.cameo.tw:18866/cameo_motion/user/baby/am-divergent-stacked-bars/index.html

---

2020-11-28 10:17 Bowen
測試網址已經改為
http://iek.cameo.tw:18866/cameo_motion/user/baby/am-divergent-stacked-bars/index.html
事先 push 備份，因為要 browser 讓出不來的 baby/am-divergent-stacked-bars 要能出來

---

== 2020-11-20 00:21 Bowen Chiu ==
import 的地方已經整理完畢

== 2020-11-19 23:59 Bowen Chiu ==
已經讓 src 底下可以跑 genie 以及 cameo-line-column 也可以測試，但程式碼在 import 的地方需要再整理

== 2020-11-19 22:55 Bowen Chiu ==
已經整理好相關目錄，準備要提供給所有夥伴使用，每個人都在自己的名字底下開發，不要影響到別人，要提升到上層共用的話必須經過主研發 RD 同意
目前 2020-11-19 22:56 主研發 RD 協調夥伴為：bowen

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
CAMEO Motion 這個專案是「智慧動圖」 AI Charts 的 github，包含了所有工研院數據動圖案，所起始的 amcharts plotly aplexcharts，Motion 有時間軸的意味（代表時間序列），Motion 也有行動的意味（代表高效益行動），Motion 也有互動圖表的意味，所以 Cameo Motion 這個產品就是卡米爾智慧動圖產品的代表專案。

2020-10-25 18:40 folder iek:
這個 folder 是為了工研院智慧動圖，滾動實驗所創建，裡面的東西尚未產品化，但是可以不停迭代，也可以上到 github

2020-10-25 19:15
done 已經把目前 dev caro 機器上的大部分成果上 github ok
todo 尚未安裝 jupyterlab 的試算表編輯器
todo 尚未進行 jupyterlab extension server 的研發，要繼續研發這個東西
