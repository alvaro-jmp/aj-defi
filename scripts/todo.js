const cwd_folder = 'scripts'
process.chdir(`./${cwd_folder}`)
const fs = require('fs')
const validator = require('validator')
const lengh_init = 0
const leng_end = (_file) => { return _file.length - 3 }
const view_path_es6 = '../src/view/es6+'
const view_path_es6_2 = './src/view/es6+'
const view_path_common_js = './src/view/common_js'
const preact_template_folder = './src/view/es6+/preact_templates'
const settings = { withFileTypes: true }
const exec_babel = './node_modules/.bin/babel'
const scripts_folder = '../scripts'
const temp_folder = './temp'
const public_folder = './public'
const etc_folder = './etc'
const f_custom_views_babelrc = './etc/cfg_babel/custom_view_babelrc.jsonc'
const f_custom_functions_babelrc = './etc/cfg_babel/custom_functions_babelrc.jsonc'
const list_files_dirs = fs.readdirSync(view_path_es6, settings)


///////
// CODE GENERATOR BASH FILES
// --------->

console.log('\nBuilding bash files ...\n---------->')

// const requires_root = ['firebase-tools', 'preact-cli', '@babel/cli', '@babel/core', '@babel/plugin-transform-react-jsx', '@babel/preset-env', 'firebase', 'firebase-functions', 'hyperscript-helpers', 'preact', 'preact-render-to-string', 'validator']

// const requires_src_function = ['body-parser', 'cookie-parser', 'csrf', 'dotenv', 'express', 'firebase', 'firebase-admin', 'firebase-functions', 'helmet', 'moment', 'preact', 'preact-render-to-string', 'validator', 'firebase-functions-test']

// function test_requires([h, ...tail], _path = undefined, index = 20, ) {
//   // console.log('h:',h,'tail:', tail, 'index:', index)
//   if (index === 0) // In case of dead loop
//     return []
//   if (typeof h === 'undefined' && tail.length === 0)
//     return []
//   try {
//     const fixed_path = () => {
//       if (typeof _path === 'undefined')
//         return `/node_modules/${h}`
//       else if (_path === './')
//       return `/node_modules/${h}`
//       else
//         return `${_path.split('.')[1]}/node_modules/${h}`
//     }
//     // const fixed_path = (typeof _path !== 'undefined' || _path !== './') ? `${_path}/node_modules/${h}` : h
//     require.resolve(process.cwd() + fixed_path())
//     return [...test_requires(tail, _path, --index)]
//   } catch (e) {
//     return [h, ...test_requires(tail, _path, --index)]
//   }
// }

// process.chdir('../') // Return to the root of current work direcotry

// // Review node_modules missing in ./
// const root_dir = './'
// const requires_missing_root = test_requires(requires_root, root_dir)
// console.log(`Missing npm modules in ${root_dir} :`, requires_missing_root.length > 0 ? `${requires_missing_root} , that will be installed` : 'cero' )

// const install_missing_modules_root = requires_missing_root.length > 0 ? requires_missing_root.map(x => (x === 'firebase-tools' || x === 'preact-cli') ? `npm install -g ${x}` : `npm install ${x}`) : []


// // Review node_modules missing in ./src
// const src_dir = './src'
// const require_missing_src = test_requires(requires_src_function, src_dir)
// console.log(`Missing npm modules in ${src_dir} :`, require_missing_src.length > 0 ? `${require_missing_src} , that will be installed` : 'cero')

// const install_missing_modules_src = require_missing_src.length > 0 ? require_missing_src.map(x => `npm install ${x}`) : []


// // Review node_modules missing in ./function
// const function_dir = './functions'
// const require_missing_function = test_requires(requires_src_function, function_dir)
// console.log(`Missing npm modules in ${function_dir} :`, require_missing_function.length > 0 ? `${require_missing_function} , that will be installed` : 'cero')

// const install_missing_modules_function = require_missing_function.length > 0 ? require_missing_function.map(x => `npm install ${x}`) : []

// process.chdir(`./${cwd_folder}`) // Return to the defined current work directory


///////
// CODE TRANSPILATE VIEWS
// --------->

