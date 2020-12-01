# Jupyterhub docker

# Cameo motion打包相關-規劃中

## 1. Docker 打包指令
### docker build -f cameo_motion/docker/Dockerfile -t asia.gcr.io/cameoflow/cameo_motion:{version}.{date}{serial} .
> 不要漏掉最後的 "."
#### 001 需在 cameo_motion 上一層呼叫
#### 002 tag 規則: asia.gcr.io/cameoflow/cameo_motion:{version}.{date}{serial}
- version: 版本號，如：0.1.0
- date: 日期 yyyymmdd，如：20201126
- serial: 打包當日第幾次打包，如：01


## 2. 打包好測試沒問題的 docker image 須上傳到 gcr.io 以方便署內部署ˋ
### gcloud docker -- push asia.gcr.io/cameoflow/cameo_motion:{version}.{date}{serial}

google container registry 此專案的控制台網址
https://console.cloud.google.com/gcr/images/cameoflow?project=cameoflow

# Reference
main reference: https://github.com/bohachu/iot_turbo/blob/master/docker/Dockerfile

python base image : https://hub.docker.com/_/python/

nbextension,labextension serverextension https://blog.jupyter.org/99-ways-to-extend-the-jupyter-ecosystem-11e5dab7c54