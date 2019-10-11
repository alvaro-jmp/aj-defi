#!/bin/bash

args="$1"

function _build() {
    node ./scripts/todo.js
    chmod +x ./scripts/*
    ./scripts/make_views.sh
    source ./scripts/make_functions.sh
}

#Build all and serving (linux)
if [ "$args" = "build-serve" ]
then
    _build
    ./scripts/serving.sh  
   
    #For transpilate views and functions version 2
elif [ "$args" = "build" ]
then
    _build
    
    #Test (linux and (cywing and wsl) )
elif [ "$args" = "test" ]
then
    ./node_modules/.bin/mocha --timeout 999999 ./test/aj-bank-test.js
    
    #For bad arguments case
else
    printf "bad argument, only arguments availables: build build-serve test"
    
fi
