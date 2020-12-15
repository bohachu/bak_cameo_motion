# ref https://github.com/jupyterhub/ldapauthenticator/issues/54
# Set ownership to the administrator and sharedfolder group
# /srv/data/share_data_analysts
echo "Cammand: ./sharefolder <username>"
sudo usermod -aG analysts $USER

echo "user account: $1";

sudo usermod -aG analysts $1

sudo ln -s /srv/data/share_data_analysts /home/$1/share_data_analysts
# sudo chown -R :analysts share_data_analysts
# sudo chown $USER:analysts /home/$1/share_data_analysts
sudo chmod 777 -R /home/$USER/share_data_analysts
# sudo chown -R folderadmin:sharedfolder /home/sharedfolder

# # Set the setguid bit
# sudo chmod g+s /home/sharedfolder

# # Apply the correct group permissions to the folder
# sudo chmod -R g+rwX /home/sharedfolder

# # Make sure all new files added to the folder get the right permissions
# sudo setfacl -d -m g:sharedfolder:rwX /home/sharedfolder