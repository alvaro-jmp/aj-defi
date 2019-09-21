#!/bin/bash

printf "\nTranspilate Functions ...\n---------->\n"

#removing older files and folders except node_modules, package.json, package-lock.json

cd functions && rm -rf !(node_modules|package.json|package-lock.json) && cd ..

./node_modules/.bin/babel src --out-dir functions --ignore "./src/node_modules","../src/view/es6+/home","../src/view/es6+/lib","../src/view/es6+/dashboard" --presets=@babel/preset-env

cp -v src/model/aj-bank-firebase-adminsdk-service-account.json functions/model/