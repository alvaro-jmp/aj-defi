args="$1"

#Build all and serving (linux)
if [ "$args" = "1" ]; then
  node ./scripts/todo.js && chmod +x ./scripts/* && ./scripts/make_views.sh && source ./scripts/make_functions.sh && ./scripts/serving.sh

#Build all and serving (cywing and wsl)
elif [ "$args" = "2" ]; then
  node ./scripts/todo.js && chmod +x ./scripts/* && bash -ic "./scripts/make_views.sh && source ./scripts/make_functions.sh" && cmd.exe /C sh scripts/serving.sh

#Test (linux and (cywing and wsl) )
elif [ "$args" = "test" ]; then
  ./node_modules/.bin/mocha --timeout 999999 ./test/aj-bank-test.js

#For transpilate views and functions
elif [ "$args" = "views_fun" ]; then
  node ./scripts/todo.js && chmod +x make*.sh ./scripts/* && bash -ic "./scripts/make_views.sh && source ./scripts/make_functions.sh"

#For bad arguments case
else
  printf "bad argument, only arguments availables 1 2 test views_fun"

fi ;