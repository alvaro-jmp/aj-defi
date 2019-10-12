#!/bin/bash

printf "\nTranspilate Functions ...\n---------->\n"

#removing older files and folders except node_modules, package.json, package-lock.json

cd ./functions
rm -rf !(node_modules|package.json|package-lock.json)
cd .. 

#transpilate src folder to function accoring to configuration on .etc/cfg_babel/custom_functions_babelrc.jsonc
./node_modules/.bin/babel ./src --out-dir ./functions --config-file ./etc/cfg_babel/custom_functions_babelrc.jsonc

#copy service account information file to functions/model
cp -v src/model/aj-bank-firebase-adminsdk-service-account.json functions/model/