require('dotenv').config()

const chai = require('chai')
const expect = require('chai').use(require('sinon-chai')).expect
const request = require('supertest')
const cnt_core = require('../functions/controller/core')

// Firebase settings
const get_ref_fb = require('../functions/model/get_ref_fb').ctx;
const get_ref_fb_admin = require('../functions/model/get_ref_fb_admin').ctx;
const admin_firestore = get_ref_fb_admin.firestore();
const admin_real_time_db = get_ref_fb_admin.database(); 

// process.env.NODE_ENV = 'production'

describe('localhost server', () => {
  let app

  before((done) => {
    app = cnt_core.get_app(get_ref_fb, get_ref_fb_admin, admin_firestore, admin_real_time_db)
    app.listen((err) => {
      if (err) return done(err)
      return done()
    })
  })

  it('should send back 200 status code and Content-Type: text/html; charset=utf-8', (done) => {
    request(app)
      .get('/')
      .set('Content-Type', 'text/html; charset=utf-8')
      .expect('content-type', /text\/html\; charset\=utf\-8/)
      .expect(200, (err, res) => {
        if (err) { return done(err)}
        return done()
      })
  })
})
