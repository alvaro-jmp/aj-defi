import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
// import test_component from './components/test_component'

class v_home extends Component {

  render(props, state) {
    return (
      div({ class: 'w3-container' }, [
        div({ class: 'w3-content w3-center', style: { width: '500px' } }, [
          h1({ class: 'w3-jumbo', style: { 'font-family': '\'Manjari\', sans-serif' } }, ['aj-bank']),
          h1({}, ['Email']),
          input({class: 'w3-input'}, []),
          h1({}, ['Password']),
          input({class: 'w3-input'}, []),
          button({class: 'w3-button w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large', type: 'button'}, ['Sign in'])
        ])
      ])
    )
  }

  componentWillMount() {

    // I do this, due to that exists certain fails to load js, css, etc from cdn in Venezuela
    // fallback.load({
    //   firebase: [
    //     `https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js`,
    //     `${window.location.origin}/assets/js/firebase-app-6.6.1.js`
    //   ]
    //   ,
    //   'firebase.auth': [
    //     'https://www.gstatic.com/firebasejs/6.6.1/firebase-auth.js',
    //     `${window.location.origin}/assets/js/firebase-auth-6.6.1.js`
    //   ]
    //   ,
    //   'firebase.database': [
    //     'https://www.gstatic.com/firebasejs/6.6.1/firebase-database.js',
    //     `${window.location.origin}/assets/js/firebase-database-6.6.1.js`
    //   ]
    //   ,
    //   'firebase.firestore': [
    //     'https://www.gstatic.com/firebasejs/6.6.1/firebase-firestore.js',
    //     `${window.location.origin}/assets/js/firebase-firestore-6.6.1.js`
    //   ]
    // })
  }

  componentDidMount() {
    console.log(`componentDidMount() HEYY !!!! Hello world xD`)
  }
}

export default v_home