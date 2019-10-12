#!/bin/bash
printf "\nServing ...\n---------->\n"

./node_modules/.bin/firebase serve --only hosting,functions --port 5000 --host 0.0.0.0