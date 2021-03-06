/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/address              ->  index
 * POST    /api/address              ->  create
 * GET     /api/address/:id          ->  show
 * PUT     /api/address/:id          ->  update
 * DELETE  /api/address/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Address = require('./address.model');

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

// Gets a all address by user from the DB
exports.getAllAddress = function(req, res) {
  Address.find({userID:req.params.id})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a all address by user from the DB
exports.getAllAddressByType = function(req, res) {
  Address.find({userID:req.params.id, addressType: req.params.type})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a list of Addresss
exports.index = function(req, res) {
  Address.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Address from the DB
exports.show = function(req, res) {
  Address.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Address in the DB
exports.create = function(req, res) {
  Address.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Address in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  Address.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Address from the DB
exports.destroy = function(req, res) {
  Address.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
