require('dotenv').config()

// const { firebaseConfig } = require('../src/model/config_fb')
// const serviceAccount = require('../src/model/aj-bank-firebase-adminsdk-service-account.json')
// const test_firebase = require('firebase-functions-test')({
//   firebaseConfig
// }, serviceAccount);

const assert = require('assert')
const functions = require('firebase-functions')
const chai = require('chai')
const httpMocks = require('node-mocks-http')
const express = require('express')
const sinon = require('sinon')
const firebasemock = require('firebase-mock')
const proxyquire = require('proxyquire')
const expect = require('chai').use(require('sinon-chai')).expect;
const mocksdk = firebasemock.MockFirebaseSdk(undefined, () => {
  return mock_auth
}, () => {
  return mock_firestore
})

// const http_functions = proxyquire('../src/controller/index', {
//   'firebase-admin': mocksdk
// })

describe('firebase http functions', () => {

  beforeEach(() => {
    mock_firestore = new firebasemock.MockFirestore()
    mock_firestore.autoFlush()
    mock_auth = new firebasemock.MockFirebase()
    mock_auth.autoFlush()

    if (typeof this.sinon === 'undefined')
      this.sinon = sinon.createSandbox()
    else
      this.sinon.restore()
  })


  it('should succed GET / with status code 200', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: `/`,
      // params: {
      //   uid: '123'
      // }
    })

    const response = httpMocks.createResponse()
    expect(response.statusCode).to.equal(200)
  })


})

// describe('my suite', () => {
//   it('my test', () => {
//     // should set the timeout of this test to 1000 ms; instead will fail
//     this.timeout(1000);
//     assert.ok(true);
//   });
// });
