"use strict";

var admin = require('firebase-admin');

var _require = require('./config_fb'),
    firebaseConfig = _require.firebaseConfig;

var convert_str = require('amrhextotext');

var aj_bank_service_account = convert_str.hexToUtf8(process.env.AJ_BANK_FIREBASE_ADMINSDK_SERVICE_ACCOUNT);
var serviceAccount = JSON.parse(aj_bank_service_account);
var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
  databaseAuthVariableOverride: {
    uid: "aj_admin"
  }
});
exports.ctx = app;
exports.admin = admin;