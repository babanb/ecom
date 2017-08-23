'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var homePageSliderCtrlStub = {
  index: 'homePageSliderCtrl.index',
  show: 'homePageSliderCtrl.show',
  create: 'homePageSliderCtrl.create',
  update: 'homePageSliderCtrl.update',
  destroy: 'homePageSliderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var homePageSliderIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './homePageSlider.controller': homePageSliderCtrlStub
});

describe('HomePageSlider API Router:', function() {

  it('should return an express router instance', function() {
    homePageSliderIndex.should.equal(routerStub);
  });

  describe('GET /api/homePageSliders', function() {

    it('should route to homePageSlider.controller.index', function() {
      routerStub.get
        .withArgs('/', 'homePageSliderCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/homePageSliders/:id', function() {

    it('should route to homePageSlider.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'homePageSliderCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/homePageSliders', function() {

    it('should route to homePageSlider.controller.create', function() {
      routerStub.post
        .withArgs('/', 'homePageSliderCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/homePageSliders/:id', function() {

    it('should route to homePageSlider.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'homePageSliderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/homePageSliders/:id', function() {

    it('should route to homePageSlider.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'homePageSliderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/homePageSliders/:id', function() {

    it('should route to homePageSlider.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'homePageSliderCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
