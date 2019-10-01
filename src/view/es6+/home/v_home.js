import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
const w3_margin_top = 16
const t = require('../lib/tools')
const _fallback = require('../lib/fallback_js')
import vdom_mini_login from './components/init_home'
const _br = br({}, [])
const _b = (...args) => { return (b({}, args)) }
const [_login, _logging, _login_ok] = t.login_types
const [_review_email, _invalid_email] = [
  [_b('Please review your email')]
  ,
  ['Invalid email']
]
const [_review_psw, _wrong_psw] = [
  ['The password must have ', _b('between 16 and 1024 characters'), ' it can contain letters, numbers and ', _b('the following special characters ~`!@#$%^&*()-_+=|}]{["\\\':;?/>.<,ñáéíóú\\\\\\ without space')]
  ,
  [_b('Wrong password')]
]
const [_user_disabled, _user_not_found, _please_try_again] = [
  ['User disabled']
  ,
  ['User not found']
  ,
  ['Please try again the login']
]
const [_no_focus_input, _focus_input] = [
  ['w3-input']
  ,
  ['w3-input w3-light-gray']
]

class v_home extends Component {

  state = {
    div_login_margin_top : w3_margin_top,
    enable_submit_data : true,
    all_js_css_etc_loaded : false,
    settings_status_login : {
      class: 'w3-panel w3-pale-yellow w3-display-container w3-border',
      show: false,
      msg: [_b('Please try again the login')]
    },
    settings_alert_email : {
      class: 'w3-panel w3-pale-yellow w3-display-container w3-border',
      show: false,
      msg: [_b('Please review your email')]
    },
    settings_alert_psw : {
      class: 'w3-panel w3-pale-yellow w3-display-container w3-border',
      show: false,
      msg: ['The password must have ', _b('between 16 and 1024 characters'), ' it can contain letters, numbers and ', _b('the following special characters \\\\x7E\\\\x60\\\\x21\\\\x40\\\\x23\\\\x24\\\\x25\\\\x5E\\\\x26\\\\x2A\\\\x28\\\\x29\\\\x2D\\\\x5F\\\\x2B\\\\x3A\\\\x7C\\\\x7D\\\\x5D\\\\x7B\\\\x5B\\\\x22\\\\x5C\\\\x27\\\\x3A\\\\x3B\\\\x3F\\\\x2F\\\\x3E\\\\x2E\\\\x3C\\\\x2Cñáéíóú without space')]
      //msg: ['The password must have ', _b('between 16 and 1024 characters'), ' it can contain letters, numbers and ', _b('the following special characters ~`!@#$%^&*()-_+:|}]{["\\\':;?/>.<,ñáéíóú\\\\\\ without space')]
    },
    login_type : _login,
    ref_init_home : undefined
  }

  render = () => {
    return (
      h(vdom_mini_login, {
        _margin_top: this.set_div_login_margin_top(),
        settings_status_login: this.state.settings_status_login,
        settings_email: this.state.settings_alert_email,
        settings_psw: this.state.settings_alert_psw,
        login_type: this.state.login_type,
        ref_v_home: this
      }, [])
    )
  }

  componentWillMount = () => {
    _fallback.load_home_js_css_etc()
      .then((result) => {
        if (result === 'is ready') {
          console.log('componentWillMount:: this.state.all_js_css_etc_loaded:', true)
          this.state.all_js_css_etc_loaded = true
          t.initialize_firebase()
          this.center_mini_login()
        }
      })
  }

  componentDidMount = () => {
    console.log('v_home::componentDidMount() this:', this)

    const [div_cont, div_login, form_min_login] = this.get_divs_mini_login_n_form()

    form_min_login.addEventListener('submit', e => this.submit_data(e))

    this.center_mini_login()

    window.addEventListener("resize", () => {
      this.center_mini_login()
    })
  }

  center_mini_login = () => {
    const [div_cont, div_login, form_min_login] = this.get_divs_mini_login_n_form()
    this.center_vertically(div_cont, div_login)
  }

  center_vertically = (parent_elem, elem) => {
    const half_win_height_size = parseInt(window.innerHeight / 2)
    const half_elem_height_size = parseInt(elem.clientHeight / 2)

    const final_height = half_win_height_size - half_elem_height_size - w3_margin_top

    const fixed_final_height = final_height < 0 ? 0 : final_height
    this.state.div_login_margin_top = fixed_final_height
    parent_elem.style.marginTop = this.set_div_login_margin_top()

    console.log(
      'v_home::center_vertically()',
      'half_win_height_size:', half_win_height_size,
      'half_elem_height_size:', half_elem_height_size,
      'final_height:', final_height,
      'fixed_final_height:', fixed_final_height,
      'v_home::this()', this
    )
  }

