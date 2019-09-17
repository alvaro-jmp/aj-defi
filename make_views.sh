#!/bin/bash

printf "\nTranspilate Views ...\n---------->\n"

#Delete preset babel if exists

rm -f .babelrc

#Delete temp (temporal) folder and create new one and two subfolders

rm -rf temp && mkdir -p temp/res/js-views


#Convert v_home.js to common js incorporating preact for to use in client side rendering

cp -v ./src/view/es6+/home/v_home.js ./src/view/es6+/home/index.js && preact build --src ./src/view/es6+/home --dest temp/v_home --no-prerender --service-worker false --clean true && cp -v temp/v_home/bundle*.js temp/res/js-views/v_home.js && rm -f ./src/view/es6+/home/index.js && if [ -f etc/info_licenses_used.txt ] ; then cat etc/info_licenses_used.txt | cat - temp/res/js-views/v_home.js > temp00 && mv temp00 temp/res/js-views/v_home.js ; fi

#Adding static files as css, js, html, fonts to public folder in its respective assets folders

rm -rf public && mkdir -p public/assets/js public/assets/css public/assets/img public/assets/fonts && if [ "$(find etc/html -type f -name "*.html" 2>/dev/null)" ] ; then cp -v etc/html/* public/ ; fi && if [ "$(find etc/css -type f -name "*.css" 2>/dev/null)" ] ; then cp -v etc/css/*.css public/assets/css/ ; fi && if [ "$(find temp/res/js-views -type f -name "*.js" 2>/dev/null)" ] ; then cp -v temp/res/js-views/*.js public/assets/js/ ; fi && if [ "$(ls -A etc/fonts 2>/dev/null)" ] ; then cp -rv etc/fonts/* public/assets/fonts/ ; fi && CP_MFT_N_ICON='if [ "$(find etc/img -type f -name "manifest.json" 2>/dev/null)" ]; then cp -v etc/manifest.json public/; fi && if [ "$(find etc/img -type f -name "favicon.ico" 2>/dev/null)" ]; then cp -v etc/img/favicon.ico public/assets/img/; fi' && if [ "$(find etc/js -type f -name "*.js" 2>/dev/null)" ] ; then cp -v etc/js/*.js public/assets/js/ && eval $CP_MFT_N_ICON ; else eval $CP_MFT_N_ICON ; fi

#Delete index.html if exists

rm -rf public/index.html

#Convert views to es5 for use in server side rendering in controller

./node_modules/.bin/babel ./src/view/es6+ --out-dir ./src/view/es5 --ignore "./src/node_modules"  --presets=@babel/preset-env

#if folder view-es5 exists, copy its content in function
if [ "$(find ./src/view/es5 -type f -name "*.js" 2>/dev/null)" ] ; then rm -rf functions/view && mkdir -p ./functions/view/es5 && cp -rv ./src/view/es5/* ./functions/view/es5/ ; fi