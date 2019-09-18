import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
import test_component from './components/test_component'

class v_home extends Component {

  render(props, state) {
    return (
      div({ class: 'w3-container'}, [
        h1({}, [
          'aj-bank'
        ])
        ,
        h(test_component)
      ])
    )
  }

  componentWillMount() {

    // I do this, due to that exists certain fails to load js, css, etc from cdn in Venezuela
    fallback.load({
      firebase: [
        `https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js`,
        `${window.location.origin}/assets/js/firebase-app-6.6.1.js`
      ]
      ,
      'firebase.auth': [
        'https://www.gstatic.com/firebasejs/6.6.1/firebase-auth.js',
        `${window.location.origin}/assets/js/firebase-auth-6.6.1.js`        
      ]
      ,
      'firebase.database': [
        'https://www.gstatic.com/firebasejs/6.6.1/firebase-database.js',
        `${window.location.origin}/assets/js/firebase-database-6.6.1.js`        
      ]
      ,
      'firebase.firestore': [
        'https://www.gstatic.com/firebasejs/6.6.1/firebase-firestore.js',
        `${window.location.origin}/assets/js/firebase-firestore-6.6.1.js`        
      ]
    })
  }

  componentDidMount() {
    console.log(`componentDidMount() HEYY !!!! Hello world xD`)
  }
}

export default v_home