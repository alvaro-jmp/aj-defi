import { Component, h } from 'preact'
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)
const t = require('../../lib/tools')

class mini_login extends Component {

  render(props, state) {
    return (
      div({ id: 'div_cont_mini_login', class: 'w3-display-container', style: { 'margin-top': props._margin_top } }, [
        div({ id: 'div_login', class: 'w3-display-topmiddle w3-card w3-padding custom-card2 w3-margin-top' }, [
          form({ id: 'form_mini_login', noValidate: '' }, [
            //title
            h1({ class: 'w3-jumbo w3-center', style: { 'font-family': '\'Manjari\', sans-serif' } }, ['aj-bank']),

            // email
            h1({}, ['Email']),
            // alert email
            div({ id: 'div_alert_email', class: props.settings_email.class, style: { display: props.settings_email.show ? 'block' : 'none' } }, [
              span({
                onclick: () => this.disable_alert(props.settings_email),
                class: 'w3-button w3-large w3-display-topright'
              }, ['×']),
              div({ style: 'width:95%;' }, [
                h6({}, [props.settings_email.msg])
              ])
            ]),
            //input email
            input({ id: 'i_email', class: 'w3-input', type: 'text', placeholder: 'type your email here', name: 'email', autocomplete: 'email', maxlength: '50' }, []),

            // password
            h1({}, ['Password']),
            // alert password
            div({ id: 'div_alert_psw', class: props.settings_psw.class, style: { display: props.settings_psw.show ? 'block' : 'none' } }, [
              span({
                onclick: () => this.disable_alert(props.settings_psw),
                class: 'w3-button w3-large w3-display-topright'
              }, ['×']),
              div({ style: 'width:95%;' }, [
                h6({}, [props.settings_psw.msg])
              ])
            ]),
            //input password
            input({ id: 'i_psw', class: 'w3-input', type: 'password', placeholder: 'type your password here', name: 'psw', autocomplete: 'current-password', maxlength: '1024' }, []),

            //submit
            button({ class: 'w3-button w3-center w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large', type: 'submit' }, ['Sign in'])
          ])
        ])
      ])
    )

  }

  disable_alert(_settings) {
    console.log('mini_login::disable_alert _show:', _settings)
    _settings.show = false
    this.setState()
    console.log('mini_login::disable_alert this:', this)
  }

  componentDidUpdate() {
    console.log('init_home::componentDidUpdate()')
    this.props.ref_v_home.center_mini_login()
  }
}

export default mini_login
