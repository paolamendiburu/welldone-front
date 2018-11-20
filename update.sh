#!/bin/bash

git pull && \
cd build
cp * -rf /home/welldone/backend/static/
circusctl restart welldone




