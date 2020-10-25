### install jupyterlab
#sudo apt-get -y install joe
#sudo apt-get -y install git
#sudo apt-get -y install python3-pip
#sudo apt-get -y install htop
#pip3 install jupyterlab

### please use google cloud platform SSH to install
### jupyterlab's terminal can not install (sudo permission problem)
#sudo apt-get -y install wget

### install julia
#cd ~
#wget https://julialang-s3.julialang.org/bin/linux/x64/1.5/julia-1.5.2-linux-x86_64.tar.gz
#tar xvfz julia-1.5.2-linux-x86_64.tar.gz
#cd ~/.local/bin
#ln -s ~/julia-1.5.2/bin/julia julia

### install julia genie
#julia -e 'import Pkg; Pkg.add("Genie"); using Genie;'

### install pandas
#pip3 install pandas

### voila jupyterlab
#sudo apt-get -y install npm
#pip3 install voila
#jupyter labextension install @jupyter-voila/jupyterlab-preview
#sudo chmod 777 /usr/
#jupyter serverextension enable voila --sys-prefix

### jupyterlab julia 
#julia -e 'import Pkg; Pkg.add("IJulia"); Pkg.build("IJulia"); using IJulia; notebook(detached=true);'

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
cd ~/cameo_motion_extension/
pip3 install -e .
# # Register server extension
jupyter serverextension enable --py cameo_motion_extension
# # Install dependencies
# jlpm
# # Build Typescript source
# jlpm build
# # Install your development version of the extension with JupyterLab
jupyter labextension install .
# # Rebuild Typescript source after making changes
# jlpm build
# # Rebuild JupyterLab after making any changes
jupyter lab build

