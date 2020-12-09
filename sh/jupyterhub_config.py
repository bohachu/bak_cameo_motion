# Native Authenticator ref https://blog.jupyter.org/simpler-authentication-for-small-scale-jupyterhubs-with-nativeauthenticator-999534c77a09
# https://native-authenticator.readthedocs.io/en/latest/index.html

from jupyter_client.localinterfaces import public_ips
import os
import sys
c = get_config()

c.JupyterHub.bind_url = 'http://:3801'
c.Authenticator.admin_users = {'cameo','iek'}
c.PAMAuthenticator.admin_groups = {'sudo'}
c.LocalAuthenticator.create_system_users = True
c.Spawner.default_url = '/lab'

c.JupyterHub.authenticator_class = 'nativeauthenticator.NativeAuthenticator'
c.Authenticator.minimum_password_length = 8
c.Authenticator.check_common_password = True
c.Authenticator.allowed_failed_logins = 3
c.Authenticator.seconds_before_next_try = 1200
c.Authenticator.open_signup = True
c.Authenticator.ask_email_on_signup = True

# data_dir = os.environ.get('DATA_VOLUME_CONTAINER', '/data')
data_dir = "/srv/data/"

c.JupyterHub.db_url = 'postgresql://postgres:{password}@{host}/{db}'.format(
        host=os.environ['POSTGRES_HOST'],
        password=os.environ['POSTGRES_PASSWORD'],
        db=os.environ['POSTGRES_DB'],)

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

# Whitlelist users and admins
c.Authenticator.whitelist = whitelist
c.Authenticator.admin_users = {'admin', 'cameo'}
c.JupyterHub.admin_access = True
c.JupyterHub.upgrade_db = True