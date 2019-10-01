const v_home = require('../src/view/common_js/home/v_home')
const render_to_string = require('preact-render-to-string')

console.log(render_to_string(v_home.default().render()))