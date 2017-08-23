/**
 * ProductFilter model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ProductFilter = require('./productFilter.model');
var ProductFilterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProductFilterEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ProductFilter.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProductFilterEvents.emit(event + ':' + doc._id, doc);
    
    ProductFilterEvents.emit(event, doc);
  }
}

module.exports = ProductFilterEvents;
