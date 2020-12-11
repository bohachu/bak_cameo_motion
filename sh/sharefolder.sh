# ref https://github.com/jupyterhub/ldapauthenticator/issues/54
# Set ownership to the administrator and sharedfolder group
# /srv/data/share_data_analysts

sudo usermod -aG analysts $USER

sudo ln -s /srv/data/share_data_analysts ~/share_data_analysts
sudo chown -R :analysts share_data_analysts
sudo chmod 770 -R share_data_analysts

# sudo chown -R folderadmin:sharedfolder /home/sharedfolder

# # Set the setguid bit
# sudo chmod g+s /home/sharedfolder

# # Apply the correct group permissions to the folder
# sudo chmod -R g+rwX /home/sharedfolder

# # Make sure all new files added to the folder get the right permissions
# sudo setfacl -d -m g:sharedfolder:rwX /home/sharedfolder