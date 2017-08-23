'use strict';

var app = require('../..');
var request = require('supertest');

var newHomePageSection;

describe('HomePageSection API:', function() {

  describe('GET /api/homePageSections', function() {
    var homePageSections;

    beforeEach(function(done) {
      request(app)
        .get('/api/homePageSections')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          homePageSections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      homePageSections.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/homePageSections', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/homePageSections')
        .send({
          name: 'New HomePageSection',
          info: 'This is the brand new homePageSection!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newHomePageSection = res.body;
          done();
        });
    });

    it('should respond with the newly created homePageSection', function() {
      newHomePageSection.name.should.equal('New HomePageSection');
      newHomePageSection.info.should.equal('This is the brand new homePageSection!!!');
    });

  });

  describe('GET /api/homePageSections/:id', function() {
    var homePageSection;

    beforeEach(function(done) {
      request(app)
        .get('/api/homePageSections/' + newHomePageSection._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          homePageSection = res.body;
          done();
        });
    });

    afterEach(function() {
      homePageSection = {};
    });

    it('should respond with the requested homePageSection', function() {
      homePageSection.name.should.equal('New HomePageSection');
      homePageSection.info.should.equal('This is the brand new homePageSection!!!');
    });

  });

  describe('PUT /api/homePageSections/:id', function() {
    var updatedHomePageSection

    beforeEach(function(done) {
      request(app)
        .put('/api/homePageSections/' + newHomePageSection._id) 
        
        .send({
          name: 'Updated HomePageSection',
          info: 'This is the updated homePageSection!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHomePageSection = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHomePageSection = {};
    });

    it('should respond with the updated homePageSection', function() {
      updatedHomePageSection.name.should.equal('Updated HomePageSection');
      updatedHomePageSection.info.should.equal('This is the updated homePageSection!!!');
    });

  });

  describe('DELETE /api/homePageSections/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/homePageSections/' + newHomePageSection._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when homePageSection does not exist', function(done) {
      request(app)
        .delete('/api/homePageSections/' + newHomePageSection._id)
        
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
