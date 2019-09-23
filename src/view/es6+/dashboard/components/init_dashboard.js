import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
const t = require('../../lib/tools')

class dashboard extends Component {
  render(props, state) {
    return (
      div({class: 'w3-container'}, [
        h1({}, ['Dashboard']),
        h1({}, [time])
      ])
    )
  }
}

export default dashboard

  


