"use strict";

require('dotenv').config();

var admin = require('firebase-admin');

var _require = require('./config_fb'),
    firebaseConfig = _require.firebaseConfig;

var serviceAccount = require('./aj-bank-firebase-adminsdk-service-account.json');

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
  databaseAuthVariableOverride: {
    uid: "aj_admin"
  }
});
exports.ctx = app;
exports.admin = admin;