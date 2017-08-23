'use strict';

var app = require('../..');
var request = require('supertest');

var newHomePageSlider;

describe('HomePageSlider API:', function() {

  describe('GET /api/homePageSliders', function() {
    var homePageSliders;

    beforeEach(function(done) {
      request(app)
        .get('/api/homePageSliders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          homePageSliders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      homePageSliders.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/homePageSliders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/homePageSliders')
        .send({
          name: 'New HomePageSlider',
          info: 'This is the brand new homePageSlider!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newHomePageSlider = res.body;
          done();
        });
    });

    it('should respond with the newly created homePageSlider', function() {
      newHomePageSlider.name.should.equal('New HomePageSlider');
      newHomePageSlider.info.should.equal('This is the brand new homePageSlider!!!');
    });

  });

  describe('GET /api/homePageSliders/:id', function() {
    var homePageSlider;

    beforeEach(function(done) {
      request(app)
        .get('/api/homePageSliders/' + newHomePageSlider._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          homePageSlider = res.body;
          done();
        });
    });

    afterEach(function() {
      homePageSlider = {};
    });

    it('should respond with the requested homePageSlider', function() {
      homePageSlider.name.should.equal('New HomePageSlider');
      homePageSlider.info.should.equal('This is the brand new homePageSlider!!!');
    });

  });

  describe('PUT /api/homePageSliders/:id', function() {
    var updatedHomePageSlider

    beforeEach(function(done) {
      request(app)
        .put('/api/homePageSliders/' + newHomePageSlider._id) 
        
        .send({
          name: 'Updated HomePageSlider',
          info: 'This is the updated homePageSlider!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHomePageSlider = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHomePageSlider = {};
    });

    it('should respond with the updated homePageSlider', function() {
      updatedHomePageSlider.name.should.equal('Updated HomePageSlider');
      updatedHomePageSlider.info.should.equal('This is the updated homePageSlider!!!');
    });

  });

  describe('DELETE /api/homePageSliders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/homePageSliders/' + newHomePageSlider._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when homePageSlider does not exist', function(done) {
      request(app)
        .delete('/api/homePageSliders/' + newHomePageSlider._id)
        
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
