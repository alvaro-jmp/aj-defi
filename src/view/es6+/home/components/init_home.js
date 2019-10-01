import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
const t = require('../../lib/tools')
const _br = br({}, [])
const _b = (...args) => { return (b({}, args)) }
const [_login,_logging,_login_ok] = t.login_types

class mini_login extends Component {

  render = () => {
    return (
      div({ id: 'div_cont_mini_login', class: 'w3-display-container', style: { 'margin-top': this.props._margin_top } }, [
        div({ id: 'div_login', class: 'w3-display-topmiddle w3-card w3-padding custom-card2 w3-margin-top' }, [
          form({ ref: c => this.form_mini_login = c, id: 'form_mini_login', noValidate: '' }, [
            
            // alert status login
            div({ id: 'div_alert_email', class: this.props.settings_status_login.class, style: { display: this.props.settings_status_login.show ? 'block' : 'none' } }, [
              span({
                onclick: () => this.disable_alert(this.props.settings_status_login),
                class: 'w3-button w3-large w3-display-topright'
              }, ['×']),
              div({ style: 'width:95%;' }, [
                h6({}, [this.props.settings_status_login.msg])
              ])
            ]),
            
            //title
            h1({ class: 'w3-jumbo w3-center', style: { 'font-family': '\'Manjari\', sans-serif' } }, ['aj-bank']),

            // email
            h1({}, ['Email']),
            // alert email
            div({ id: 'div_alert_email', class: this.props.settings_email.class, style: { display: this.props.settings_email.show ? 'block' : 'none' } }, [
              span({
                onclick: () => this.disable_alert(this.props.settings_email),
                class: 'w3-button w3-large w3-display-topright'
              }, ['×']),
              div({ style: 'width:95%;' }, [
                h6({}, [this.props.settings_email.msg])
              ])
            ]),
            //input email
            input({ ref: c => this.i_email = c, id: 'i_email', class: 'w3-input', type: 'text', placeholder: 'Type your email here', name: 'email', autocomplete: 'email', maxlength: '50' }, []),

            // password
            h1({}, ['Password']),
            // alert password
            div({ id: 'div_alert_psw', class: this.props.settings_psw.class, style: { display: this.props.settings_psw.show ? 'block' : 'none' } }, [
              span({
                onclick: () => this.disable_alert(this.props.settings_psw),
                class: 'w3-button w3-large w3-display-topright'
              }, ['×']),
              div({ style: 'width:95%;' }, [
                h6({}, [this.props.settings_psw.msg])
              ])
            ]),
            //input password
            input({ ref: c => this.i_psw = c, id: 'i_psw', class: 'w3-input', type: 'password', placeholder: 'Type your password here', name: 'psw', autocomplete: 'current-password', maxlength: '1024' }, []),

            //submit
            this.login_selector(this.props.login_type)
          ])
        ])
      ])
    )

  }

  disable_alert = (_settings) => {
    console.log('mini_login::disable_alert _show:', _settings)
    _settings.show = false
    this.setState()
    console.log('mini_login::disable_alert this:', this)
  }

  componentDidUpdate = () => {
    console.log('init_home::componentDidUpdate()')
    this.props.ref_v_home.center_mini_login()
  }

  componentDidMount = () => {
    console.log('init_home::componentDidMount() this:', this)
    this.props.ref_v_home.set_ref_init_home(this)
  }

  login_selector = (_type) => {  

    const _button = (_msg, _class) => { return button({ class: _class, type: 'submit' }, [_msg])}
    
    if (_type === _login)
      return _button('Log in', 'w3-button w3-center w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large')
    else if (_type === _logging)
      return _button('Logging in...', 'w3-button w3-center w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large w3-sepia')
    else if (_type === _login_ok)
      return _button('Log in correctly', 'w3-button w3-center w3-block w3-green w3-hover-teal w3-section w3-padding w3-large')
  }
}

export default mini_login
