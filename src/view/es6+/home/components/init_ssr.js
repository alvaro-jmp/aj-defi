const { h } = require('preact')
const { div, span, h1, h3, h6, b, a, img, form, label, input, button, br } = require('hyperscript-helpers')(h)

exports.vdom_mini_login = (_margin_top) => {
  return (
    div({ id: 'div_cont_mini_login', class: 'w3-display-container', style: { 'margin-top': _margin_top } }, [
      div({ id: 'div_login', class: 'w3-display-topmiddle w3-card w3-padding custom-card2 w3-margin-top' }, [
        form({ id: 'form_mini_login', noValidate: '' }, [
          //title
          h1({ class: 'w3-jumbo w3-center', style: { 'font-family': '\'Manjari\', sans-serif' } }, ['aj-bank']),

          // email
          h1({}, ['Email']),         
          
          //input email
          input({ id: 'i_email', class: 'w3-input', type: 'text', placeholder: 'type your email here', name: 'email', autocomplete: 'email', maxlength: '50' }, []),
          
          // password
          h1({}, ['Password']),
          //input password
          input({ id: 'i_psw', class: 'w3-input', type: 'password', placeholder: 'type your password here', name: 'psw', autocomplete: 'current-password', maxlength: '1024' }, []),

          //submit
          button({ class: 'w3-button w3-center w3-block w3-blue w3-hover-teal w3-section w3-padding w3-large', type: 'button' }, ['Sign in'])
        ])
      ])
    ])
  )
}