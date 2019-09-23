const { vdom_mini_login } = require('../src/view/es6+/home/components/init_ssr')
const render = require('preact-render-to-string')
const margin_top = '16px'

console.log(render(vdom_mini_login(margin_top)))