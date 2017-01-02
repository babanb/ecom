'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var checkoutCtrlStub = {
  index: 'checkoutCtrl.index',
  show: 'checkoutCtrl.show',
  create: 'checkoutCtrl.create',
  update: 'checkoutCtrl.update',
  destroy: 'checkoutCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var checkoutIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './checkout.controller': checkoutCtrlStub
});

describe('Checkout API Router:', function() {

  it('should return an express router instance', function() {
    checkoutIndex.should.equal(routerStub);
  });

  describe('GET /api/checkout', function() {

    it('should route to checkout.controller.index', function() {
      routerStub.get
        .withArgs('/', 'checkoutCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/checkout/:id', function() {

    it('should route to checkout.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'checkoutCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/checkout', function() {

    it('should route to checkout.controller.create', function() {
      routerStub.post
        .withArgs('/', 'checkoutCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/checkout/:id', function() {

    it('should route to checkout.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'checkoutCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/checkout/:id', function() {

    it('should route to checkout.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'checkoutCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/checkout/:id', function() {

    it('should route to checkout.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'checkoutCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
