const convert_str = require('amrhextotext')
const validator = require('validator')
const puppeteer = require('puppeteer')
const express = require('express')
const chai = require('chai')
const expect = chai.expect
const cnt_core = require('../functions/controller/core')

// Firebase settings
const get_ref_fb = require('../functions/model/get_ref_fb').ctx;
const get_ref_fb_admin = require('../functions/model/get_ref_fb_admin').ctx;
const admin_firestore = get_ref_fb_admin.firestore();
const admin_real_time_db = get_ref_fb_admin.database();

// process.env.NODE_ENV = 'production'

const get_browser = puppeteer.launch({ headless: true })
const content_type_text_html_utf_8 = 'text/html; charset=utf-8'

describe('aj-bank server', () => {

  let app
  let server
  let browser
  let page

  before((done) => {
    app = express()
    app.use(express.static('public'))
    app.use(cnt_core.get_app(get_ref_fb, get_ref_fb_admin, admin_firestore, admin_real_time_db))

    server = app.listen(3000, (err) => {
      if (err) return done(err)
      done()
    })
  })

  before(async () => {
    browser = await get_browser
    page = await browser.newPage()
  })


  it(`should send back 200 status code and Content-Type: ${content_type_text_html_utf_8}`, async () => {
    const response = await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' })
    expect(response).to.be.an('object')
    expect(response._status).to.be.equal(200)
    expect(response.headers()['content-type']).to.be.equal(content_type_text_html_utf_8)
  })

  // it('works', async() => {
  //   const content = await page.evaluate(() => document.body.innerHTML)
  //   expect(content).to.be.an('string')
  // })

  describe('user login', () => {

    const wrong_email = 'dajlhdlajdlasjdalskjdlajsdl'
    const wrong_psw = 'daldkjalj dlajd lajldjald ahsdkadads jasdkj'
    const correct_email = process.env.AJ_BANK_USER_TEST_EMAIL_00
    const correct_psw = convert_str.hexToUtf8(process.env.AJ_BANK_USER_TEST_PSW_00)

    it(`should to make incorrect login with email: ${wrong_email} and psw: ${wrong_psw}`, (done) => {

      (async () => {
        await page.type('input#i_email', wrong_email)
        await page.type('input#i_psw', wrong_psw)
        await page.click('button#login_button')
        await page.waitForSelector('#div_alert_email', { timeout: 100 })
        const response_alert_email = await page.evaluate(() => document.querySelector('#div_alert_email').innerHTML)
        const verf_response_alert_email = validator.matches(response_alert_email,/.*(Please review your email|Invalid email).*/ )
        expect(verf_response_alert_email).to.be.true
        const response_alert_psw = await page.evaluate(() => document.querySelector('#div_alert_psw').innerHTML)
        const verf_response_alert_psw = validator.matches(response_alert_psw,/.*(The password must have|Wrong password).*/ )
        expect(verf_response_alert_psw).to.be.true
        done()
      })();
    })

    it('should to make correct a login', (done) => {

      const get_messages = (msg) => {
        const _txt = msg.text()
        
        // console.log(msg)
        
        const remove_listener = () => {
          page.removeListener('console', get_messages)
        }

        if (_txt === 'v_home::submit_data() login correctly') {
          remove_listener()
          server.close()
          done()
        }

        else if (validator.matches(_txt, /.*v\_home\:\:submit\_data\(\) error in login\:.*/)) {
          remove_listener()
          server.close()
          done(_txt)
        }

      }

      page.on('console', get_messages);

      (async () => {
        await page.evaluate(() => document.querySelector('#form_mini_login').reset())
        await page.type('input#i_email', correct_email)
        await page.type('input#i_psw', correct_psw)
        await page.click('button#login_button')
      })();

    })
  })

})

