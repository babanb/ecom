'use strict';

var app = require('../..');
var request = require('supertest');

var newSubCategory;

describe('SubCategory API:', function() {

  describe('GET /api/subCategories', function() {
    var subCategorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/subCategories')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          subCategorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      subCategorys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/subCategories', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/subCategories')
        .send({
          name: 'New SubCategory',
          info: 'This is the brand new subCategory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSubCategory = res.body;
          done();
        });
    });

    it('should respond with the newly created subCategory', function() {
      newSubCategory.name.should.equal('New SubCategory');
      newSubCategory.info.should.equal('This is the brand new subCategory!!!');
    });

  });

  describe('GET /api/subCategories/:id', function() {
    var subCategory;

    beforeEach(function(done) {
      request(app)
        .get('/api/subCategories/' + newSubCategory._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          subCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      subCategory = {};
    });

    it('should respond with the requested subCategory', function() {
      subCategory.name.should.equal('New SubCategory');
      subCategory.info.should.equal('This is the brand new subCategory!!!');
    });

  });

  describe('PUT /api/subCategories/:id', function() {
    var updatedSubCategory

    beforeEach(function(done) {
      request(app)
        .put('/api/subCategories/' + newSubCategory._id) 
        
        .send({
          name: 'Updated SubCategory',
          info: 'This is the updated subCategory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSubCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSubCategory = {};
    });

    it('should respond with the updated subCategory', function() {
      updatedSubCategory.name.should.equal('Updated SubCategory');
      updatedSubCategory.info.should.equal('This is the updated subCategory!!!');
    });

  });

  describe('DELETE /api/subCategories/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/subCategories/' + newSubCategory._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when subCategory does not exist', function(done) {
      request(app)
        .delete('/api/subCategories/' + newSubCategory._id)
        
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
