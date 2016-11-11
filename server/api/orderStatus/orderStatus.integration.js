'use strict';

var app = require('../..');
var request = require('supertest');

var newOrderStatus;

describe('OrderStatus API:', function() {

  describe('GET /api/orderStatus', function() {
    var orderStatuss;

    beforeEach(function(done) {
      request(app)
        .get('/api/orderStatus')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          orderStatuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      orderStatuss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/orderStatus', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/orderStatus')
        .send({
          name: 'New OrderStatus',
          info: 'This is the brand new orderStatus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newOrderStatus = res.body;
          done();
        });
    });

    it('should respond with the newly created orderStatus', function() {
      newOrderStatus.name.should.equal('New OrderStatus');
      newOrderStatus.info.should.equal('This is the brand new orderStatus!!!');
    });

  });

  describe('GET /api/orderStatus/:id', function() {
    var orderStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/orderStatus/' + newOrderStatus._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          orderStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      orderStatus = {};
    });

    it('should respond with the requested orderStatus', function() {
      orderStatus.name.should.equal('New OrderStatus');
      orderStatus.info.should.equal('This is the brand new orderStatus!!!');
    });

  });

  describe('PUT /api/orderStatus/:id', function() {
    var updatedOrderStatus

    beforeEach(function(done) {
      request(app)
        .put('/api/orderStatus/' + newOrderStatus._id) 
        
        .send({
          name: 'Updated OrderStatus',
          info: 'This is the updated orderStatus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOrderStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrderStatus = {};
    });

    it('should respond with the updated orderStatus', function() {
      updatedOrderStatus.name.should.equal('Updated OrderStatus');
      updatedOrderStatus.info.should.equal('This is the updated orderStatus!!!');
    });

  });

  describe('DELETE /api/orderStatus/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/orderStatus/' + newOrderStatus._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when orderStatus does not exist', function(done) {
      request(app)
        .delete('/api/orderStatus/' + newOrderStatus._id)
        
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
