'use strict';

var app = require('../..');
var request = require('supertest');

var newProductReviews;

describe('ProductReviews API:', function() {

  describe('GET /api/productReviews', function() {
    var productReviewss;

    beforeEach(function(done) {
      request(app)
        .get('/api/productReviews')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          productReviewss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      productReviewss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/productReviews', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/productReviews')
        .send({
          name: 'New ProductReviews',
          info: 'This is the brand new productReviews!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newProductReviews = res.body;
          done();
        });
    });

    it('should respond with the newly created productReviews', function() {
      newProductReviews.name.should.equal('New ProductReviews');
      newProductReviews.info.should.equal('This is the brand new productReviews!!!');
    });

  });

  describe('GET /api/productReviews/:id', function() {
    var productReviews;

    beforeEach(function(done) {
      request(app)
        .get('/api/productReviews/' + newProductReviews._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          productReviews = res.body;
          done();
        });
    });

    afterEach(function() {
      productReviews = {};
    });

    it('should respond with the requested productReviews', function() {
      productReviews.name.should.equal('New ProductReviews');
      productReviews.info.should.equal('This is the brand new productReviews!!!');
    });

  });

  describe('PUT /api/productReviews/:id', function() {
    var updatedProductReviews

    beforeEach(function(done) {
      request(app)
        .put('/api/productReviews/' + newProductReviews._id) 
        
        .send({
          name: 'Updated ProductReviews',
          info: 'This is the updated productReviews!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProductReviews = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProductReviews = {};
    });

    it('should respond with the updated productReviews', function() {
      updatedProductReviews.name.should.equal('Updated ProductReviews');
      updatedProductReviews.info.should.equal('This is the updated productReviews!!!');
    });

  });

  describe('DELETE /api/productReviews/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/productReviews/' + newProductReviews._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when productReviews does not exist', function(done) {
      request(app)
        .delete('/api/productReviews/' + newProductReviews._id)
        
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
