'use strict';

var app = require('../..');
var request = require('supertest');

var newUploadProductsProperties;

describe('UploadProductsProperties API:', function() {

  describe('GET /api/productsProperties', function() {
    var uploadProductsPropertiess;

    beforeEach(function(done) {
      request(app)
        .get('/api/productsProperties')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          uploadProductsPropertiess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      uploadProductsPropertiess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/productsProperties', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/productsProperties')
        .send({
          name: 'New UploadProductsProperties',
          info: 'This is the brand new uploadProductsProperties!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newUploadProductsProperties = res.body;
          done();
        });
    });

    it('should respond with the newly created uploadProductsProperties', function() {
      newUploadProductsProperties.name.should.equal('New UploadProductsProperties');
      newUploadProductsProperties.info.should.equal('This is the brand new uploadProductsProperties!!!');
    });

  });

  describe('GET /api/productsProperties/:id', function() {
    var uploadProductsProperties;

    beforeEach(function(done) {
      request(app)
        .get('/api/productsProperties/' + newUploadProductsProperties._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          uploadProductsProperties = res.body;
          done();
        });
    });

    afterEach(function() {
      uploadProductsProperties = {};
    });

    it('should respond with the requested uploadProductsProperties', function() {
      uploadProductsProperties.name.should.equal('New UploadProductsProperties');
      uploadProductsProperties.info.should.equal('This is the brand new uploadProductsProperties!!!');
    });

  });

  describe('PUT /api/productsProperties/:id', function() {
    var updatedUploadProductsProperties

    beforeEach(function(done) {
      request(app)
        .put('/api/productsProperties/' + newUploadProductsProperties._id) 
        
        .send({
          name: 'Updated UploadProductsProperties',
          info: 'This is the updated uploadProductsProperties!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUploadProductsProperties = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUploadProductsProperties = {};
    });

    it('should respond with the updated uploadProductsProperties', function() {
      updatedUploadProductsProperties.name.should.equal('Updated UploadProductsProperties');
      updatedUploadProductsProperties.info.should.equal('This is the updated uploadProductsProperties!!!');
    });

  });

  describe('DELETE /api/productsProperties/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/productsProperties/' + newUploadProductsProperties._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when uploadProductsProperties does not exist', function(done) {
      request(app)
        .delete('/api/productsProperties/' + newUploadProductsProperties._id)
        
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
