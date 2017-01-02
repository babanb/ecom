'use strict';

var app = require('../..');
var request = require('supertest');

var newCheckout;

describe('Checkout API:', function() {

  describe('GET /api/checkout', function() {
    var checkouts;

    beforeEach(function(done) {
      request(app)
        .get('/api/checkout')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          checkouts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      checkouts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/checkout', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/checkout')
        .send({
          name: 'New Checkout',
          info: 'This is the brand new checkout!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCheckout = res.body;
          done();
        });
    });

    it('should respond with the newly created checkout', function() {
      newCheckout.name.should.equal('New Checkout');
      newCheckout.info.should.equal('This is the brand new checkout!!!');
    });

  });

  describe('GET /api/checkout/:id', function() {
    var checkout;

    beforeEach(function(done) {
      request(app)
        .get('/api/checkout/' + newCheckout._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          checkout = res.body;
          done();
        });
    });

    afterEach(function() {
      checkout = {};
    });

    it('should respond with the requested checkout', function() {
      checkout.name.should.equal('New Checkout');
      checkout.info.should.equal('This is the brand new checkout!!!');
    });

  });

  describe('PUT /api/checkout/:id', function() {
    var updatedCheckout

    beforeEach(function(done) {
      request(app)
        .put('/api/checkout/' + newCheckout._id) 
        
        .send({
          name: 'Updated Checkout',
          info: 'This is the updated checkout!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCheckout = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCheckout = {};
    });

    it('should respond with the updated checkout', function() {
      updatedCheckout.name.should.equal('Updated Checkout');
      updatedCheckout.info.should.equal('This is the updated checkout!!!');
    });

  });

  describe('DELETE /api/checkout/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/checkout/' + newCheckout._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when checkout does not exist', function(done) {
      request(app)
        .delete('/api/checkout/' + newCheckout._id)
        
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
