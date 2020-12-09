c.JupyterHub.bind_url = 'http://:3800'
c.Authenticator.admin_users = {'cameo'}
c.PAMAuthenticator.admin_groups = {'sudo'}
c.LocalAuthenticator.create_system_users = True

c.Spawner.default_url = '/lab'