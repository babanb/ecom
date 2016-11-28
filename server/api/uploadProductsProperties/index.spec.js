'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var uploadProductsPropertiesCtrlStub = {
  index: 'uploadProductsPropertiesCtrl.index',
  show: 'uploadProductsPropertiesCtrl.show',
  create: 'uploadProductsPropertiesCtrl.create',
  update: 'uploadProductsPropertiesCtrl.update',
  destroy: 'uploadProductsPropertiesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var uploadProductsPropertiesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './uploadProductsProperties.controller': uploadProductsPropertiesCtrlStub
});

describe('UploadProductsProperties API Router:', function() {

  it('should return an express router instance', function() {
    uploadProductsPropertiesIndex.should.equal(routerStub);
  });

  describe('GET /api/productsProperties', function() {

    it('should route to uploadProductsProperties.controller.index', function() {
      routerStub.get
        .withArgs('/', 'uploadProductsPropertiesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/productsProperties/:id', function() {

    it('should route to uploadProductsProperties.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'uploadProductsPropertiesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/productsProperties', function() {

    it('should route to uploadProductsProperties.controller.create', function() {
      routerStub.post
        .withArgs('/', 'uploadProductsPropertiesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/productsProperties/:id', function() {

    it('should route to uploadProductsProperties.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'uploadProductsPropertiesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/productsProperties/:id', function() {

    it('should route to uploadProductsProperties.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'uploadProductsPropertiesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/productsProperties/:id', function() {

    it('should route to uploadProductsProperties.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'uploadProductsPropertiesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
