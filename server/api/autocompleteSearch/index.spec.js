'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var autocompleteSearchCtrlStub = {
  index: 'autocompleteSearchCtrl.index',
  show: 'autocompleteSearchCtrl.show',
  create: 'autocompleteSearchCtrl.create',
  update: 'autocompleteSearchCtrl.update',
  destroy: 'autocompleteSearchCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var autocompleteSearchIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './autocompleteSearch.controller': autocompleteSearchCtrlStub
});

describe('AutocompleteSearch API Router:', function() {

  it('should return an express router instance', function() {
    autocompleteSearchIndex.should.equal(routerStub);
  });

  describe('GET /api/autocompleteSearchs', function() {

    it('should route to autocompleteSearch.controller.index', function() {
      routerStub.get
        .withArgs('/', 'autocompleteSearchCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/autocompleteSearchs/:id', function() {

    it('should route to autocompleteSearch.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'autocompleteSearchCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/autocompleteSearchs', function() {

    it('should route to autocompleteSearch.controller.create', function() {
      routerStub.post
        .withArgs('/', 'autocompleteSearchCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/autocompleteSearchs/:id', function() {

    it('should route to autocompleteSearch.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'autocompleteSearchCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/autocompleteSearchs/:id', function() {

    it('should route to autocompleteSearch.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'autocompleteSearchCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/autocompleteSearchs/:id', function() {

    it('should route to autocompleteSearch.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'autocompleteSearchCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
