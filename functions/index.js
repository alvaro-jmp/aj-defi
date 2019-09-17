"use strict";

var fb_fun = require('firebase-functions');

var core = require('./controller/core');

var get_ref_fb = require('./model/get_ref_fb').ctx;

var get_ref_fb_admin = require('./model/get_ref_fb_admin').ctx;

var admin_firestore = get_ref_fb_admin.firestore();
var admin_real_time_db = get_ref_fb_admin.database();
exports.__core = fb_fun.https.onRequest(core.get_app(get_ref_fb, get_ref_fb_admin, admin_firestore, admin_real_time_db));