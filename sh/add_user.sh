#!/usr/bin/env bash
# https://github.com/jupyterhub/ldapauthenticator/issues/54

user=$1  
# userhome="/home/ad-domain/${user}"
userhome="/home/${user}"

# add_user should be idempotent, so we test if the user home directory is there
if [ ! -d "${userhome}" ]; then    

     # Use realmd to add the user with passwd = username
     # realm permit ${user}                   
     sudo useradd -p $(openssl passwd -6 ${user}) -G analysts  ${user} 

     if [ ! -d "${userhome}" ]; then 
          # Create home directory       
          sudo mkdir -p "${userhome}"             
     fi 
     # chown "${user}:domain users" "${userhome}"   
     sudo chown -R "${user}:analysts" "${userhome}"   

     # Add user to the sharedfolder group
     # usermod -aG sharedfolder ${user}
     sudo usermod -aG analysts ${user}

     # Create notebook directory and symlink the datalab folder into it
     sudo mkdir -p ${userhome}/notebooks  
     # chown ${user}:domain\ users ${userhome}/notebooks -R  
     sudo chown -R ${user}:analysts ${userhome}/notebooks 

     # Symlink a shared folder into the user notebook directory
     # ln -s /home/sharedfolder ${userhome}/notebooks/sharedfolder
     sudo ln -s /srv/data/share_data_analysts  /home/${user}/share_data_analysts  

fi     