"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objId = exports.cookie_session_verf = exports.key_verf = exports.tk_verf = exports.int_verf = exports.amount_verf = exports.subject_verf = exports.patternTk = exports.pattern_key = exports.patternNum_ref = exports.patternSubject = exports.test_js = exports.retry_fb_fr = exports.retry_fb_db_once = exports._user_not_valid = exports.err_log_in = exports.log_in = void 0;

var _this = void 0;

var log_in = function log_in() {
  var ctk = validator.whitelist(document.cookie.split(/__session\=/)[1], 'a-zA-Z0-9-_.');
  return firebase.auth().signInWithCustomToken(ctk);
};

exports.log_in = log_in;

var err_log_in = function err_log_in(err) {
  if (err.message.includes('TOKEN_EXPIRED')) console.log('Error A3, custom token expired:', err);else console.log('Error A2, error in credential from custom token:', err);
};

exports.err_log_in = err_log_in;

var _user_not_valid = function _user_not_valid() {
  document.cookie = '__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/dashboard; sameSite=Strict;';
  window.location.href = '/';
};

exports._user_not_valid = _user_not_valid;

var retry_fb_db_once = function retry_fb_db_once() {
  var num_retry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var ms = arguments.length > 1 ? arguments[1] : undefined;
  var query = arguments.length > 2 ? arguments[2] : undefined;
  var cb = arguments.length > 3 ? arguments[3] : undefined;
  var cont = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var err = arguments.length > 5 ? arguments[5] : undefined;
  console.log('c_tools::retry_fb_db_once:', num_retry, ms, query, cb, cont, err);
  var db = firebase.database();
  if (cont >= num_retry) return cb(['reach to limit num_retry', err]);
  db.ref(query).once('value').then(function (snap) {
    if (snap.exists()) {
      return cb([snap, undefined]);
    } else {
      return cb(['not exists', undefined]);
    }
  })["catch"](function (_err) {
    if (typeof ms !== 'undefined') {
      if (ms > 0) setTimeout(function () {
        retry_fb_db_once(num_retry, ms, query, cb, ++cont, _err);
      }, ms);else retry_fb_db_once(num_retry, ms, query, cb, ++cont, _err);
    } else retry_fb_db_once(num_retry, ms, query, cb, ++cont, _err);
  });
};

exports.retry_fb_db_once = retry_fb_db_once;

var retry_fb_fr = function retry_fb_fr(num_retry, ms, promise, callback) {
  promise.then(function (x) {
    if (typeof x.docs !== 'undefined') {
      if (x.docs.length > 0) {
        console.log('retry_fb_fr (if x.docs.length > 0) => x,undefined:', x, undefined);
        callback([x, undefined]);
      } else {
        console.log('retry_fb_fr (if !x.docs.length > 0) => not exists, undefined');
        callback(['not exists', undefined]);
      }
    } else if (typeof x.docs === 'undefined') {
      if (x.exists) {
        console.log('retry_fb_fr (if x.exists) => x, undefined:', x, undefined);
        callback([x, undefined]);
      } else {
        console.log('retry_fb_fr (etc) => exists, undefined');
        callback(['not exists', undefined]);
      }
    }
  })["catch"](function (err) {
    if (num_retry <= 0) {
      console.log('retry_fb_fr (num_retry <= 0) => num_retry, err:', num_retry, err);
      callback(['it can\'t read data from db', err]);
    } else if (typeof ms !== 'undefined' && typeof ms === 'number') {
      console.log('retry_fb_fr (typeof ms !== \'undefined\' && typeof ms === \'number\') => num_retry, err:', num_retry, err);
      setTimeout(function () {
        return retry_fb_fr(--num_retry, ms, promise, callback);
      }, ms);
    } else {
      console.log('retry_fb_fr (etc) => num_retry, err:', num_retry, err);
      retry_fb_fr(--num_retry, ms, promise, callback);
    }
  });
};

exports.retry_fb_fr = retry_fb_fr;

