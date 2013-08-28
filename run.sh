#!/bin/bash

# start mongodb

cd /users/braun/desktop/mongodb/bin
sudo ./mongod&

cd /users/braun/desktop/microMrp
node main.js
