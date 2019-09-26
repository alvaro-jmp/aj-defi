const fb_fun = require('firebase-functions')
const core = require('./controller/core')

const get_ref_fb = require('./model/get_ref_fb').ctx
const get_ref_fb_admin = require('./model/get_ref_fb_admin').ctx

const admin_firestore = get_ref_fb_admin.firestore()
const admin_real_time_db = get_ref_fb_admin.database()

// process.env.NODE_ENV = 'production'

exports.__core = fb_fun.https.onRequest(core.get_app(get_ref_fb, get_ref_fb_admin, admin_firestore, admin_real_time_db))


