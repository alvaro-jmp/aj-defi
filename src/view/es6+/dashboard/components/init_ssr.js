const { h } = require('preact')
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)

exports.vdom_dashboard = (time) => {
  return (
    div({class: 'w3-container'}, [
      h1({}, ['Dashboard']),
      h1({}, ['n/a'])
    ])
  )
}