var test_js = function test_js(obj, url) {
  return new Promise(function (resolve, reject) {
    if (typeof [obj] === 'undefined') {
      console.log('v_dashboard::test_firebase firebase undefined'); // const js = document.createElement('script')
      // js.src = '/assets/js/firebase-5.9.3.js'

      var fixing = function fixing() {
        var load_script = function load_script(_url, _callback) {
          var script = document.createElement('script');
          script.type = 'text/javascript';

          if (script.readyState) {
            //IE
            script.onreadystatechange = function () {
              if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;

                _callback();
              }
            };
          } else {
            script.onload = function () {
              _callback();
            };
          }

          script.src = _url; // document.getElementsByName('head')[0].appendChild(script)

          document.head.appendChild(script);
        };

        load_script(url, function () {
          // console.log('firebase loaded')
          resolve('loaded');

          _this.setState();
        });
      };

      fixing();
    } else resolve('is loaded!');
  });
};

exports.test_js = test_js;
var patternSubject2 = /^(?!.*[^0-9a-z\s\!\¡\[\]\*\{\}\^\:\;\#\(\)\\\/\-\.\,\¿\?\"\'\<\>\%\=\á\é\í\ó\ú\ñ\à\è\ì\ò\ù\ü]).{4,280}$/i;
var patternSubject = patternSubject2;
exports.patternSubject = patternSubject;
var patternNum_ref2 = /^(?!.*[^0-9a-z\s\!\¡\[\]\*\{\}\^\:\;\#\(\)\\\/\-\.\,\¿\?\"\'\<\>\%\=\á\é\í\ó\ú\ñ\à\è\ì\ò\ù\ü]).{4,50}$/i;
var patternNum_ref = patternNum_ref2;
exports.patternNum_ref = patternNum_ref;
var pattern_key2 = /^[a-z0-9\-\_\.]{15,128}$/i;
var pattern_key = pattern_key2;
exports.pattern_key = pattern_key;
var patternTk2 = /^(?!.*[^0-9a-z\-\_]).{36}$/i;
var patternTk = patternTk2;
exports.patternTk = patternTk;

var subject_verf = function subject_verf(_subject) {
  var _limit_min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  var _limit_max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 280;

  return validator.matches(_subject, "^(?!.*[^0-9a-z\\s\\!\\\xA1\\[\\]\\*\\{\\}\\^\\:\\;\\#\\(\\)\\\\\\/\\-\\.\\,\\\xBF\\?\\\"\\'\\<\\>\\%\\=\\\xE1\\\xE9\\\xED\\\xF3\\\xFA\\\xF1\\\xE0\\\xE8\\\xEC\\\xF2\\\xF9\\\xFC]).{".concat(_limit_min, ",").concat(_limit_max, "}$"), 'i');
};

exports.subject_verf = subject_verf;

var amount_verf = function amount_verf(_amount) {
  return validator.isCurrency(_amount, {
    allow_negatives: false,
    thousands_separator: '.',
    decimal_separator: ',',
    allow_decimal: true,
    digits_after_decimal: [1, 2]
  });
};

exports.amount_verf = amount_verf;

var int_verf = function int_verf(_amount) {
  var _integers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  return validator.whitelist(_amount, '0-9,').split(',')[0].length >= _integers;
};

exports.int_verf = int_verf;

var tk_verf = function tk_verf(_token) {
  return validator.matches(_token, /^(?!.*[^0-9a-z\-\_]).{36}$/i);
};

exports.tk_verf = tk_verf;

var key_verf = function key_verf(_key) {
  return validator.matches(_key, /^[a-z0-9\-\_\.]{15,128}$/i);
};

exports.key_verf = key_verf;

var cookie_session_verf = function cookie_session_verf(_session_cookie) {
  return validator.isJWT(_session_cookie);
};

exports.cookie_session_verf = cookie_session_verf;

var objId = function objId() {
  var rnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (r16) {
    return Math.floor(r16).toString(16);
  };
  return rnd(Date.now() / 1000) + ' '.repeat(16).replace(/./g, function () {
    return rnd(Math.random() * 16);
  });
};

exports.objId = objId;