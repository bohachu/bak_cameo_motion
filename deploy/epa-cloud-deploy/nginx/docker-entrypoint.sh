#!/bin/sh
set -e

if [ $? -eq 0 ]
then
    exec "$@"
fi
