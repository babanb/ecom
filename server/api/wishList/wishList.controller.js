/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wishLists              ->  index
 * POST    /api/wishLists              ->  create
 * GET     /api/wishLists/:id          ->  show
 * PUT     /api/wishLists/:id          ->  update
 * DELETE  /api/wishLists/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var WishList = require('./wishList.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of WishLists
exports.index = function(req, res) {
  WishList.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single WishList from the DB
exports.show = function(req, res) {
  WishList.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a all Items by session or UserID WishList from the DB
exports.getListItems = function(req, res) {
  if(req.body.UserID){

  WishList.find({UserID:req.body.UserID, isDeleted:false})
    .populate('product','_id name mainImageUrl salePrice sku instock listPrice')
    .exec()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
  }else{
  WishList.find({sessionID:req.body.sessionID, isDeleted:false})
    .populate('product','_id name mainImageUrl salePrice sku instock listPrice')
    .exec()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
  }
};

// Update Qty in WishList to the DB
exports.updateList = function(req, res) {
  req.body.updatedDate = new Date();
  WishList.update({sessionID:req.body.sessionID},{UserID:req.body.UserID},{multi:true})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new WishList in the DB
exports.create = function(req, res) {
  WishList.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing WishList in the DB
exports.update = function(req, res) {
  req.body.updatedDate = new Date(); 
  if (req.body._id) {
    delete req.body._id;
  }
  
  WishList.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a WishList from the DB
exports.destroy = function(req, res) {
  WishList.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
