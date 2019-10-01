import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
const t = require('../lib/tools')
const _fallback = require('../lib/fallback_js')
import vdom_dashboard from './components/init_dashboard'

class v_dashboard extends Component {

  render = () => {
    return (
      h(vdom_dashboard, { time: this.get_time() }, [])
    )
  }

  get_time = () => {
    return new Date().toString()
  }
}

export default v_dashboard