exports.get_router = (ref_fb, ref_fb_admin, p_get_secret, ref_app) => {
  const renderToString = require("preact-render-to-string")
  const view_home = require('../view/es5/home/v_home').default.prototype.render()
  const express = require('express')
  const router = express.Router();
  const csrf = require('csrf')
  const c_name = 'c_home -->' // controller name
  const frame_home = require('../view/es5/frame/frame_home')
  const t = require('../lib/tools')
  
  const send_ssr = (_preact_app_render, _frame, _csrf_tk, res, err) => {
    const fix_tk = (typeof err !== 'undefined') ? 'Ogigia' : _csrf_tk
    const string_html = _frame.print(
      fix_tk,
      renderToString(_preact_app_render)
    )
    res.send(string_html)
  }

  router.get(/^(|\/)$/, (req, res) => {

    p_get_secret
      .then((snap) => {
        const secret_tk = snap.data().tk
        const csrf_tk = csrf().create(secret_tk)        
        res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400')
        // t.resjson(res, 'Ok !!!')
        send_ssr(view_home, frame_home, csrf_tk, res, undefined)
      })
      .catch((err) => {
        t.log2(c_name, `Error in get snaptshot from /secret:`,err)
        t.resjson(res, 'with Error !!!', err)
        send_ssr(view_home, frame_home, csrf_tk, res, err)
      })
  })

  return router
}