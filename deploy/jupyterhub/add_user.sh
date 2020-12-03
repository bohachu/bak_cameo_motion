#!/usr/bin/env bash
# https://github.com/jupyterhub/ldapauthenticator/issues/54

user=$1  
# userhome="/home/ad-domain/${user}"
userhome="/home/analysts/${user}"

# add_user should be idempotent, so we test if the user home directory is there
if [ ! -d "${userhome}" ]; then    

     # Use realmd to add the user
     realm permit ${user}                   

     # Create home directory       
     mkdir "${userhome}"              
     # chown "${user}:domain users" "${userhome}"   
     chown "${user}:analysts" "${userhome}"   

     # Add user to the sharedfolder group
     usermod -aG sharedfolder ${user}

     # Create notebook directory and symlink the datalab folder into it
     mkdir ${userhome}/notebooks  
     # chown ${user}:domain\ users ${userhome}/notebooks -R  
     chown ${user}:analysts\ users ${userhome}/notebooks -R  

     # Symlink a shared folder into the user notebook directory
     ln -s /home/sharedfolder ${userhome}/notebooks/sharedfolder
fi     