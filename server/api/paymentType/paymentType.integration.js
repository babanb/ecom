'use strict';

var app = require('../..');
var request = require('supertest');

var newPaymentType;

describe('PaymentType API:', function() {

  describe('GET /api/paymentTypes', function() {
    var paymentTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/paymentTypes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          paymentTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      paymentTypes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/paymentTypes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/paymentTypes')
        .send({
          name: 'New PaymentType',
          info: 'This is the brand new paymentType!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPaymentType = res.body;
          done();
        });
    });

    it('should respond with the newly created paymentType', function() {
      newPaymentType.name.should.equal('New PaymentType');
      newPaymentType.info.should.equal('This is the brand new paymentType!!!');
    });

  });

  describe('GET /api/paymentTypes/:id', function() {
    var paymentType;

    beforeEach(function(done) {
      request(app)
        .get('/api/paymentTypes/' + newPaymentType._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          paymentType = res.body;
          done();
        });
    });

    afterEach(function() {
      paymentType = {};
    });

    it('should respond with the requested paymentType', function() {
      paymentType.name.should.equal('New PaymentType');
      paymentType.info.should.equal('This is the brand new paymentType!!!');
    });

  });

  describe('PUT /api/paymentTypes/:id', function() {
    var updatedPaymentType

    beforeEach(function(done) {
      request(app)
        .put('/api/paymentTypes/' + newPaymentType._id) 
        
        .send({
          name: 'Updated PaymentType',
          info: 'This is the updated paymentType!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPaymentType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaymentType = {};
    });

    it('should respond with the updated paymentType', function() {
      updatedPaymentType.name.should.equal('Updated PaymentType');
      updatedPaymentType.info.should.equal('This is the updated paymentType!!!');
    });

  });

  describe('DELETE /api/paymentTypes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/paymentTypes/' + newPaymentType._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when paymentType does not exist', function(done) {
      request(app)
        .delete('/api/paymentTypes/' + newPaymentType._id)
        
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
