#!/bin/bash

printf "\nTranspilate Functions ...\n---------->\n"

./node_modules/.bin/babel src --out-dir functions --ignore "./src/node_modules","./src/view/es6+","./src/view/es5" --presets=@babel/preset-env