const fs = require('fs')
const validator = require('validator')
const lengh_init = 0
const leng_end = (_file) => { return _file.length - 3 }
const view_path_es6 = './src/view/es6+'
const view_path_es5 = './src/view/es5'
const fun_view_path_es5 = './functions/view/es5'
const settings = { withFileTypes: true }
const exec_babel = './node_modules/.bin/babel'

const list_files_dirs = fs.readdirSync(view_path_es6, settings)

console.log('\nBuilding tasks ...\n---------->')

///////
// CODE TRANSPILATE VIEWS
// --------->

function building_views() {

  function preact_cli(file, folder, build_folder = file.substring(lengh_init, leng_end(file))) {
    return (
      `#Convert ${file} to common js incorporating preact for to use in client side rendering

cp -v ${view_path_es6}/${folder}/${file} ${view_path_es6}/${folder}/index.js && preact build --src ${view_path_es6}/${folder} --dest temp/${build_folder} --no-prerender --service-worker false --clean true && cp -v temp/${build_folder}/bundle*.js temp/res/js-views/${file} && rm -f ${view_path_es6}/${folder}/index.js && if [ -f etc/info_licenses_used.txt ] ; then cat etc/info_licenses_used.txt | cat - temp/res/js-views/${file} > temp00 && mv temp00 temp/res/js-views/${file} ; fi`
    )
  }

  function making_views() {

    const view_to_common_js = list_files_dirs.filter(
      elem => (
        elem.isDirectory() && (elem.name !== 'lib' && elem.name !== 'frame')
      )
    ).map(
      (dir) => {
        return (
          fs.readdirSync(`${view_path_es6}/${dir.name}`, settings)
            .filter(file => !file.isDirectory())
            .filter(file => (validator.matches(file.name, /^.+\.js$/)))
            .map(file => preact_cli(file.name, dir.name))
        )
      }
    ).reduce((acc, cv) => acc + '\n' + cv)

    return view_to_common_js
  }

  function init_process_bviews() {
    return `#Delete preset babel if exists

rm -f .babelrc

#Delete temp (temporal) folder and create new one and two subfolders

rm -rf temp && mkdir -p temp/res/js-views

${making_views()}`
  }

  function fix_public_folder() {
    return `#Adding static files as css, js, html, fonts to public folder in its respective assets folders

rm -rf public && mkdir -p public/assets/js public/assets/css public/assets/img public/assets/fonts && if [ "$(find etc/html -type f -name "*.html" 2>/dev/null)" ] ; then cp -v etc/html/* public/ ; fi && if [ "$(find etc/css -type f -name "*.css" 2>/dev/null)" ] ; then cp -v etc/css/*.css public/assets/css/ ; fi && if [ "$(find temp/res/js-views -type f -name "*.js" 2>/dev/null)" ] ; then cp -v temp/res/js-views/*.js public/assets/js/ ; fi && if [ "$(ls -A etc/fonts 2>/dev/null)" ] ; then cp -rv etc/fonts/* public/assets/fonts/ ; fi && CP_MFT_N_ICON='if [ "$(find etc/img -type f -name "manifest.json" 2>/dev/null)" ]; then cp -v etc/manifest.json public/; fi && if [ "$(find etc/img -type f -name "favicon.ico" 2>/dev/null)" ]; then cp -v etc/img/favicon.ico public/assets/img/; fi' && if [ "$(find etc/js -type f -name "*.js" 2>/dev/null)" ] ; then cp -v etc/js/*.js public/assets/js/ && eval $CP_MFT_N_ICON ; else eval $CP_MFT_N_ICON ; fi`
  }

  function delete_index_html() {
    return `#Delete index.html if exists

rm -rf public/index.html`
  }

  function views_to_es5() {
    return `#Convert views to es5 for use in server side rendering in controller

${exec_babel} ${view_path_es6} --out-dir ${view_path_es5} --ignore "./src/node_modules"  --presets=@babel/preset-env

#if folder view-es5 exists, copy its content in function
if [ "$(find ${view_path_es5} -type f -name "*.js" 2>/dev/null)" ] ; then rm -rf functions/view && mkdir -p ${fun_view_path_es5} && cp -rv ${view_path_es5}/* ${fun_view_path_es5}/ ; fi`
  }

  return `#!/bin/bash

printf "\x5cnTranspilate Views ...\x5cn---------->\x5cn"

${init_process_bviews()}

${fix_public_folder()}

${delete_index_html()}

${views_to_es5()}`
}

///////
// CODE TRANSPILATE FUNCTIONS
// --------->

function building_functions() {
  return `#!/bin/bash

printf "\x5cnTranspilate Functions ...\x5cn---------->\x5cn"

${exec_babel} src --out-dir functions --ignore "./src/node_modules","${view_path_es6}","${view_path_es5}" --presets=@babel/preset-env`
}

///////
// CODE SERVING
// --------->

const serving =
  `#!/bin/bash
printf "\x5cnServing ...\x5cn---------->\x5cn"

firebase serve --only hosting,functions --port 5000 --host 0.0.0.0`

///////
// CODE ETC
// --------->

const make_all = './make_views.sh && ./make_functions.sh && ./serving.sh'

const bash_files = [
  {
    'name': 'make_views.sh',
    'sh': building_views()
  }
  ,
  {
    'name': 'make_functions.sh',
    'sh': building_functions()
  }
  ,
  {
    'name': 'serving.sh',
    'sh': serving
  }
  ,
  {
    'name': 'make_all.sh',
    'sh': make_all
  }
]

const wf = (name, cmd) => new Promise((resolve, reject) => {
  fs.writeFile(name, cmd, (err) => {
    if (err) reject(`Error writing file:${name}`)
    else resolve(`Writed file:${name} successful`)
  })
})

const to_do = async () => {
  for (const f of bash_files) {
    try {
      const x = await wf(f.name, f.sh)
      console.log(x)
    } catch (e) { console.log(`e:${e}`) }
  }
}

to_do()