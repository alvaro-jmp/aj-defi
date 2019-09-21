exports.log_in = () => {
  const ctk = validator.whitelist(document.cookie.split(/__session\=/)[1], 'a-zA-Z0-9-_.')
  return firebase.auth().signInWithCustomToken(ctk)
}

exports.err_log_in = (err) => {
  if (err.message.includes('TOKEN_EXPIRED'))
    console.log('Error A3, custom token expired:', err)
  else
    console.log('Error A2, error in credential from custom token:', err)
}

exports._user_not_valid = () => {
  document.cookie = '__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/dashboard; sameSite=Strict;'
  window.location.href = '/'
}

exports.retry_fb_db_once = (num_retry = 1, ms, query, cb, cont = 0, err) => {
  console.log('c_tools::retry_fb_db_once:', num_retry, ms, query, cb, cont, err)
  const db = firebase.database()
  if (cont >= num_retry) return cb(['reach to limit num_retry', err])
  db.ref(query).once('value')
    .then((snap) => {
      if (snap.exists()) {
        return cb([snap, undefined])
      } else {
        return cb(['not exists', undefined])
      }
    })
    .catch((_err) => {
      if (typeof ms !== 'undefined') {
        if (ms > 0)
          setTimeout(() => {
            retry_fb_db_once(num_retry, ms, query, cb, ++cont, _err)
          }, ms)
        else
          retry_fb_db_once(num_retry, ms, query, cb, ++cont, _err)
      } else
        retry_fb_db_once(num_retry, ms, query, cb, ++cont, _err)
    })
}


exports.retry_fb_fr = (num_retry, ms, promise, callback) => {

  promise
    .then((x) => {
      if (typeof x.docs !== 'undefined') {
        if (x.docs.length > 0) {
          console.log('retry_fb_fr (if x.docs.length > 0) => x,undefined:', x, undefined)
          callback([x, undefined])
        } else {
          console.log('retry_fb_fr (if !x.docs.length > 0) => not exists, undefined')
          callback(['not exists', undefined])
        }
      } else if (typeof x.docs === 'undefined') {
        if (x.exists) {
          console.log('retry_fb_fr (if x.exists) => x, undefined:', x, undefined)
          callback([x, undefined])
        }
        else {
          console.log('retry_fb_fr (etc) => exists, undefined')
          callback(['not exists', undefined])
        }
      }
    })
    .catch((err) => {
      if (num_retry <= 0) {
        console.log('retry_fb_fr (num_retry <= 0) => num_retry, err:', num_retry, err)
        callback(['it can\'t read data from db', err])
      } else if (typeof ms !== 'undefined' && typeof ms === 'number') {
        console.log('retry_fb_fr (typeof ms !== \'undefined\' && typeof ms === \'number\') => num_retry, err:', num_retry, err)
        setTimeout(() => retry_fb_fr(--num_retry, ms, promise, callback), ms)
      }
      else {
        console.log('retry_fb_fr (etc) => num_retry, err:', num_retry, err)
        retry_fb_fr(--num_retry, ms, promise, callback)
      }
    })

}

exports.test_js = (obj, url) => {
  return new Promise((resolve, reject) => {
    if (typeof [obj] === 'undefined') {
      console.log('v_dashboard::test_firebase firebase undefined')
      // const js = document.createElement('script')
      // js.src = '/assets/js/firebase-5.9.3.js'

      const fixing = () => {
        const load_script = (_url, _callback) => {
          const script = document.createElement('script')
          script.type = 'text/javascript'

          if (script.readyState) { //IE
            script.onreadystatechange = () => {
              if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null
                _callback()
              }
            }
          } else {
            script.onload = () => {
              _callback()
            }
          }

          script.src = _url
          // document.getElementsByName('head')[0].appendChild(script)
          document.head.appendChild(script)
        }

        load_script(url, () => {
          // console.log('firebase loaded')
          resolve('loaded')
          this.setState()
        })
      }

      fixing()
    } else
      resolve('is loaded!')
  })
}

const patternSubject2 = /^(?!.*[^0-9a-z\s\!\¡\[\]\*\{\}\^\:\;\#\(\)\\\/\-\.\,\¿\?\"\'\<\>\%\=\á\é\í\ó\ú\ñ\à\è\ì\ò\ù\ü]).{4,280}$/i
exports.patternSubject = patternSubject2

const patternNum_ref2 = /^(?!.*[^0-9a-z\s\!\¡\[\]\*\{\}\^\:\;\#\(\)\\\/\-\.\,\¿\?\"\'\<\>\%\=\á\é\í\ó\ú\ñ\à\è\ì\ò\ù\ü]).{4,50}$/i
exports.patternNum_ref = patternNum_ref2

const pattern_key2 = /^[a-z0-9\-\_\.]{15,128}$/i
exports.pattern_key = pattern_key2

const patternTk2 = /^(?!.*[^0-9a-z\-\_]).{36}$/i
exports.patternTk = patternTk2

exports.subject_verf = (_subject, _limit_min = 4, _limit_max = 280) => { return validator.matches(_subject, `^(?!.*[^0-9a-z\\s\\!\\¡\\[\\]\\*\\{\\}\\^\\:\\;\\#\\(\\)\\\\\\/\\-\\.\\,\\¿\\?\\"\\'\\<\\>\\%\\=\\á\\é\\í\\ó\\ú\\ñ\\à\\è\\ì\\ò\\ù\\ü]).{${_limit_min},${_limit_max}}$`, 'i') }

exports.amount_verf = (_amount) => { return validator.isCurrency(_amount, { allow_negatives: false, thousands_separator: '.', decimal_separator: ',', allow_decimal: true, digits_after_decimal: [1, 2] }) }

exports.int_verf = (_amount, _integers = 4) => { return validator.whitelist(_amount, '0-9,').split(',')[0].length >= _integers }

exports.tk_verf = (_token) => { return validator.matches(_token, /^(?!.*[^0-9a-z\-\_]).{36}$/i) }

exports.key_verf = (_key) => { return validator.matches(_key, /^[a-z0-9\-\_\.]{15,128}$/i) }

exports.cookie_session_verf = (_session_cookie) => { return validator.isJWT(_session_cookie) }

exports.objId = (rnd = r16 => Math.floor(r16).toString(16)) => rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16))

exports.psw_verf = (_psw) => { return validator.matches(_psw, /^(?!.*[^0-9a-z\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]).{16,1024}$/i) }