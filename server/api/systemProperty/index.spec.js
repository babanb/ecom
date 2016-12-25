'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var systemPropertyCtrlStub = {
  index: 'systemPropertyCtrl.index',
  show: 'systemPropertyCtrl.show',
  create: 'systemPropertyCtrl.create',
  update: 'systemPropertyCtrl.update',
  destroy: 'systemPropertyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var systemPropertyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './systemProperty.controller': systemPropertyCtrlStub
});

describe('SystemProperty API Router:', function() {

  it('should return an express router instance', function() {
    systemPropertyIndex.should.equal(routerStub);
  });

  describe('GET /api/systemProperties', function() {

    it('should route to systemProperty.controller.index', function() {
      routerStub.get
        .withArgs('/', 'systemPropertyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/systemProperties/:id', function() {

    it('should route to systemProperty.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'systemPropertyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/systemProperties', function() {

    it('should route to systemProperty.controller.create', function() {
      routerStub.post
        .withArgs('/', 'systemPropertyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/systemProperties/:id', function() {

    it('should route to systemProperty.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'systemPropertyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/systemProperties/:id', function() {

    it('should route to systemProperty.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'systemPropertyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/systemProperties/:id', function() {

    it('should route to systemProperty.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'systemPropertyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
