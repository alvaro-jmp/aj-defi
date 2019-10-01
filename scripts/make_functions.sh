#!/bin/bash

printf "\nTranspilate Functions ...\n---------->\n"

#removing older files and folders except node_modules, package.json, package-lock.json

cd functions && rm -rf !(node_modules|package.json|package-lock.json) && cd ..

./node_modules/.bin/babel src --out-dir functions --config-file ./etc/cfg_babel/custom_functions_babelrc.jsonc

cp -v src/model/aj-bank-firebase-adminsdk-service-account.json functions/model/