function building_views() {

  function preact_cli(file, folder, build_folder = file.substring(lengh_init, leng_end(file))) {

    const delete_index_js = `if [ -f ${view_path_es6_2}/${folder}/index.js ]; then rm -f ${view_path_es6_2}/${folder}/index.js; fi`

    return (
      `#Transpilate ${file} to commonjs minified using preact cli for to use in client side rendering and get source maps, polyfills, etc

${delete_index_js} && cp -v ${view_path_es6_2}/${folder}/${file} ${view_path_es6_2}/${folder}/index.js && preact build --src ${view_path_es6_2}/${folder} --dest ${temp_folder}/${build_folder} --service-worker false --clean true --no-prerender

if [ -f ${etc_folder}/info_licenses_used.txt ] ; then cat ${etc_folder}/info_licenses_used.txt | cat - ${temp_folder}/${build_folder}/bundle*.js > ${temp_folder}/${build_folder}/temp && mv -v ${temp_folder}/${build_folder}/temp ${temp_folder}/${build_folder}/bundle*.js ; fi 

cp -v ${temp_folder}/${build_folder}/bundle*.js ${temp_folder}/res/js-views/ && cp -v ${temp_folder}/${build_folder}/polyfills*.js ${temp_folder}/res/js-views/ 

${delete_index_js} && bundle_n_polyfills=$(cat ${temp_folder}/${build_folder}/index.html | grep -oE '<body>.+</body>') && ssr=$(node ./scripts/ssr_${file}) && sed -e "s@<body>.*</body>@$bundle_n_polyfills@" -e "s@/bundle@/assets/js/bundle@" -e "s@/polyfills@/assets/js/polyfills@" -e "s@</script>'\)@<\\\\\\\\\\\\\\\\\\\\\\\\\\\/script>')@" -e "s@<body>@<body>$ssr@" ${preact_template_folder}/template_${file} > ${preact_template_folder}/temp && cp -v ${preact_template_folder}/temp ${preact_template_folder}/template_${file} && rm -f ${preact_template_folder}/temp

`
    )
  }

  function making_views() {

    const view_to_common_js = list_files_dirs.filter(
      elem => (
        elem.isDirectory() && (elem.name !== 'lib' && elem.name !== 'frame' && elem.name !== 'preact_templates')
      )
    ).map(
      (dir) => {
        return (
          fs.readdirSync(`${view_path_es6}/${dir.name}`, settings)
            .filter(file => !file.isDirectory())
            .filter(file => (validator.matches(file.name, /^.+\.js$/) && !validator.matches(file.name, /^index.js$/)))
            .map(file => preact_cli(file.name, dir.name))
        )
      }
    ).reduce((acc, cv) => acc + '\n' + cv)

    return view_to_common_js
  }

  function installing_missing_modules() {
    return `${install_missing_modules_root.length > 0 ? `printf "\x5cn#Installing missing modules in ${root_dir}"\n` : ''}${install_missing_modules_root.length > 0 ? install_missing_modules_root.join('\n') : ''}${install_missing_modules_src.length > 0 ? `\nprintf "\x5cn#Installing missing modules in ${src_dir}"\n` : ''}${install_missing_modules_src.length > 0 ? install_missing_modules_src.join('\n') : ''}${install_missing_modules_function.length > 0 ? `\nprintf "\x5cn#Installing missing modules in ${function_dir}"\n` : ''}${install_missing_modules_function.length > 0 ? install_missing_modules_function.join('\n') : ''}`
  }

  function init_process_bviews() {
    return (
      // `${installing_missing_modules()}

`#Delete temp (temporal) folder and create new one and two subfolders

rm -rf ${temp_folder} && mkdir -p ${temp_folder}/res/js-views

#Transpilate using babel view path to commonjs for ssr purpose

${exec_babel} ${view_path_es6_2} --out-dir ${view_path_common_js} --config-file ${f_custom_views_babelrc}

${making_views()}`
    )
  }

  function fix_public_folder() {
    return `#Adding static files as css, js, html, fonts to public folder in its respective assets folders

rm -rf public && mkdir -p ${public_folder}/assets/js ${public_folder}/assets/css ${public_folder}/assets/img ${public_folder}/assets/fonts && if [ "$(find ${etc_folder}/html -type f -name "*.html" 2>/dev/null)" ] ; then cp -v ${etc_folder}/html/* ${public_folder}/ ; fi && if [ "$(find ${etc_folder}/css -type f -name "*.css" 2>/dev/null)" ] ; then cp -v ${etc_folder}/css/*.css ${public_folder}/assets/css/ ; fi && if [ "$(find ${temp_folder}/res/js-views -type f -name "*.js" 2>/dev/null)" ] ; then cp -v ${temp_folder}/res/js-views/*.js ${public_folder}/assets/js/ ; fi && if [ "$(ls -A ${etc_folder}/fonts 2>/dev/null)" ] ; then cp -rv ${etc_folder}/fonts/* ${public_folder}/assets/fonts/ ; fi && CP_MFT_N_ICON='if [ "$(find ${etc_folder}/img -type f -name "manifest.json" 2>/dev/null)" ]; then cp -v ${etc_folder}/manifest.json ${public_folder}/; fi && if [ "$(find ${etc_folder}/img -type f -name "favicon.ico" 2>/dev/null)" ]; then cp -v ${etc_folder}/img/favicon.ico ${public_folder}/assets/img/; fi' && if [ "$(find ${etc_folder}/js -type f -name "*.js" 2>/dev/null)" ] ; then cp -v ${etc_folder}/js/*.js ${public_folder}/assets/js/ && eval $CP_MFT_N_ICON ; else eval $CP_MFT_N_ICON ; fi`
  }

  function delete_index_html() {
    return `#Delete index.html if exists

rm -rf ${public_folder}/index.html`
  }

  return `#!/bin/bash

printf "\x5cnTranspilate Views ...\x5cn---------->\x5cn"

${init_process_bviews()}

${fix_public_folder()}

${delete_index_html()}`
}

///////
// CODE TRANSPILATE FUNCTIONS
// --------->

function building_functions() {
  return `#!/bin/bash

printf "\x5cnTranspilate Functions ...\x5cn---------->\x5cn"

#removing older files and folders except node_modules, package.json, package-lock.json

cd functions && rm -rf !(node_modules|package.json|package-lock.json) && cd ..

${exec_babel} src --out-dir functions --config-file ${f_custom_functions_babelrc}

cp -v src/model/aj-bank-firebase-adminsdk-service-account.json functions/model/`
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