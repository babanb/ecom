'use strict';

var app = require('../..');
var request = require('supertest');

var newProductMaster;

describe('ProductMaster API:', function() {

  describe('GET /api/products', function() {
    var productMasters;

    beforeEach(function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          productMasters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      productMasters.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/products', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/products')
        .send({
          name: 'New ProductMaster',
          info: 'This is the brand new productMaster!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newProductMaster = res.body;
          done();
        });
    });

    it('should respond with the newly created productMaster', function() {
      newProductMaster.name.should.equal('New ProductMaster');
      newProductMaster.info.should.equal('This is the brand new productMaster!!!');
    });

  });

  describe('GET /api/products/:id', function() {
    var productMaster;

    beforeEach(function(done) {
      request(app)
        .get('/api/products/' + newProductMaster._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          productMaster = res.body;
          done();
        });
    });

    afterEach(function() {
      productMaster = {};
    });

    it('should respond with the requested productMaster', function() {
      productMaster.name.should.equal('New ProductMaster');
      productMaster.info.should.equal('This is the brand new productMaster!!!');
    });

  });

  describe('PUT /api/products/:id', function() {
    var updatedProductMaster

    beforeEach(function(done) {
      request(app)
        .put('/api/products/' + newProductMaster._id) 
        
        .send({
          name: 'Updated ProductMaster',
          info: 'This is the updated productMaster!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProductMaster = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProductMaster = {};
    });

    it('should respond with the updated productMaster', function() {
      updatedProductMaster.name.should.equal('Updated ProductMaster');
      updatedProductMaster.info.should.equal('This is the updated productMaster!!!');
    });

  });

  describe('DELETE /api/products/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/products/' + newProductMaster._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when productMaster does not exist', function(done) {
      request(app)
        .delete('/api/products/' + newProductMaster._id)
        
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
