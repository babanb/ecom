'use strict';

var app = require('../..');
var request = require('supertest');

var newAutocompleteSearch;

describe('AutocompleteSearch API:', function() {

  describe('GET /api/autocompleteSearchs', function() {
    var autocompleteSearchs;

    beforeEach(function(done) {
      request(app)
        .get('/api/autocompleteSearchs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          autocompleteSearchs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      autocompleteSearchs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/autocompleteSearchs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/autocompleteSearchs')
        .send({
          name: 'New AutocompleteSearch',
          info: 'This is the brand new autocompleteSearch!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAutocompleteSearch = res.body;
          done();
        });
    });

    it('should respond with the newly created autocompleteSearch', function() {
      newAutocompleteSearch.name.should.equal('New AutocompleteSearch');
      newAutocompleteSearch.info.should.equal('This is the brand new autocompleteSearch!!!');
    });

  });

  describe('GET /api/autocompleteSearchs/:id', function() {
    var autocompleteSearch;

    beforeEach(function(done) {
      request(app)
        .get('/api/autocompleteSearchs/' + newAutocompleteSearch._id)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          autocompleteSearch = res.body;
          done();
        });
    });

    afterEach(function() {
      autocompleteSearch = {};
    });

    it('should respond with the requested autocompleteSearch', function() {
      autocompleteSearch.name.should.equal('New AutocompleteSearch');
      autocompleteSearch.info.should.equal('This is the brand new autocompleteSearch!!!');
    });

  });

  describe('PUT /api/autocompleteSearchs/:id', function() {
    var updatedAutocompleteSearch

    beforeEach(function(done) {
      request(app)
        .put('/api/autocompleteSearchs/' + newAutocompleteSearch._id) 
        
        .send({
          name: 'Updated AutocompleteSearch',
          info: 'This is the updated autocompleteSearch!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAutocompleteSearch = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAutocompleteSearch = {};
    });

    it('should respond with the updated autocompleteSearch', function() {
      updatedAutocompleteSearch.name.should.equal('Updated AutocompleteSearch');
      updatedAutocompleteSearch.info.should.equal('This is the updated autocompleteSearch!!!');
    });

  });

  describe('DELETE /api/autocompleteSearchs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/autocompleteSearchs/' + newAutocompleteSearch._id)
        
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when autocompleteSearch does not exist', function(done) {
      request(app)
        .delete('/api/autocompleteSearchs/' + newAutocompleteSearch._id)
        
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
