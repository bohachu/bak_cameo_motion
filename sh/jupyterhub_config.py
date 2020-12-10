# Native Authenticator ref https://blog.jupyter.org/simpler-authentication-for-small-scale-jupyterhubs-with-nativeauthenticator-999534c77a09
# https://native-authenticator.readthedocs.io/en/latest/index.html
# https://github.com/jupyterhub/ldapauthenticator/issues/54

# TODO jupyterhub_config.py 需要設定建立新使用者時, 自動加入group以及連結上述資料夾到home目錄中

from nativeauthenticator import NativeAuthenticator
# nativeauthenticator

from jupyter_client.localinterfaces import public_ips
import os, sys, subprocess
c = get_config()
pwd = os.path.dirname(__file__)
whitelist = set()
admin = set()
with open(os.path.join(pwd, 'userlist')) as f:
    for line in f:
        if not line:
            continue
        parts = line.split()
        name = parts[0]
        whitelist.add(name)
        if len(parts) > 1 and parts[1] == 'admin':
            admin.add(name)


config_dir = os.path.dirname(os.path.abspath(__file__)) 
class MyAuthenticator(NativeAuthenticator):   
    def add_user(self, user):             
        super().add_user(user)
        script_path = os.path.join(config_dir, "add_user.sh")      
        subprocess.check_call(['bash', script_path, user.name])

# c.JupyterHub.authenticator_class = 'nativeauthenticator.NativeAuthenticator'
c.JupyterHub.authenticator_class = MyAuthenticator 
# Whitlelist users and admins
c.Authenticator.whitelist = whitelist

c.JupyterHub.admin_access = True
c.JupyterHub.upgrade_db = True

c.JupyterHub.bind_url = 'http://:3801'
c.Authenticator.admin_users = {'cameo','iek'}

c.PAMAuthenticator.admin_groups = {'sudo'}
c.LocalAuthenticator.create_system_users = True

c.Authenticator.minimum_password_length = 8
c.Authenticator.check_common_password = True
c.Authenticator.allowed_failed_logins = 3
c.Authenticator.seconds_before_next_try = 1200
c.Authenticator.open_signup = True
c.Authenticator.ask_email_on_signup = True
c.JupyterHub.ssl_key = '/var/ssl/private.key'
c.JupyterHub.ssl_cert = '/var/ssl/certificate.crt'
# data_dir = os.environ.get('DATA_VOLUME_CONTAINER', '/data')
# c.JupyterHub.data_files_path = '/opt/jupyterhub/share/jupyterhub'
data_dir = "/srv/data/"
c.Spawner.default_url = '/lab'
c.JupyterHub.db_url = 'postgresql://postgres:{password}@{host}/{db}'.format(
        host=os.environ['POSTGRES_HOST'],
        password=os.environ['POSTGRES_PASSWORD'],
        db=os.environ['POSTGRES_DB'],)

