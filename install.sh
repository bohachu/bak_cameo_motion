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
# pip3 install voila
# jupyter labextension install @jupyter-voila/jupyterlab-preview
# sudo chmod 777 /usr/
# jupyter serverextension enable voila --sys-prefix

### jupyterlab julia 
#julia -e 'import Pkg; Pkg.add("IJulia"); Pkg.build("IJulia"); using IJulia; notebook(detached=true);'


