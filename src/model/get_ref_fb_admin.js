require('dotenv').config()
const admin = require('firebase-admin')
const { firebaseConfig } = require('./config_fb')
const serviceAccount = require('./aj-bank-firebase-adminsdk-service-account.json')
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfig.databaseURL,
    databaseAuthVariableOverride: {
        uid: "aj_admin"
    }
})

exports.ctx = app
exports.admin = admin