const firebase = require('firebase')
const { firebaseConfig } = require('./config_fb')
const app = firebase.initializeApp(firebaseConfig)

exports.ctx = app