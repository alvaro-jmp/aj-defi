"use strict";

var admin = require('firebase-admin');

var _require = require('./config_fb'),
    firebaseConfig = _require.firebaseConfig;

var serviceAccount = JSON.parse(process.env.AJ_BANK_FIREBASE_ADMINSDK_SERVICE_ACCOUNT);
var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
  databaseAuthVariableOverride: {
    uid: "aj_admin"
  }
});
exports.ctx = app;
exports.admin = admin;