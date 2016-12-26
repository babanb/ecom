/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/systemProperties              ->  index
 * POST    /api/systemProperties              ->  create
 * GET     /api/systemProperties/:id          ->  show
 * PUT     /api/systemProperties/:id          ->  update
 * DELETE  /api/systemProperties/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var SystemProperty = require('./systemProperty.model');

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

// Gets a list of SystemPropertys
exports.index = function(req, res) {
  SystemProperty.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single SystemProperty from the DB
exports.show = function(req, res) {
  SystemProperty.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new SystemProperty in the DB
exports.create = function(req, res) {
  SystemProperty.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing SystemProperty in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  SystemProperty.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a SystemProperty from the DB
exports.destroy = function(req, res) {
  SystemProperty.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.getValueByKey = function(req, res) {
    SystemProperty.find({
            key: req.params.key
        }).select({ "value": 1, "_id": 1})
        .exec()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

exports.updateValueByKey = function(req, res) {
  
  SystemProperty.findOneAsync({
          key: req.body.key
      })
      .then(function(sysProp) {
          if (!sysProp) {
            return res.status(404).json({error:"This key is not added."});
          }else{ 
                console.log("fpunf ");
                 sysProp.value = req.body.value;
                return sysProp.saveAsync()
                  .then(function() {  
                    res.status(200).json({
                                            resilt: "success"
                                        });
                  })
                  .catch(handleError(res));
          }
     });
    
};


