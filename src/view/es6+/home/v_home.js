import { Component, h } from 'preact'
// import test_component from './components/test_component'
const w3_margin_top = 16
const t = require('../lib/tools')
const _fallback = require('../lib/fallback_js')
import vdom_mini_login from './components/init_home'

class v_home extends Component {

  constructor() {
    super()
    this.state.div_login_margin_top = w3_margin_top
    this.state.enable_submit_data = true
    this.state.all_js_css_etc_loaded = false
    this.state.settings_alert_email = {
      class: 'w3-panel w3-pale-yellow w3-display-container w3-border',
      show: false,
      msg: 'Please review your email'
    }
    this.state.settings_alert_psw = {
      class: 'w3-panel w3-pale-yellow w3-display-container w3-border',
      show: false,
      msg: 'The password must have between 16 and 1024 character, it can contain letters, numbers and the following special characters ~`!@#$%^&*()-_+=|}]{["\':;?/>.<,ñáéíóú\\ without space'
    }
  }

  render(props, state) {
    return (
      h(vdom_mini_login, {
        _margin_top: this.set_div_login_margin_top(),
        settings_email: state.settings_alert_email,
        settings_psw: state.settings_alert_psw,
        ref_v_home: this
      }, [])
    )
  }

  componentWillMount(_window) {
    _fallback.load_home_js_css_etc()
      .then((result) => {
        if (result === 'is ready') {
          console.log('componentWillMount:: this.state.all_js_css_etc_loaded:', true)
          this.state.all_js_css_etc_loaded = true
          this.center_mini_login()
        }
      })
  }

  componentDidMount() {
    console.log('v_home::componentDidMount() this:', this)

    const [div_cont, div_login, form_min_login] = this.get_divs_mini_login_n_form()

    form_min_login.addEventListener('submit', e => this.submit_data(e))

    this.center_mini_login()

    window.addEventListener("resize", () => {
      this.center_mini_login()
    })
  }

  center_mini_login() {
    const [div_cont, div_login, form_min_login] = this.get_divs_mini_login_n_form()
    this.center_vertically(div_cont, div_login)
  }

  center_vertically(parent_elem, elem) {
    const half_win_height_size = parseInt(window.innerHeight / 2)
    const half_elem_height_size = parseInt(elem.clientHeight / 2)

    const final_height = half_win_height_size - half_elem_height_size - w3_margin_top

    const fixed_final_height = final_height < 0 ? 0 : final_height
    this.state.div_login_margin_top = fixed_final_height
    // document.querySelector('#div_cont_mini_login').style.marginTop = this.set_div_login_margin_top()
    parent_elem.style.marginTop = this.set_div_login_margin_top()

    console.log(
      'half_win_height_size:', half_win_height_size,
      'half_elem_height_size:', half_elem_height_size,
      'final_height:', final_height,
      'fixed_final_height:', fixed_final_height,
      'v_home::this()', this
    )
  }

  get_divs_mini_login_n_form() {
    const div_cont = document.querySelector('#div_cont_mini_login')
    const div_login = document.querySelector('#div_login')
    const form_min_login = document.querySelector('#form_mini_login')
    return [div_cont, div_login, form_min_login]
  }

  set_div_login_margin_top() {
    return `${this.state.div_login_margin_top.toString()}px`
  }

  submit_data(e) {
    e.preventDefault()
    console.log('v_home::submit_data() this:', this)
    if (this.state.enable_submit_data && this.state.all_js_css_etc_loaded) {
      const tk = document.getElementsByTagName("META")[4].content
      const email = document.querySelector('#i_email').value
      const psw = document.querySelector('#i_psw').value

      const email_verf = validator.isEmail(email)
      const psw_verf = t.psw_verf(psw)
      const tk_verf = t.tk_verf(tk)

      const try_again = () => {
        this.state.alert_class = 'w3-panel w3-blue w3-display-container'
        this.state.alert_msg = 'Please try again the login'
      }

      //const show_alert = () => { this.state.show_alert_ok = true }

      console.log('v_home::submit_data() email, psw:', email, psw)
      console.log('v_home::submit_data() email_verf, psw_verf, tk_verf:', email_verf, psw_verf, tk_verf)

      if (!email_verf)
        this.state.settings_alert_email.show = true
      else
        this.state.settings_alert_email.show = false
      if (!psw_verf)
        this.state.settings_alert_psw.show = true
      else
        this.state.settings_alert_psw.show = false

      this.setState(() => {
        console.log('v_home::submit_data() this.setState()')
        this.center_mini_login()
      })

      if (email_verf && psw_verf && tk_verf) {
        console.log('v_home::submit_data() all fine')
      }

    }
  }
}

export default v_home