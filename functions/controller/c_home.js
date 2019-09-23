"use strict";

exports.get_router = function (ref_fb, ref_fb_admin, p_get_secret, ref_app) {
  var view_home = require('../view/es6+/preact_templates/template_v_home');

  var express = require('express');

  var router = express.Router();

  var csrf = require('csrf');

  var c_name = 'c_home -->'; // controller name  

  var t = require('./lib/tools');

  router.get(/^(|\/)$/, function (req, res) {
    p_get_secret.then(function (snap) {
      var secret_tk = snap.data().tk;
      var csrf_tk = csrf().create(secret_tk);
      res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // t.resjson(res, 'Ok !!!')

      var string_html = view_home.print(csrf_tk);
      res.send(string_html);
    })["catch"](function (err) {
      t.log2(c_name, "Error in get snaptshot from /secret:", err);
      t.resjson(res, 'with Error !!!', err);
      var string_html = view_home.print('Ogigia');
      res.send(string_html);
    });
  });
  return router;
};