/**
 * ProductMaster model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ProductMaster = require('./productMaster.model');
var ProductMasterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProductMasterEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ProductMaster.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProductMasterEvents.emit(event + ':' + doc._id, doc);
    
    ProductMasterEvents.emit(event, doc);
  }
}

module.exports = ProductMasterEvents;
