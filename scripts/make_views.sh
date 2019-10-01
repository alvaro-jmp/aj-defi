#!/bin/bash

printf "\nTranspilate Views ...\n---------->\n"

#Delete temp (temporal) folder and create new one and two subfolders

rm -rf ./temp && mkdir -p ./temp/res/js-views

#Transpilate using babel view path to commonjs for ssr purpose

./node_modules/.bin/babel ./src/view/es6+ --out-dir ./src/view/common_js --config-file ./etc/cfg_babel/custom_view_babelrc.jsonc

#Transpilate v_dashboard.js to commonjs minified using preact cli for to use in client side rendering and get source maps, polyfills, etc

if [ -f ./src/view/es6+/dashboard/index.js ]; then rm -f ./src/view/es6+/dashboard/index.js; fi && cp -v ./src/view/es6+/dashboard/v_dashboard.js ./src/view/es6+/dashboard/index.js && preact build --src ./src/view/es6+/dashboard --dest ./temp/v_dashboard --service-worker false --clean true --no-prerender

if [ -f ./etc/info_licenses_used.txt ] ; then cat ./etc/info_licenses_used.txt | cat - ./temp/v_dashboard/bundle*.js > ./temp/v_dashboard/temp && mv -v ./temp/v_dashboard/temp ./temp/v_dashboard/bundle*.js ; fi 

cp -v ./temp/v_dashboard/bundle*.js ./temp/res/js-views/ && cp -v ./temp/v_dashboard/polyfills*.js ./temp/res/js-views/ 

if [ -f ./src/view/es6+/dashboard/index.js ]; then rm -f ./src/view/es6+/dashboard/index.js; fi && bundle_n_polyfills=$(cat ./temp/v_dashboard/index.html | grep -oE '<body>.+</body>') && ssr=$(node ./scripts/ssr_v_dashboard.js) && sed -e "s@<body>.*</body>@$bundle_n_polyfills@" -e "s@/bundle@/assets/js/bundle@" -e "s@/polyfills@/assets/js/polyfills@" -e "s@</script>')@<\\\\\\\\\\\\\/script>')@" -e "s@<body>@<body>$ssr@" ./src/view/es6+/preact_templates/template_v_dashboard.js > ./src/view/es6+/preact_templates/temp && cp -v ./src/view/es6+/preact_templates/temp ./src/view/es6+/preact_templates/template_v_dashboard.js && rm -f ./src/view/es6+/preact_templates/temp


#Transpilate v_home.js to commonjs minified using preact cli for to use in client side rendering and get source maps, polyfills, etc

if [ -f ./src/view/es6+/home/index.js ]; then rm -f ./src/view/es6+/home/index.js; fi && cp -v ./src/view/es6+/home/v_home.js ./src/view/es6+/home/index.js && preact build --src ./src/view/es6+/home --dest ./temp/v_home --service-worker false --clean true --no-prerender

if [ -f ./etc/info_licenses_used.txt ] ; then cat ./etc/info_licenses_used.txt | cat - ./temp/v_home/bundle*.js > ./temp/v_home/temp && mv -v ./temp/v_home/temp ./temp/v_home/bundle*.js ; fi 

cp -v ./temp/v_home/bundle*.js ./temp/res/js-views/ && cp -v ./temp/v_home/polyfills*.js ./temp/res/js-views/ 

if [ -f ./src/view/es6+/home/index.js ]; then rm -f ./src/view/es6+/home/index.js; fi && bundle_n_polyfills=$(cat ./temp/v_home/index.html | grep -oE '<body>.+</body>') && ssr=$(node ./scripts/ssr_v_home.js) && sed -e "s@<body>.*</body>@$bundle_n_polyfills@" -e "s@/bundle@/assets/js/bundle@" -e "s@/polyfills@/assets/js/polyfills@" -e "s@</script>')@<\\\\\\\\\\\\\/script>')@" -e "s@<body>@<body>$ssr@" ./src/view/es6+/preact_templates/template_v_home.js > ./src/view/es6+/preact_templates/temp && cp -v ./src/view/es6+/preact_templates/temp ./src/view/es6+/preact_templates/template_v_home.js && rm -f ./src/view/es6+/preact_templates/temp



#Adding static files as css, js, html, fonts to public folder in its respective assets folders

rm -rf public && mkdir -p ./public/assets/js ./public/assets/css ./public/assets/img ./public/assets/fonts && if [ "$(find ./etc/html -type f -name "*.html" 2>/dev/null)" ] ; then cp -v ./etc/html/* ./public/ ; fi && if [ "$(find ./etc/css -type f -name "*.css" 2>/dev/null)" ] ; then cp -v ./etc/css/*.css ./public/assets/css/ ; fi && if [ "$(find ./temp/res/js-views -type f -name "*.js" 2>/dev/null)" ] ; then cp -v ./temp/res/js-views/*.js ./public/assets/js/ ; fi && if [ "$(ls -A ./etc/fonts 2>/dev/null)" ] ; then cp -rv ./etc/fonts/* ./public/assets/fonts/ ; fi && CP_MFT_N_ICON='if [ "$(find ./etc/img -type f -name "manifest.json" 2>/dev/null)" ]; then cp -v ./etc/manifest.json ./public/; fi && if [ "$(find ./etc/img -type f -name "favicon.ico" 2>/dev/null)" ]; then cp -v ./etc/img/favicon.ico ./public/assets/img/; fi' && if [ "$(find ./etc/js -type f -name "*.js" 2>/dev/null)" ] ; then cp -v ./etc/js/*.js ./public/assets/js/ && eval $CP_MFT_N_ICON ; else eval $CP_MFT_N_ICON ; fi

#Delete index.html if exists

rm -rf ./public/index.html