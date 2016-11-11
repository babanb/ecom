'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var todaysDealCtrlStub = {
  index: 'todaysDealCtrl.index',
  show: 'todaysDealCtrl.show',
  create: 'todaysDealCtrl.create',
  update: 'todaysDealCtrl.update',
  destroy: 'todaysDealCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var todaysDealIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './todaysDeal.controller': todaysDealCtrlStub
});

describe('TodaysDeal API Router:', function() {

  it('should return an express router instance', function() {
    todaysDealIndex.should.equal(routerStub);
  });

  describe('GET /api/todaysDeals', function() {

    it('should route to todaysDeal.controller.index', function() {
      routerStub.get
        .withArgs('/', 'todaysDealCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/todaysDeals/:id', function() {

    it('should route to todaysDeal.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'todaysDealCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/todaysDeals', function() {

    it('should route to todaysDeal.controller.create', function() {
      routerStub.post
        .withArgs('/', 'todaysDealCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/todaysDeals/:id', function() {

    it('should route to todaysDeal.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'todaysDealCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/todaysDeals/:id', function() {

    it('should route to todaysDeal.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'todaysDealCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/todaysDeals/:id', function() {

    it('should route to todaysDeal.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'todaysDealCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
