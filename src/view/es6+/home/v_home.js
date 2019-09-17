import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
import test_component from './components/test_component'

class v_home extends Component {

  render(props, state) {
    return (
      div({ class: 'w3-container'}, [
        h1({}, [
          'Hello world'
        ])
        ,
        h(test_component)
      ])
    )
  }

  componentDidMount() {
    console.log(`componentDidMount() HEYY !!!! Hello world xD`)
  }
}

export default v_home