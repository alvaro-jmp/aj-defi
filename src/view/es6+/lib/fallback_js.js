exports.load_home_js_css_etc = (_window) => {

  return new Promise((resolve, reject) => {
    fallback.load({
      w3_css: [
        `${window.location.origin}/assets/css/w3.css`,
        'https://www.w3schools.com/w3css/4/w3.css'
      ]
      ,
      validator: [
        'https://cdnjs.cloudflare.com/ajax/libs/validator/10.11.0/validator.min.js',
        `${window.location.origin}/assets/js/validator.min.js`
      ]
      ,
      moment: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
        `${window.location.origin}/assets/js/moment.min.js`
      ]
      ,
      firebase: [
        'https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js',
        `${window.location.origin}/assets/js/firebase-app-7.0.0.js`
      ]
      ,
      'firebase.auth': [
        'https://www.gstatic.com/firebasejs/7.0.0/firebase-auth.js',
        `${window.location.origin}/assets/js/firebase-auth-7.0.0.js`
      ]
    })

    fallback.ready(() => {
      if (
        typeof validator !== 'undefined'
        && typeof moment !== 'undefined'
        && typeof firebase !== 'undefined'
        && typeof firebase.auth !== 'undefined') {
        resolve('is ready')
      } else
        resolve('is not ready')
    })
  })
}