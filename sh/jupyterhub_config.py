c.JupyterHub.bind_url = 'http://:3801'
c.Authenticator.admin_users = {'cameo','iek'}
c.PAMAuthenticator.admin_groups = {'sudo'}
c.LocalAuthenticator.create_system_users = True
c.Spawner.default_url = '/lab'

