import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
// import test_component from './components/test_component'
const t = require('../lib/tools')
const _fallback = require('../lib/fallback_js')
const vdom_dashboard = require('./components/init_dashboard')

class v_dashboard extends Component {

  render(props, state) {
    return (
      h(vdom_dashboard(), { time: this.get_time() })
    )
  }

  get_time() {
    return new Date().toString()
  }
}

export default v_dashboard