"use strict";
// require('dotenv').config()
const convert_str = require('amrhextotext')

exports.firebaseConfig = JSON.parse(convert_str.hexToUtf8(process.env.AJ_BANK_FIREBASE_CONFIG))