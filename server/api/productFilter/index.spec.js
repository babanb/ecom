'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var productFilterCtrlStub = {
  index: 'productFilterCtrl.index',
  show: 'productFilterCtrl.show',
  create: 'productFilterCtrl.create',
  update: 'productFilterCtrl.update',
  destroy: 'productFilterCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var productFilterIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './productFilter.controller': productFilterCtrlStub
});

describe('ProductFilter API Router:', function() {

  it('should return an express router instance', function() {
    productFilterIndex.should.equal(routerStub);
  });

  describe('GET /api/productFilters', function() {

    it('should route to productFilter.controller.index', function() {
      routerStub.get
        .withArgs('/', 'productFilterCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/productFilters/:id', function() {

    it('should route to productFilter.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'productFilterCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/productFilters', function() {

    it('should route to productFilter.controller.create', function() {
      routerStub.post
        .withArgs('/', 'productFilterCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/productFilters/:id', function() {

    it('should route to productFilter.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'productFilterCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/productFilters/:id', function() {

    it('should route to productFilter.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'productFilterCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/productFilters/:id', function() {

    it('should route to productFilter.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'productFilterCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
