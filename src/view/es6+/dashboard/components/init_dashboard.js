import { Component, h } from 'preact'
const { div, span, h1, h2, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
const t = require('../../lib/tools')

class _dashboard extends Component {
  
  render = () => {
    return (
      div({}, [
        h1({}, ['DASHBOARD']),
        h2({}, [this.props.time])
      ])
    )
  }
}

export default _dashboard

  


