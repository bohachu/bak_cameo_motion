#!/bin/bash

# 啟動jupyterhub服務; 需要重開機才會生效
sudo systemctl daemon-reload
sudo systemctl enable jupyterhub.service
sudo systemctl start jupyterhub.service

# 設定postgresql


# 設定postgresql
sudo su - postgres
# in postgres
POSTGRES_PASSWORD=Q!w2e3r4
# The PostgreSQL service is started and set to come up after every system reboot.
# The PostgreSQL service is started and set to come up after every system reboot.
psql -c "alter user postgres with password '$POSTGRES_PASSWORD'"

# Start a postgres daemon, ignoring log output.
# gosu postgres pg_ctl start -w -l /dev/null
pg_ctl start -w -l /dev/null

# Create a Jupyterhub user and database.
# gosu postgres psql -c "CREATE DATABASE jupyterhub;"
# gosu postgres psql -c "CREATE USER jupyterhub WITH ENCRYPTED PASSWORD '$JPY_PSQL_PASSWORD';"
# gosu postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE jupyterhub TO jupyterhub;"
psql -c "CREATE DATABASE jupyterhub;"
psql -c "CREATE USER jupyterhub WITH ENCRYPTED PASSWORD '$JPY_PSQL_PASSWORD';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE jupyterhub TO jupyterhub;"

# Alter pg_hba.conf to actually require passwords.  The default image exposes
# allows any user to connect without requiring a password, which is a liability
# if this is run forwarding ports from the host machine.
sed -ri -e 's/(host all all 0.0.0.0\/0 )(trust)/\1md5/' "$PGDATA"/pg_hba.conf

# Stop the daemon.  The root Dockerfile will restart the server for us.
# gosu postgres pg_ctl stop -w
sudo systemctl restart jupyterhub.service