'use strict';

var app = require('../..');
var request = require('supertest');

var newWishList;

describe('WishList API:', function() {

  describe('GET /api/wishLists', function() {
    var wishLists;

    beforeEach(function(done) {
      request(app)
        .get('/api/wishLists')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          wishLists = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      wishLists.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/wishLists', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/wishLists')
        .send({
          name: 'New WishList',
          info: 'This is the brand new wishList!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newWishList = res.body;
          done();
        });
    });

    it('should respond with the newly created wishList', function() {
      newWishList.name.should.equal('New WishList');
      newWishList.info.should.equal('This is the brand new wishList!!!');
    });

  });

  describe('GET /api/wishLists/:id', function() {
    var wishList;

    beforeEach(function(done) {
      request(app)
        .get('/api/wishLists/' + newWishList._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          wishList = res.body;
          done();
        });
    });

    afterEach(function() {
      wishList = {};
    });

    it('should respond with the requested wishList', function() {
      wishList.name.should.equal('New WishList');
      wishList.info.should.equal('This is the brand new wishList!!!');
    });

  });

  describe('PUT /api/wishLists/:id', function() {
    var updatedWishList

    beforeEach(function(done) {
      request(app)
        .put('/api/wishLists/' + newWishList._id) 
        
        .send({
          name: 'Updated WishList',
          info: 'This is the updated wishList!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWishList = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWishList = {};
    });

    it('should respond with the updated wishList', function() {
      updatedWishList.name.should.equal('Updated WishList');
      updatedWishList.info.should.equal('This is the updated wishList!!!');
    });

  });

  describe('DELETE /api/wishLists/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/wishLists/' + newWishList._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when wishList does not exist', function(done) {
      request(app)
        .delete('/api/wishLists/' + newWishList._id)
        
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
