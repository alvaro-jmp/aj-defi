"use strict";

exports.get_router = function (ref_fb, ref_fb_admin, p_get_secret, ref_app) {
  var renderToString = require("preact-render-to-string");

  var view_home = require('../view/es5/home/v_home')["default"].prototype.render();

  var express = require('express');

  var router = express.Router();

  var csrf = require('csrf');

  var c_name = 'c_home -->'; // controller name

  var frame_home = require('../view/es5/frame/frame_home');

  var t = require('../lib/tools');

  var send_ssr = function send_ssr(_preact_app_render, _frame, _csrf_tk, res, err) {
    var fix_tk = typeof err !== 'undefined' ? 'Ogigia' : _csrf_tk;

    var string_html = _frame.print(fix_tk, renderToString(_preact_app_render));

    res.send(string_html);
  };

  router.get(/^(|\/)$/, function (req, res) {
    p_get_secret.then(function (snap) {
      var secret_tk = snap.data().tk;
      var csrf_tk = csrf().create(secret_tk);
      res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // t.resjson(res, 'Ok !!!')

      send_ssr(view_home, frame_home, csrf_tk, res, undefined);
    })["catch"](function (err) {
      t.log2(c_name, "Error in get snaptshot from /secret:", err);
      t.resjson(res, 'with Error !!!', err);
      send_ssr(view_home, frame_home, csrf_tk, res, err);
    });
  });
  return router;
};