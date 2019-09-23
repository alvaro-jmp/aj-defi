const { vdom_dashboard } = require('../src/view/es6+/dashboard/components/init_ssr')
const render = require('preact-render-to-string')
const margin_top = '16px'

console.log(render(vdom_dashboard()))