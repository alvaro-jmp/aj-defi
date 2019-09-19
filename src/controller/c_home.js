exports.get_router = (ref_fb, ref_fb_admin, p_get_secret, ref_app) => {  
  const view_home = require('../view/es6+/preact_templates/template_v_home')
  const express = require('express')
  const router = express.Router();
  const csrf = require('csrf')
  const c_name = 'c_home -->' // controller name  
  const t = require('../lib/tools')

  router.get(/^(|\/)$/, (req, res) => {

    p_get_secret
      .then((snap) => {
        const secret_tk = snap.data().tk
        const csrf_tk = csrf().create(secret_tk)        
        res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400')
        // t.resjson(res, 'Ok !!!')
        const string_html = view_home.print(csrf_tk)
        res.send(string_html)
      })
      .catch((err) => {
        t.log2(c_name, `Error in get snaptshot from /secret:`,err)
        t.resjson(res, 'with Error !!!', err)
        const string_html = view_home.print('Ogigia')
        res.send(string_html)        
      })
  })

  return router
}