exports.get_app = (ref_fb, ref_fb_admin, admin_firestore, admin_real_time_db) => {

  const express = require('express')
  const cookieParser = require('cookie-parser')
  const helmet = require('helmet')
  const app = express()
  const validator = require('validator')

  const p_get_secret = require('../model/get_secret').p_get_secret(admin_firestore)

  const c_home = require('./c_home')
  // const p_login = require('./props_f_web_router/p_login')
  const c_login = require('./c_login')
  // const p_view_dashboard = require('./props_f_web_router/p_view_dashboard')
  const t = require('./lib/tools')

  const routes_home = [/^(|\/)$/]

  const routes_dashboard = [/^\/cnp\/dashboard(|\/)$/, /^\/cnp(|\/)$/]

  const c_name = 'core -->' // controller name
  // const p_get_secret = admin_firestore.collection('secret').doc('b20b67aa-3593-4836-858b-09f047fb1f82').get({ source: 'default' })

  app.use(cookieParser())
  app.use(helmet())

  // app.use(routes_home, (req, res, next) => {
  //   const __session_cookie = req.cookies.__session
  //   if (typeof __session_cookie === 'string') {
  //     if (validator.isJWT(__session_cookie)) {
  //       ref_fb.auth().signInWithCustomToken(__session_cookie)
  //         .then((userCredential) => {
  //           // console.log('userCredential.user.uid:', userCredential.user.uid)
  //           t.log2(c_name, 'userCredential.user.uid:', userCredential.user.uid)
  //           // res.redirect('/dashboard')
  //           t.resjson('redirect to dashboard', res)
  //         })
  //         .catch((err) => {
  //           if (err.message.includes('TOKEN_EXPIRED')) {
  //             // console.log('Error A3, custom token expired:', err)
  //             t.log2(c_name, 'Error A3, custom token expired:', err)
  //           } else {
  //             // console.log('Error A2, error in credential from custom token:', err)
  //             t.log2(c_name, 'Error A2, error in credential from custom token:', err)
  //           }
  //           next()
  //         })
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next()
  //   }
  // })

  // app.use(/^\/cnp\/dashboard(|\/)$/, (req, res, next) => {

  //   // console.log(f_name, 'req.cookies:', req.cookies)
  //   const __session_cookie = req.cookies.__session
  //   if (typeof __session_cookie === 'string') {
  //     if (validator.isJWT(__session_cookie)) {
  //       ref_fb.auth().signInWithCustomToken(__session_cookie)
  //         .then((userCredential) => {
  //           console.log(f_name, 'userCredential.user.uid:', userCredential.user.uid)

  //           // app.locals.user = userCredential.user
  //           // app.locals.user2 = admin_firestore.collection('users').doc(userCredential.user.uid).get({ source: 'default' }) // Promise
  //           // app.locals.secret = admin_firestore.collection('secret').doc('ZvOL2zI1fThgGDc2U9xC').get({ source: 'default' }) // Promise

  //           next()
  //         })
  //         .catch((err) => {
  //           if (err.message.includes('TOKEN_EXPIRED')) {
  //             console.log(f_name, 'Error A3, custom tsoken expired:', err)
  //           } else {
  //             console.log(f_name, 'Error A2, error in credential from custom token:', err)
  //           }
  //           t.user_not_valid(res, ref_fb)
  //         })
  //     } else {
  //       console.log(f_name, 'Error d9, data is not Json Web Token')
  //       t.user_not_valid(res, ref_fb)
  //     }
  //   } else {
  //     console.log(f_name, 'Error d4, data is not string')
  //     t.user_not_valid(res, ref_fb)
  //   }
  // })

  app.use(c_home.get_router(ref_fb, ref_fb_admin, p_get_secret, app))
  // app.use(p_login.fun(ref_fb, ref_fb_admin, p_get_secret, admin_firestore))
  app.use(c_login.get_router(ref_fb, ref_fb_admin, p_get_secret, app, admin_firestore, admin_real_time_db))
  // app.use(p_view_dashboard.fun(ref_fb, ref_fb_admin, p_get_secret, admin_firestore))  

  return app
}