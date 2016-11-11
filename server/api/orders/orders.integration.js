'use strict';

var app = require('../..');
var request = require('supertest');

var newOrders;

describe('Orders API:', function() {

  describe('GET /api/orders', function() {
    var orders;

    beforeEach(function(done) {
      request(app)
        .get('/api/orders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          orders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      orders.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/orders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/orders')
        .send({
          name: 'New Orders',
          info: 'This is the brand new orders!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newOrders = res.body;
          done();
        });
    });

    it('should respond with the newly created orders', function() {
      newOrders.name.should.equal('New Orders');
      newOrders.info.should.equal('This is the brand new orders!!!');
    });

  });

  describe('GET /api/orders/:id', function() {
    var orders;

    beforeEach(function(done) {
      request(app)
        .get('/api/orders/' + newOrders._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          orders = res.body;
          done();
        });
    });

    afterEach(function() {
      orders = {};
    });

    it('should respond with the requested orders', function() {
      orders.name.should.equal('New Orders');
      orders.info.should.equal('This is the brand new orders!!!');
    });

  });

  describe('PUT /api/orders/:id', function() {
    var updatedOrders

    beforeEach(function(done) {
      request(app)
        .put('/api/orders/' + newOrders._id) 
        
        .send({
          name: 'Updated Orders',
          info: 'This is the updated orders!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOrders = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrders = {};
    });

    it('should respond with the updated orders', function() {
      updatedOrders.name.should.equal('Updated Orders');
      updatedOrders.info.should.equal('This is the updated orders!!!');
    });

  });

  describe('DELETE /api/orders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/orders/' + newOrders._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when orders does not exist', function(done) {
      request(app)
        .delete('/api/orders/' + newOrders._id)
        
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
