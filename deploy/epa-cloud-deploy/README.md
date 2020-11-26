# epa-cloud
環境雲的相關程式會放這裡

**沒有 Review Policy，放到 master branch 即可**

## 目錄架構

* [bin](bin/) - 小工具、執行檔
* [ckan](ckan/) - 官方 ckan repo，使用 git submodule，目前鎖定在 ckan-2.8.2
* [ckanext](ckanext/) - 各式 ckan 所需要的 extension
* [ckan-plugin](ckan-plugin/) - Cameo 客製化 plugin
* [docs](docs/) - 說明文件
* [k8s](k8s/) - ckan k8s resources 檔案
* [epa_ckan](epa_ckan/) - 跟 CKAN 有關的 Package 及 Module，包括：資料匯入、OD Metadata 存取

## 文件

* [使用 git submodule for ckan](docs/how-to-use-git-submodule.md)
* [Build ckan image](docs/build-ckan-image.md)

