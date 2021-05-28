#!/bin/bash

node --version > /dev/null || sudo apt install nodejs -y

npm -v > /dev/null || sudo apt install npm -y

npm init -y

npm install --save express