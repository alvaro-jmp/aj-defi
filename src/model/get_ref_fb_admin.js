const admin = require('firebase-admin')
const { firebaseConfig } = require('./config_fb')
const convert_str = require('amrhextotext')
const aj_bank_service_account = convert_str.hexToUtf8(process.env.AJ_BANK_FIREBASE_ADMINSDK_SERVICE_ACCOUNT)
const serviceAccount = JSON.parse(aj_bank_service_account)
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
  databaseAuthVariableOverride: {
    uid: "aj_admin"
  }
})

exports.ctx = app
exports.admin = admin