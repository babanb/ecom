'use strict';

var app = require('../..');
var request = require('supertest');

var newProducts;

describe('Products API:', function() {

  describe('GET /api/products', function() {
    var productss;

    beforeEach(function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          productss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      productss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/products', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/products')
        .send({
          name: 'New Products',
          info: 'This is the brand new products!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newProducts = res.body;
          done();
        });
    });

    it('should respond with the newly created products', function() {
      newProducts.name.should.equal('New Products');
      newProducts.info.should.equal('This is the brand new products!!!');
    });

  });

  describe('GET /api/products/:id', function() {
    var products;

    beforeEach(function(done) {
      request(app)
        .get('/api/products/' + newProducts._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          products = res.body;
          done();
        });
    });

    afterEach(function() {
      products = {};
    });

    it('should respond with the requested products', function() {
      products.name.should.equal('New Products');
      products.info.should.equal('This is the brand new products!!!');
    });

  });


describe('GET /api/products/searchProducts/:text', function() {
    var products;

    beforeEach(function(done) {
      request(app)
        .get('/api/products/searchProducts/' + newProducts.text)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          products = res.body;
          done();
        });
    });

    afterEach(function() {
      products = {};
    });

    it('should respond with the requested products', function() {
      products.name.should.equal('New Products');
      products.info.should.equal('This is the brand new products!!!');
    });

  });



  describe('PUT /api/products/:id', function() {
    var updatedProducts

    beforeEach(function(done) {
      request(app)
        .put('/api/products/' + newProducts._id) 
        
        .send({
          name: 'Updated Products',
          info: 'This is the updated products!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProducts = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProducts = {};
    });

    it('should respond with the updated products', function() {
      updatedProducts.name.should.equal('Updated Products');
      updatedProducts.info.should.equal('This is the updated products!!!');
    });

  });

  describe('DELETE /api/products/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/products/' + newProducts._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when products does not exist', function(done) {
      request(app)
        .delete('/api/products/' + newProducts._id)
        
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
