'use strict';

var app = require('../..');
var request = require('supertest');

var newProductFilter;

describe('ProductFilter API:', function() {

  describe('GET /api/productFilters', function() {
    var productFilters;

    beforeEach(function(done) {
      request(app)
        .get('/api/productFilters')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          productFilters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      productFilters.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/productFilters', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/productFilters')
        .send({
          name: 'New ProductFilter',
          info: 'This is the brand new productFilter!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newProductFilter = res.body;
          done();
        });
    });

    it('should respond with the newly created productFilter', function() {
      newProductFilter.name.should.equal('New ProductFilter');
      newProductFilter.info.should.equal('This is the brand new productFilter!!!');
    });

  });

  describe('GET /api/productFilters/:id', function() {
    var productFilter;

    beforeEach(function(done) {
      request(app)
        .get('/api/productFilters/' + newProductFilter._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          productFilter = res.body;
          done();
        });
    });

    afterEach(function() {
      productFilter = {};
    });

    it('should respond with the requested productFilter', function() {
      productFilter.name.should.equal('New ProductFilter');
      productFilter.info.should.equal('This is the brand new productFilter!!!');
    });

  });

  describe('PUT /api/productFilters/:id', function() {
    var updatedProductFilter

    beforeEach(function(done) {
      request(app)
        .put('/api/productFilters/' + newProductFilter._id) 
        
        .send({
          name: 'Updated ProductFilter',
          info: 'This is the updated productFilter!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProductFilter = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProductFilter = {};
    });

    it('should respond with the updated productFilter', function() {
      updatedProductFilter.name.should.equal('Updated ProductFilter');
      updatedProductFilter.info.should.equal('This is the updated productFilter!!!');
    });

  });

  describe('DELETE /api/productFilters/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/productFilters/' + newProductFilter._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when productFilter does not exist', function(done) {
      request(app)
        .delete('/api/productFilters/' + newProductFilter._id)
        
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
