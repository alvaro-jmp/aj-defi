const admin = require('firebase-admin')
const { firebaseConfig } = require('./config_fb')
const serviceAccount = JSON.parse(process.env.AJ_BANK_FIREBASE_ADMINSDK_SERVICE_ACCOUNT)
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
  databaseAuthVariableOverride: {
    uid: "aj_admin"
  }
})

exports.ctx = app
exports.admin = admin