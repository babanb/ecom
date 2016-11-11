'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var orderStatusCtrlStub = {
  index: 'orderStatusCtrl.index',
  show: 'orderStatusCtrl.show',
  create: 'orderStatusCtrl.create',
  update: 'orderStatusCtrl.update',
  destroy: 'orderStatusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var orderStatusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './orderStatus.controller': orderStatusCtrlStub
});

describe('OrderStatus API Router:', function() {

  it('should return an express router instance', function() {
    orderStatusIndex.should.equal(routerStub);
  });

  describe('GET /api/orderStatus', function() {

    it('should route to orderStatus.controller.index', function() {
      routerStub.get
        .withArgs('/', 'orderStatusCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/orderStatus/:id', function() {

    it('should route to orderStatus.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'orderStatusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/orderStatus', function() {

    it('should route to orderStatus.controller.create', function() {
      routerStub.post
        .withArgs('/', 'orderStatusCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/orderStatus/:id', function() {

    it('should route to orderStatus.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'orderStatusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/orderStatus/:id', function() {

    it('should route to orderStatus.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'orderStatusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/orderStatus/:id', function() {

    it('should route to orderStatus.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'orderStatusCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