  get_divs_mini_login_n_form = () => {
    const div_cont = document.querySelector('#div_cont_mini_login')
    const div_login = document.querySelector('#div_login')
    const form_min_login = document.querySelector('#form_mini_login')
    return [div_cont, div_login, form_min_login]
  }

  set_div_login_margin_top = () => {
    return `${this.state.div_login_margin_top.toString()}px`
  }

  set_ref_init_home = (_ref) => {
    this.state.ref_init_home = _ref
  }

  submit_data = (e) => {
    e.preventDefault()
    console.log('v_home::submit_data() this:', this)
    if (this.state.enable_submit_data && this.state.all_js_css_etc_loaded) {
      const ref_init_home = this.state.ref_init_home

      const tk = document.getElementsByTagName("META")[4].content
      const ref_email = ref_init_home.i_email
      const ref_psw = ref_init_home.i_psw

      const email_value = ref_email.value
      const psw_value = ref_psw.value

      const email_verf = validator.isEmail(email_value)
      const psw_verf = t.psw_verf(psw_value)
      const tk_verf = t.tk_verf(tk)

      const update_and_reset = (_reset = false) => {
        if (_reset)
          ref_init_home.form_mini_login.reset()
        this.setState()
      }

      console.log('v_home::submit_data() email_value, psw_value:', email_value, psw_value)
      console.log('v_home::submit_data() email_verf, psw_verf, tk_verf:', email_verf, psw_verf, tk_verf)

      const set_verf = (_alert_settings, _show, _msg) => {
        _alert_settings.show = _show
        _alert_settings.msg = _msg
      }

      if (!email_verf) {
        set_verf(this.state.settings_alert_email, true, _review_email)
        ref_email.className = _focus_input
      } else {
        set_verf(this.state.settings_alert_email, false, _review_email)
        ref_email.className = _no_focus_input
      } if (!psw_verf) {        
        set_verf(this.state.settings_alert_psw, true, _review_psw)
        ref_psw.className = _focus_input
      } else {        
        set_verf(this.state.settings_alert_psw, false, _review_psw)
        ref_psw.className = _no_focus_input
      }
      this.setState()

      if (email_verf && psw_verf && tk_verf) {

        this.setState({ enable_submit_data: false, login_type: _logging })
        console.log('v_home::submit_data() all fine')
        t.login(email_value, psw_value)
          .then((info_user) => {
            console.log('v_home::submit_data() token_id', info_user)
            info_user.user.getIdToken()
              .then((token_string) => {
                this.state.enable_submit_data = false
                this.state.login_type = _login_ok
                document.cookie = `__session=${token_string} ;max-age=3600;`
                console.log('v_home::submit_data() login correctly')
                ref_email.className = _no_focus_input
                ref_psw.className = _no_focus_input
                update_and_reset(true)
              })
          })
          .catch((err) => {
            this.state.enable_submit_data = true
            this.state.login_type = _login
            const err_code = err.code

            this.state.settings_status_login.class = 'w3-panel w3-pale-yellow w3-display-container w3-border'

            if (err_code === 'auth/invalid-email') {              
              set_verf(this.state.settings_alert_email, true, _invalid_email)
              ref_email.className = _focus_input
              ref_psw.className = _no_focus_input
            } else if (err_code === 'auth/user-disabled') {
              set_verf(this.state.settings_status_login, true, _user_disabled)
              ref_email.className = _no_focus_input
              ref_psw.className = _no_focus_input
            } else if (err_code === 'auth/user-not-found') {
              this.state.settings_status_login.msg = 'User not found'
              set_verf(this.state.settings_status_login, true, _user_not_found)
              ref_email.className = _no_focus_input
              ref_psw.className = _no_focus_input
            } else if (err_code === 'auth/wrong-password') {
              set_verf(this.state.settings_alert_psw, true, _wrong_psw)
              ref_email.className = _no_focus_input
              ref_psw.className = _focus_input
            } else {
              set_verf(this.state.settings_status_login, true, _please_try_again)
              ref_email.className = _no_focus_input
              ref_psw.className = _no_focus_input
            }
            console.log('v_home::submit_data() error in login:', err)
            update_and_reset()
          })
      }

    }
  }
}

export default v_home