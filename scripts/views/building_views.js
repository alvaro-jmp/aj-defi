const fs = require('fs')
process.chdir('../') // move to up one directory and equal => cd ..
if (fs.existsSync(`${process.cwd()}/.env`))
  require('dotenv').config()
process.chdir('scripts')

const validator = require('validator')

exports.building_views = function (lengh_init, leng_end, view_path_es6, view_path_es6_2, view_path_common_js, preact_template_folder, settings_file, exec_babel, temp_folder, public_folder, etc_folder, f_custom_views_babelrc, list_files_dirs, ignores_folders) {

  function preact_cli(file, folder, build_folder = file.substring(lengh_init, leng_end(file))) {

    const delete_index_js = `if [ -f ${view_path_es6_2}/${folder}/index.js ]; then rm -f ${view_path_es6_2}/${folder}/index.js; fi`

    return (
      `#Transpilate ${file} to commonjs minified using preact cli for to use in client side rendering and get source maps, polyfills, etc
  
  ${delete_index_js} && cp -v ${view_path_es6_2}/${folder}/${file} ${view_path_es6_2}/${folder}/index.js && ./node_modules/.bin/preact build --src ${view_path_es6_2}/${folder} --dest ${temp_folder}/${build_folder} --service-worker false --clean true --no-prerender
  
  if [ -f ${etc_folder}/info_licenses_used.txt ] ; then cat ${etc_folder}/info_licenses_used.txt | cat - ${temp_folder}/${build_folder}/bundle*.js > ${temp_folder}/${build_folder}/temp && mv -v ${temp_folder}/${build_folder}/temp ${temp_folder}/${build_folder}/bundle*.js ; fi 
  
  cp -v ${temp_folder}/${build_folder}/bundle*.js ${temp_folder}/res/js-views/ && cp -v ${temp_folder}/${build_folder}/polyfills*.js ${temp_folder}/res/js-views/ 
  
  ${delete_index_js} && bundle_n_polyfills=$(cat ${temp_folder}/${build_folder}/index.html | grep -oE '<body>.+</body>') && ssr=$(node ./scripts/ssr_${file}) && sed -e "s@<body>.*</body>@$bundle_n_polyfills@" -e "s@/bundle@/assets/js/bundle@" -e "s@/polyfills@/assets/js/polyfills@" -e "s@</script>'\)@<\\\\\\\\\\\\\\\\\\\\\\\\\\\/script>')@" -e "s@<body>@<body>$ssr@" ${preact_template_folder}/template_${file} > ${preact_template_folder}/temp && cp -v ${preact_template_folder}/temp ${preact_template_folder}/template_${file} && rm -f ${preact_template_folder}/temp
  
  `
    )
  }

  function making_views() {

    const view_to_common_js = list_files_dirs.filter(
      elem => (
        elem.isDirectory() && (ignores_folders(elem))
      )
    ).map(
      (dir) => {
        return (
          fs.readdirSync(`${view_path_es6}/${dir.name}`, settings_file)
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

  function fix_public_folder_etc() {

    return `#Adding static files as css, js, html, fonts to public folder in its respective assets folders

rm -rf public && mkdir -p ${public_folder}/assets/js ${public_folder}/assets/css ${public_folder}/assets/img ${public_folder}/assets/fonts && if [ "$(find ${etc_folder}/html -type f -name "*.html" 2>/dev/null)" ] ; then cp -v ${etc_folder}/html/* ${public_folder}/ ; fi && if [ "$(find ${etc_folder}/css -type f -name "*.css" 2>/dev/null)" ] ; then cp -v ${etc_folder}/css/*.css ${public_folder}/assets/css/ ; fi && if [ "$(find ${temp_folder}/res/js-views -type f -name "*.js" 2>/dev/null)" ] ; then cp -v ${temp_folder}/res/js-views/*.js ${public_folder}/assets/js/ ; fi && if [ "$(ls -A ${etc_folder}/fonts 2>/dev/null)" ] ; then cp -rv ${etc_folder}/fonts/* ${public_folder}/assets/fonts/ ; fi && CP_MFT_N_ICON='if [ "$(find ${etc_folder}/img -type f -name "manifest.json" 2>/dev/null)" ]; then cp -v ${etc_folder}/manifest.json ${public_folder}/; fi && if [ "$(find ${etc_folder}/img -type f -name "favicon.ico" 2>/dev/null)" ]; then cp -v ${etc_folder}/img/favicon.ico ${public_folder}/assets/img/; fi' && if [ "$(find ${etc_folder}/js -type f -name "*.js" 2>/dev/null)" ] ; then cp -v ${etc_folder}/js/*.js ${public_folder}/assets/js/ && eval $CP_MFT_N_ICON ; else eval $CP_MFT_N_ICON ; fi && echo "var firebaseConfig = $\{AJ_BANK_FIREBASE_CONFIG};" > ./etc/js/config_fb.js `
  }

  function delete_index_html() {
    return `#Delete index.html if exists
  
rm -rf ${public_folder}/index.html`
  }

  return `#!/bin/bash

printf "\x5cnTranspilate Views ...\x5cn---------->\x5cn"

${init_process_bviews()}

${fix_public_folder_etc()}

${delete_index_html()}`
}

// CODE FOR VERIFY MODULES VERYYY ALPHAAAA

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