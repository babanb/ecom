/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/autocompleteSearchs              ->  index
 * POST    /api/autocompleteSearchs              ->  create
 * GET     /api/autocompleteSearchs/:id          ->  show
 * PUT     /api/autocompleteSearchs/:id          ->  update
 * DELETE  /api/autocompleteSearchs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var AutocompleteSearch = require('./autocompleteSearch.model');

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

// Gets a list of AutocompleteSearchs
exports.index = function(req, res) {
  AutocompleteSearch.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single AutocompleteSearch from the DB
exports.show = function(req, res) {
  AutocompleteSearch.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new AutocompleteSearch in the DB
exports.create = function(req, res) {
  AutocompleteSearch.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};



exports.autocomplete = function(req, res) {

  AutocompleteSearch.aggregate(
  // We match case insensitive ("i") as we want to prevent
  // typos to reduce our search results
  { $match:{"_id.word":{$regex: new RegExp('^'+req.params.term), $options: 'i'}} },
  { $group:{
      // Here is where the magic happens:
      // we create a list of distinct words...
      _id:"$_id.word",
      occurrences:{
        // ...add each occurrence to an array...
        $push:{
          doc:"$_id.doc",
          field:"$_id.field"
        } 
      },
      // ...and add up all occurrences to a score
      // Note that this is optional and might be skipped
      // to speed up things, as we should have a covered query
      // when not accessing $value, though I am not too sure about that
      score:{$sum:"$value"}
    }
  },
  {
    // Optional. See above
    $sort:{_id:-1,score:-1}
  }
)
  .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing AutocompleteSearch in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  AutocompleteSearch.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a AutocompleteSearch from the DB
exports.destroy = function(req, res) {
  AutocompleteSearch.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
