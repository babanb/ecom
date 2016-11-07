'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var productMasterCtrlStub = {
  index: 'productMasterCtrl.index',
  show: 'productMasterCtrl.show',
  create: 'productMasterCtrl.create',
  update: 'productMasterCtrl.update',
  destroy: 'productMasterCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var productMasterIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './productMaster.controller': productMasterCtrlStub
});

describe('ProductMaster API Router:', function() {

  it('should return an express router instance', function() {
    productMasterIndex.should.equal(routerStub);
  });

  describe('GET /api/products', function() {

    it('should route to productMaster.controller.index', function() {
      routerStub.get
        .withArgs('/', 'productMasterCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/products/:id', function() {

    it('should route to productMaster.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'productMasterCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/products', function() {

    it('should route to productMaster.controller.create', function() {
      routerStub.post
        .withArgs('/', 'productMasterCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/products/:id', function() {

    it('should route to productMaster.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'productMasterCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/products/:id', function() {

    it('should route to productMaster.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'productMasterCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/products/:id', function() {

    it('should route to productMaster.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'productMasterCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
