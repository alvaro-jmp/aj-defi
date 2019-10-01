const v_dashboard = require('../src/view/common_js/dashboard/v_dashboard')
const render_to_string = require('preact-render-to-string')

console.log(render_to_string(v_dashboard.default().render()))