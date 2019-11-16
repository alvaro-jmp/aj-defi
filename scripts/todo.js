const cwd_folder = 'scripts'
process.chdir(`./${cwd_folder}`)
const fs = require('fs')
// const validator = require('validator')
const lengh_init = 0
const leng_end = (_file) => { return _file.length - 3 }
const view_path_es6 = '../src/view/es6+'
const view_path_es6_2 = './src/view/es6+'
const view_path_common_js = './src/view/common_js'
const preact_template_folder = './src/view/es6+/preact_templates'
const settings_file = { withFileTypes: true }
const exec_babel = './node_modules/.bin/babel'
const scripts_folder = '../scripts'
const temp_folder = './temp'
const public_folder = './public'
const etc_folder = './etc'
const f_custom_views_babelrc = './etc/cfg_babel/custom_view_babelrc.jsonc'
const f_custom_functions_babelrc = './etc/cfg_babel/custom_functions_babelrc.jsonc'
const list_files_dirs = fs.readdirSync(view_path_es6, settings_file)
const ignores_folders = (_elem) => {
  return (_elem.name !== 'lib' && _elem.name !== 'frame' && _elem.name !== 'preact_templates' && _elem.name !== 'test')
}

const { building_views } = require('./views/building_views')

///////
// PRINT BUILDING BASH FILES MESSAGE
// --------->

console.log('\nBuilding bash files ...\n---------->')


///////
// CODE TRANSPILATE FUNCTIONS
// --------->

function building_functions() {
  return `#!/bin/bash

printf "\x5cnTranspilate Functions ...\x5cn---------->\x5cn"

#removing older files and folders except node_modules, package.json, package-lock.json

cd ./functions
rm -rf !(node_modules|package.json|package-lock.json)
cd .. 

#transpilate src folder to function accoring to configuration on .etc/cfg_babel/custom_functions_babelrc.jsonc
${exec_babel} ./src --out-dir ./functions --config-file ${f_custom_functions_babelrc}`
}

///////
// CODE SERVING
// --------->

const serving =
  `#!/bin/bash
printf "\x5cnServing ...\x5cn---------->\x5cn"

./node_modules/.bin/firebase serve --only hosting,functions --port 5000 --host 0.0.0.0`

///////
// CODE ETC
// --------->

const bash_files = [
  {
    'name': 'make_views.sh',
    'sh': building_views(lengh_init, leng_end, view_path_es6, view_path_es6_2, view_path_common_js, preact_template_folder, settings_file, exec_babel, temp_folder, public_folder, etc_folder, f_custom_views_babelrc, list_files_dirs, ignores_folders)
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
]

const write_files = (folder, name, sh) => new Promise((resolve, reject) => {
  fs.writeFile(`${folder}/${name}`, sh, (err) => {
    if (err) reject(`Error writing file:${name}`)
    else resolve(`Writed file:${name} successful`)
  })
})

const to_do = async () => {
  for (const f of bash_files) {
    try {
      const x = await write_files(scripts_folder, f.name, f.sh)
      console.log(x)
    } catch (e) { console.log(`e:${e}`) }
  }
}

to_do()