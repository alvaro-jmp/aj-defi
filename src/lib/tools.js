// const ref_fb = require('../ref_fb').ctx
const moment = require('moment')
const validator = require('validator')

exports.resjson = (res, data) => { res.json({ 'response': data }) }

exports.cleaning_cookie__session = (res) => {
  res.setHeader('Cache-Control', 'private')
  res.clearCookie('__session')
}

exports.request__body_is_undefined = (req) => { return typeof req.body === 'undefined' }

exports.user_not_valid = (res, ref_fb) => {
  cleaning_cookie__session(res)
  ref_fb.auth().signOut()
    .then((x) => console.log('User sign out'))
    .catch((err) => console.log('Error to sign out user:', err))
  res.status(401)
  res.redirect('/')
}

exports.response__body_is_undefined = (res) => {
  console.log('Error d11, req.body is undefined')
  user_not_valid(res)
}

exports.request__data_is_json = (req) => {
  if (req.accepts('application/json') && req.is('application/json'))
    return true
  else
    return false
}

exports.response__data_is_not_json = (res) => {
  console.log('Error d8, data is not json')
  user_not_valid(res)
}

exports.response__data_is_not_string = (res) => {
  console.log('Error d4, Some or all properties are not string or a specific type')
  user_not_valid(res)
}

exports.response__data_verf_is_not_valid = (res) => {
  console.log('Error d5, Token csrf is not valid and the others verifications are not valid')
  user_not_valid(res)
}

exports.response__error_getting_tk_sc = (res, err) => {
  console.log(`Error D1, Error in get snaptshot from /secret:${err}`)
  resjson('Error D1', res)
}

exports.response__user_undefined = (res) => {
  console.log('Error A1, user undefined')
  user_not_valid(res)
}

const get_time_utc2 = () => {
  if (typeof timestamp_unix_utc !== 'undefined') return moment.unix(timestamp_unix_utc).format('DD/MM/YYYY HH:mm:ss.SSS') + ' UTC'
  return moment.utc(new Date()).format('DD/MM/YYYY HH:mm:ss.SSS z')
}
exports.get_time_utc = get_time_utc2

const get_timestamp_unix_utc2 = () => {
  const _date = new Date()
  return (_date.getTime() + _date.getTimezoneOffset() * 60 * 1000) / 1000
}
exports.get_timestamp_unix_utc = get_timestamp_unix_utc2

const get_timestamp_and_time_in_utc_to_string2 = () => {
  const timestamp_unix_utc = get_timestamp_unix_utc2()
  const time_utc = get_time_utc2(timestamp_unix_utc)
  return [time_utc, timestamp_unix_utc]
}
exports.get_timestamp_and_time_in_utc_to_string = get_timestamp_and_time_in_utc_to_string2

exports.response__tk_sc_doesnt_exists = (res) => {
  console.log(`Error D5, Token secret doesn't exists`)
  resjson('Error D5', res)
}

exports.log2 = (c_name, ..._txt) => {
  console.log(
    c_name,
    get_timestamp_and_time_in_utc_to_string2()[0],
    _txt
  )
}

exports.is_string = (obj) => { return typeof obj === 'string' }

exports.is_boolean = (obj) => { return typeof obj === 'boolean' }

exports.int_verf = (_amount, _integers = 4) => { return validator.whitelist(_amount, '0-9,').split(',')[0].length >= _integers }

exports.tk_verf = (_token) => { return validator.matches(_token, /^(?!.*[^0-9a-z\-\_]).{36}$/i) }

exports.key_verf = (_key) => { return validator.matches(_key, /^[a-z0-9\-\_\.]{15,128}$/i) }

exports.cookie_session_verf = (_session_cookie) => { return validator.isJWT(_session_cookie) }

exports.objId = (rnd = r16 => Math.floor(r16).toString(16)) => rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random() * 16))

exports.psw_verf = (_psw) => { return validator.matches(_psw, /^(?!.*[^0-9a-z\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\|\}\]\{\[\"\'\:\;\?\/\>\.\<\,\ñ\á\é\í\ó\ú\\]).{16,1024}$/i) }