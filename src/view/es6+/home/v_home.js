import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
// import test_component from './components/test_component'
const w3_margin_top = 16
const t = require('../lib/tools')
const { vdom_mini_login } = require('./components/initial_component')

class v_home extends Component {

  constructor() {
    super()
    this.state.div_login_margin_top = w3_margin_top
    this.state.enable_submit_data = true
    this.state.all_js_loaded = false
  }

  render(props, state) {
    return (vdom_mini_login(this.set_div_login_margin_top()))
  }

  componentWillMount() {
    // load_fallback_js()
  }

  componentDidMount() {
    console.log('v_home::componentDidMount() this:', this)

    const div_cont = document.querySelector('#div_cont_mini_login')
    const div_login = document.querySelector('#div_login')
    const form_min_login = document.querySelector('#form_mini_login')

    form_min_login.addEventListener('submit', this.submit_data)

    this.center_vertically(div_cont, div_login)

    window.addEventListener("resize", () => {
      this.center_vertically(div_cont, div_login)
    })
  }

  center_vertically(parent_elem, elem) {
    const half_win_height_size = parseInt(window.innerHeight / 2)
    const half_elem_height_size = parseInt(elem.clientHeight / 2)

    const final_height = half_win_height_size - half_elem_height_size - w3_margin_top

    const fixed_final_height = final_height < 0 ? 0 : final_height
    this.setState({ div_login_margin_top: fixed_final_height })
  }

  set_div_login_margin_top() {
    return `${this.state.div_login_margin_top.toString()}px`
  }

  submit_data(e) {
    e.preventDefault()
    console.log('v_home::submit_data()')
    if (this.state.enable_submit_data && this.state.all_js_loaded) {
      const tk = document.getElementsByTagName("META")[4].content
      const email = document.querySelector('#i_email')
      const psw = document.querySelector('#i_psw')

      const email_verf = validator.isEmail(email)
      const psw_verf = t.psw_verf(psw)
      const tk_verf = t.tk_verf(tk)

      const try_again = () => {
        this.state.alert_class = 'w3-panel w3-blue w3-display-container'
        this.state.alert_msg = 'Please try again the login'
      }

      const show_alert = () => { this.state.show_alert_ok = true }

      console.log('v_home::submit_data() email, psw:', email, psw)
      console.log('v_home::submit_data() email_verf, psw_verf, tk_verf:', email_verf, psw_verf, tk_verf)

      if (email_verf && psw_verf && tk_verf) {
        console.log('v_home::submit_data() all fine')
      }

    }
  }
}

export default v_home