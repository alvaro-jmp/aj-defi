#!/bin/bash

printf "\nTranspilate Functions ...\n---------->\n"

#@@@@@@@@@@@
# removing older files and folders except node_modules, package.json, package-lock.json
#--------->

cd ./functions

regex_files_n_folder='grep -v -E (node_modules|package.json|package-lock.json)'

echo "removing files and folders:"
ls -lah | $regex_files_n_folder

filtered_list=$(ls | $regex_files_n_folder)

rm -rf $filtered_list #deleting files and folders https://unix.stackexchange.com/a/154067/379766

cd .. 

#@@@@@@@@@@@
# transpilate src folder to function accoring to configuration on .etc/cfg_babel/custom_functions_babelrc.jsonc
#--------->

./node_modules/.bin/babel ./src --out-dir ./functions --config-file ./etc/cfg_babel/custom_functions_babelrc.jsonc