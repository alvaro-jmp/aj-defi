"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log2 = exports.response__tk_sc_doesnt_exists = exports.get_timestamp_and_time_in_utc_to_string = exports.get_timestamp_unix_utc = exports.get_time_utc = exports.response__user_undefined = exports.response__error_getting_tk_sc = exports.response__data_verf_is_not_valid = exports.response__data_is_not_string = exports.response__data_is_not_json = exports.request__data_is_json = exports.response__body_is_undefined = exports.user_not_valid = exports.request__body_is_undefined = exports.cleaning_cookie__session = exports.resjson = void 0;

// const ref_fb = require('../ref_fb').ctx
var moment = require('moment');

var resjson = function resjson(res) {
  for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }

  res.json({
    'response': data
  });
};

exports.resjson = resjson;

var cleaning_cookie__session = function cleaning_cookie__session(res) {
  res.setHeader('Cache-Control', 'private');
  res.clearCookie('__session');
};

exports.cleaning_cookie__session = cleaning_cookie__session;

var request__body_is_undefined = function request__body_is_undefined(req) {
  return typeof req.body === 'undefined';
};

exports.request__body_is_undefined = request__body_is_undefined;

var user_not_valid = function user_not_valid(res, ref_fb) {
  cleaning_cookie__session(res);
  ref_fb.auth().signOut().then(function (x) {
    return console.log('User sign out');
  })["catch"](function (err) {
    return console.log('Error to sign out user:', err);
  });
  res.status(401);
  res.redirect('/');
};

exports.user_not_valid = user_not_valid;

var response__body_is_undefined = function response__body_is_undefined(res) {
  console.log('Error d11, req.body is undefined');
  user_not_valid(res);
};

exports.response__body_is_undefined = response__body_is_undefined;

var request__data_is_json = function request__data_is_json(req) {
  if (req.accepts('application/json') && req.is('application/json')) return true;else return false;
};

exports.request__data_is_json = request__data_is_json;

var response__data_is_not_json = function response__data_is_not_json(res) {
  console.log('Error d8, data is not json');
  user_not_valid(res);
};

exports.response__data_is_not_json = response__data_is_not_json;

var response__data_is_not_string = function response__data_is_not_string(res) {
  console.log('Error d4, Some or all properties are not string or a specific type');
  user_not_valid(res);
};

exports.response__data_is_not_string = response__data_is_not_string;

var response__data_verf_is_not_valid = function response__data_verf_is_not_valid(res) {
  console.log('Error d5, Token csrf is not valid and the others verifications are not valid');
  user_not_valid(res);
};

exports.response__data_verf_is_not_valid = response__data_verf_is_not_valid;

var response__error_getting_tk_sc = function response__error_getting_tk_sc(res, err) {
  console.log("Error D1, Error in get snaptshot from /secret:".concat(err));
  resjson('Error D1', res);
};

exports.response__error_getting_tk_sc = response__error_getting_tk_sc;

var response__user_undefined = function response__user_undefined(res) {
  console.log('Error A1, user undefined');
  user_not_valid(res);
};

exports.response__user_undefined = response__user_undefined;

var get_time_utc = function get_time_utc(timestamp_unix_utc) {
  if (typeof timestamp_unix_utc !== 'undefined') return moment.unix(timestamp_unix_utc).format('DD/MM/YYYY HH:mm:ss.SSS') + ' UTC';
  return moment.utc(new Date()).format('DD/MM/YYYY HH:mm:ss.SSS z');
};

exports.get_time_utc = get_time_utc;

var get_timestamp_unix_utc = function get_timestamp_unix_utc() {
  var _date = new Date();

  return (_date.getTime() + _date.getTimezoneOffset() * 60 * 1000) / 1000;
};

exports.get_timestamp_unix_utc = get_timestamp_unix_utc;

var get_timestamp_and_time_in_utc_to_string = function get_timestamp_and_time_in_utc_to_string() {
  var timestamp_unix_utc = get_timestamp_unix_utc();
  var time_utc = get_time_utc(timestamp_unix_utc);
  return [time_utc, timestamp_unix_utc];
};

exports.get_timestamp_and_time_in_utc_to_string = get_timestamp_and_time_in_utc_to_string;

var response__tk_sc_doesnt_exists = function response__tk_sc_doesnt_exists(res) {
  console.log("Error D5, Token secret doesn't exists");
  resjson('Error D5', res);
};

exports.response__tk_sc_doesnt_exists = response__tk_sc_doesnt_exists;

var log2 = function log2(c_name) {
  for (var _len2 = arguments.length, _txt = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    _txt[_key2 - 1] = arguments[_key2];
  }

  console.log(c_name, get_timestamp_and_time_in_utc_to_string[0], _txt);
};

exports.log2 = log2;