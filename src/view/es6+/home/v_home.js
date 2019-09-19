import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
// import test_component from './components/test_component'
const w3_margin_top = 16

class v_home extends Component {

  constructor() {
    super()
    this.state.div_login_margin_top = w3_margin_top
  }

  render(props, state) {
    return (
      div({ ref: c => this.div_cont = c, class: 'w3-display-container', style: { 'margin-top': this.set_div_login_margin_top() } }, [
        div({ ref: c => this.div_login = c, class: 'w3-display-topmiddle w3-card w3-padding custom-card2 w3-margin-top' }, [
          h1({ class: 'w3-jumbo w3-center', style: { 'font-family': '\'Manjari\', sans-serif' } }, ['aj-bank']),
          h1({}, ['Email']),
          input({ class: 'w3-input' }, []),
          h1({}, ['Password']),
          input({ class: 'w3-input' }, []),
          button({ class: 'w3-button w3-center w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large', type: 'button' }, ['Sign in'])
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
    console.log('componentDidMount() this:', this)
    
    this.center_vertically(this.div_cont, this.div_login)
    
    window.addEventListener("resize", () => {
      this.center_vertically(this.div_cont, this.div_login)
    })
  }

  center_vertically(parent_elem, elem) {
    const half_win_height_size = parseInt(window.innerHeight / 2)
    const half_elem_height_size = parseInt(elem.clientHeight / 2)

    const final_height = half_win_height_size - half_elem_height_size - w3_margin_top

    const fixed_final_height = final_height < 0 ? 0 : final_height

    console.log('center_vertically() final_height:', final_height)    
    this.setState({ div_login_margin_top: fixed_final_height })
  }

  set_div_login_margin_top() {
    return `${this.state.div_login_margin_top}px`
  }
}

export default v_home