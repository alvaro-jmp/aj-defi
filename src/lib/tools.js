// const ref_fb = require('../ref_fb').ctx
const moment = require('moment')

export const resjson = (res, ...data) => { res.json({ 'response': data }) }

export const cleaning_cookie__session = (res) => {
  res.setHeader('Cache-Control', 'private')
  res.clearCookie('__session')
}

export const request__body_is_undefined = (req) => { return typeof req.body === 'undefined' }

export const user_not_valid = (res, ref_fb) => {
  cleaning_cookie__session(res)
  ref_fb.auth().signOut()
    .then((x) => console.log('User sign out'))
    .catch((err) => console.log('Error to sign out user:', err))
  res.status(401)
  res.redirect('/')
}

export const response__body_is_undefined = (res) => {
  console.log('Error d11, req.body is undefined')
  user_not_valid(res)
}

export const request__data_is_json = (req) => {
  if (req.accepts('application/json') && req.is('application/json'))
    return true
  else
    return false
}

export const response__data_is_not_json = (res) => {
  console.log('Error d8, data is not json')
  user_not_valid(res)
}

export const response__data_is_not_string = (res) => {
  console.log('Error d4, Some or all properties are not string or a specific type')
  user_not_valid(res)
}

export const response__data_verf_is_not_valid = (res) => {
  console.log('Error d5, Token csrf is not valid and the others verifications are not valid')
  user_not_valid(res)
}

export const response__error_getting_tk_sc = (res, err) => {
  console.log(`Error D1, Error in get snaptshot from /secret:${err}`)
  resjson('Error D1', res)
}

export const response__user_undefined = (res) => {
  console.log('Error A1, user undefined')
  user_not_valid(res)
}

export const get_time_utc = (timestamp_unix_utc) => {
  if (typeof timestamp_unix_utc !== 'undefined') return moment.unix(timestamp_unix_utc).format('DD/MM/YYYY HH:mm:ss.SSS') + ' UTC'
  return moment.utc(new Date()).format('DD/MM/YYYY HH:mm:ss.SSS z')
}
export const get_timestamp_unix_utc = () => {
  const _date = new Date()
  return (_date.getTime() + _date.getTimezoneOffset() * 60 * 1000) / 1000
}

export const get_timestamp_and_time_in_utc_to_string = () => {
  const timestamp_unix_utc = get_timestamp_unix_utc()
  const time_utc = get_time_utc(timestamp_unix_utc)
  return [time_utc, timestamp_unix_utc]
}

export const response__tk_sc_doesnt_exists = (res) => {
  console.log(`Error D5, Token secret doesn't exists`)
  resjson('Error D5', res)
}

export const log2 = (c_name, ..._txt) => {
  console.log(
    c_name,
    get_timestamp_and_time_in_utc_to_string[0],
    _txt
  )
}
