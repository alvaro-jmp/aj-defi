"use strict";

var firebase = require('firebase');

var _require = require('./config_fb'),
    firebaseConfig = _require.firebaseConfig;

var app = firebase.initializeApp(firebaseConfig);
exports.ctx = app;