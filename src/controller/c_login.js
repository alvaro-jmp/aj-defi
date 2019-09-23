exports.get_router = (ref_fb, ref_fb_admin, p_get_secret, ref_app, ref_admin_firestore, ref_admin_real_time_db) => {
  const express = require('express')
  const router = express.Router();
  const csrf = require('csrf')
  const c_name = 'c_login -->' // controller name  
  const t = require('./lib/tools')

  router.post(/^\/login(|\/)/, (req, res) => {
    if (t.request__data_is_json(req)) {
      if (!t.request__body_is_undefined(req)) {
        if (Object.keys(req.body).length === 4) {
          const email = req.body.email
          const psw = req.body.psw
          const tk = req.body.tk
          // const _hash = req.body.hash
          const continue_login = req.body.continue_login

          if (t.is_string(email) && t.is_string(psw) && t.is_string(tk) && t.is_boolean(continue_login)) {
            const email_verf = validator.isEmail(email)
            const psw_verf = t.psw_verf(psw)
            const tk_verf = t.tk_verf(tk)

            p_get_secret
              .then((snap) => {
                const secret_tk = snap.data().tk
                if (email_verf && psw_verf && tk_verf && csrf().verify(secret, tk)) {
                  t.log2(c_name, `email:${email}`)
                  t.log2(c_name, `psw:${psw}`)
                  ref_fb.auth().signInWithEmailAndPassword(email, psw)
                    .then((info_user) => {
                      t.log2(c_name, 'Signin succesfull')
                      const uid = info_user.user.uid
                      ref_admin_firestore.collection('users').doc(`${uid}`).get({ source: 'default' })
                        .then((snap2) => {
                          if (snap2.exists) {
                            const user_info2 = snap.data()
                            if (
                              user_info2.perm.includes('web_all') &&
                              user_info2.perm.includes('demo') &&
                              user_info2.perm.includes('web_login')
                            ) {
                              ref_fb_admin.auth().createCustomToken(uid)
                                .then((custom_token) => {
                                  const options = { maxAge: (60 * 60 * 1000), httpOnly: false, path: '/dashboard' }

                                  // IN PRODUCTION **************
                                  // const options = { maxAge: (60 * 60 * 1000), httpOnly: false, path: '/dashboard' }

                                  res.setHeader('Cache-Control', 'private')
                                  res.cookie('__session', custom_token, options)
                                  t.resjson('Login ok', res)

                                })
                                .catch((err) => {
                                  t.log2(c_name, `Error generating customToken: ${err} `)
                                  t.resjson('Error L6', res) // L6 - Error generating custom token
                                })
                            } else {
                              t.log2(c_name, `Warning D7f, (web_login) user does not have permission for login`)
                              t.resjson('Warning D7e', res)
                            }
                          } else {
                            t.log2(c_name, 'Error A1, User undefined:', err)
                            t.user_not_valid(res, ref_fb)
                          }
                        })
                        .catch((err) => {

                        })
                    }).catch((err) => {
                      t.log2(c_name, 'Error L5, Error in credential and USER WAS NOT FOUNDED')
                      t.log2(c_name, `err.code: ${err.code} `)
                      t.log2(c_name, `err.message: ${err.message} `)
                      res.status(401)
                      t.resjson('Error L5', res)
                    })
                } else {
                  t.response__data_verf_is_not_valid(res, ref_fb)
                }
              })
              .catch((err) => {
                t.log2(c_name, 'Error L5, Error in credential and USER WAS NOT FOUNDED')
                t.log2(c_name, `err.code: ${err.code} `)
                t.log2(c_name, `err.message: ${err.message} `)
                res.status(401)
                t.resjson('Error L5', res)
              })
          } else {
            t.response__data_is_not_correct_type(res, ref_fb)
          }
        }
      } else {
        t.response__body_is_undefined(res, ref_fb)
      }
    } else {
      t.response__data_is_not_json(res, ref_fb)
    }
  })
}