## install jupyterlab
sudo apt-get -y install joe
sudo apt-get -y install git
sudo apt-get -y install python3-pip
sudo apt-get -y install htop
pip3 install jupyterlab
export PATH="/bin:/usr/bin:/usr/local/bin:/home/bohachu/.local/bin:/home/bohachu/julia-1.5.2/bin/julia"

## please use google cloud platform SSH to install
## jupyterlab's terminal can not install (sudo permission problem)
sudo apt-get -y install wget

## install julia
cd ~
wget https://julialang-s3.julialang.org/bin/linux/x64/1.5/julia-1.5.2-linux-x86_64.tar.gz
tar xvfz julia-1.5.2-linux-x86_64.tar.gz
cd /usr/local/bin/
sudo ln -s ~/julia-1.5.2/bin/julia julia

## install pandas
pip3 install pandas

## voila jupyterlab
pip3 install ipywidgets
jupyter labextension install @jupyter-widgets/jupyterlab-manager
jupyter labextension install spreadsheet-editor
sudo apt-get -y install npm
pip3 install voila
python3 -m jupyter labextension install @jupyter-voila/jupyterlab-preview
sudo chmod 777 /usr/
jupyter serverextension enable voila --sys-prefix

## jupyterlab julia 
julia -e 'import Pkg; Pkg.add("IJulia"); Pkg.build("IJulia"); using IJulia; notebook(detached=true);'

## install julia genie
julia -e 'import Pkg; Pkg.add("PackageCompiler");using PackageCompiler;Pkg.add("Genie");@time using Genie;@time PackageCompiler.create_sysimage(:Genie; replace_default=true)'

## interact.jl
julia -e 'using Pkg;Pkg.add("Interact");Pkg.add("IJulia");Pkg.add("WebIO")'
julia -e 'using WebIO; using Interact; WebIO.install_jupyter_labextension();'

## github
git config --global user.email "cbh@cameo.tw"
git config --global user.name "bohachu"
git config --global credential.helper cache
git config --global credential.helper store
cd ~
git clone https://github.com/bohachu/cameo_motion.git

## add to: crontab -e 
# @reboot 
# /home/bohachu/cameo_motion/jupyterlab.sh

## deno
curl -fsSL https://deno.land/x/install/install.sh | sh
cd /usr/local/bin/
sudo ln -s /home/bohachu/.deno/bin/deno deno

