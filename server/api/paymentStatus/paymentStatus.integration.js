'use strict';

var app = require('../..');
var request = require('supertest');

var newPaymentStatus;

describe('PaymentStatus API:', function() {

  describe('GET /paymentStatus', function() {
    var paymentStatuss;

    beforeEach(function(done) {
      request(app)
        .get('/paymentStatus')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          paymentStatuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      paymentStatuss.should.be.instanceOf(Array);
    });

  });

  describe('POST /paymentStatus', function() {
    beforeEach(function(done) {
      request(app)
        .post('/paymentStatus')
        .send({
          name: 'New PaymentStatus',
          info: 'This is the brand new paymentStatus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPaymentStatus = res.body;
          done();
        });
    });

    it('should respond with the newly created paymentStatus', function() {
      newPaymentStatus.name.should.equal('New PaymentStatus');
      newPaymentStatus.info.should.equal('This is the brand new paymentStatus!!!');
    });

  });

  describe('GET /paymentStatus/:id', function() {
    var paymentStatus;

    beforeEach(function(done) {
      request(app)
        .get('/paymentStatus/' + newPaymentStatus._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          paymentStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      paymentStatus = {};
    });

    it('should respond with the requested paymentStatus', function() {
      paymentStatus.name.should.equal('New PaymentStatus');
      paymentStatus.info.should.equal('This is the brand new paymentStatus!!!');
    });

  });

  describe('PUT /paymentStatus/:id', function() {
    var updatedPaymentStatus

    beforeEach(function(done) {
      request(app)
        .put('/paymentStatus/' + newPaymentStatus._id) 
        
        .send({
          name: 'Updated PaymentStatus',
          info: 'This is the updated paymentStatus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPaymentStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaymentStatus = {};
    });

    it('should respond with the updated paymentStatus', function() {
      updatedPaymentStatus.name.should.equal('Updated PaymentStatus');
      updatedPaymentStatus.info.should.equal('This is the updated paymentStatus!!!');
    });

  });

  describe('DELETE /paymentStatus/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/paymentStatus/' + newPaymentStatus._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when paymentStatus does not exist', function(done) {
      request(app)
        .delete('/paymentStatus/' + newPaymentStatus._id)
        
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
