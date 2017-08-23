'use strict';

var app = require('../..');
var request = require('supertest');

var newHomePageSectionItems;

describe('HomePageSectionItems API:', function() {

  describe('GET /api/homePageSectionItems', function() {
    var homePageSectionItemss;

    beforeEach(function(done) {
      request(app)
        .get('/api/homePageSectionItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          homePageSectionItemss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      homePageSectionItemss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/homePageSectionItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/homePageSectionItems')
        .send({
          name: 'New HomePageSectionItems',
          info: 'This is the brand new homePageSectionItems!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newHomePageSectionItems = res.body;
          done();
        });
    });

    it('should respond with the newly created homePageSectionItems', function() {
      newHomePageSectionItems.name.should.equal('New HomePageSectionItems');
      newHomePageSectionItems.info.should.equal('This is the brand new homePageSectionItems!!!');
    });

  });

  describe('GET /api/homePageSectionItems/:id', function() {
    var homePageSectionItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/homePageSectionItems/' + newHomePageSectionItems._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          homePageSectionItems = res.body;
          done();
        });
    });

    afterEach(function() {
      homePageSectionItems = {};
    });

    it('should respond with the requested homePageSectionItems', function() {
      homePageSectionItems.name.should.equal('New HomePageSectionItems');
      homePageSectionItems.info.should.equal('This is the brand new homePageSectionItems!!!');
    });

  });

  describe('PUT /api/homePageSectionItems/:id', function() {
    var updatedHomePageSectionItems

    beforeEach(function(done) {
      request(app)
        .put('/api/homePageSectionItems/' + newHomePageSectionItems._id) 
        
        .send({
          name: 'Updated HomePageSectionItems',
          info: 'This is the updated homePageSectionItems!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHomePageSectionItems = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHomePageSectionItems = {};
    });

    it('should respond with the updated homePageSectionItems', function() {
      updatedHomePageSectionItems.name.should.equal('Updated HomePageSectionItems');
      updatedHomePageSectionItems.info.should.equal('This is the updated homePageSectionItems!!!');
    });

  });

  describe('DELETE /api/homePageSectionItems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/homePageSectionItems/' + newHomePageSectionItems._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when homePageSectionItems does not exist', function(done) {
      request(app)
        .delete('/api/homePageSectionItems/' + newHomePageSectionItems._id)
        
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
