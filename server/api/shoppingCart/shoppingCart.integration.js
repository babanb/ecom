'use strict';

var app = require('../..');
var request = require('supertest');

var newShoppingCart;

describe('ShoppingCart API:', function() {

  describe('GET /api/shoppingCart', function() {
    var shoppingCarts;

    beforeEach(function(done) {
      request(app)
        .get('/api/shoppingCart')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          shoppingCarts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      shoppingCarts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/shoppingCart', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/shoppingCart')
        .send({
          name: 'New ShoppingCart',
          info: 'This is the brand new shoppingCart!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newShoppingCart = res.body;
          done();
        });
    });

    it('should respond with the newly created shoppingCart', function() {
      newShoppingCart.name.should.equal('New ShoppingCart');
      newShoppingCart.info.should.equal('This is the brand new shoppingCart!!!');
    });

  });

  describe('GET /api/shoppingCart/:id', function() {
    var shoppingCart;

    beforeEach(function(done) {
      request(app)
        .get('/api/shoppingCart/' + newShoppingCart._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          shoppingCart = res.body;
          done();
        });
    });

    afterEach(function() {
      shoppingCart = {};
    });

    it('should respond with the requested shoppingCart', function() {
      shoppingCart.name.should.equal('New ShoppingCart');
      shoppingCart.info.should.equal('This is the brand new shoppingCart!!!');
    });

  });

  describe('PUT /api/shoppingCart/:id', function() {
    var updatedShoppingCart

    beforeEach(function(done) {
      request(app)
        .put('/api/shoppingCart/' + newShoppingCart._id) 
        
        .send({
          name: 'Updated ShoppingCart',
          info: 'This is the updated shoppingCart!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedShoppingCart = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedShoppingCart = {};
    });

    it('should respond with the updated shoppingCart', function() {
      updatedShoppingCart.name.should.equal('Updated ShoppingCart');
      updatedShoppingCart.info.should.equal('This is the updated shoppingCart!!!');
    });

  });

  describe('DELETE /api/shoppingCart/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/shoppingCart/' + newShoppingCart._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when shoppingCart does not exist', function(done) {
      request(app)
        .delete('/api/shoppingCart/' + newShoppingCart._id)
        
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
