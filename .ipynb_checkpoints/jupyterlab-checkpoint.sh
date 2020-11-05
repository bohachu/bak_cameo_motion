export SHELL=/bin/bash
nohup python3 -m jupyterlab --ContentsManager.allow_hidden=True --port 8080 --ip 0.0.0.0 &
