# should be run in docker, with volume
sudo mkdir -p /srv/scratch
sudo chown root:jupyterhub-users /srv/scratch
sudo chmod 777 /srv/scratch
sudo chmod g+s /srv/scratch

# TODO link data to analysts' home dir
sudo ln -s /srv/scratch /etc/skel/scratch

