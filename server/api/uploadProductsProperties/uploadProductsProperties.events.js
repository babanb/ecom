/**
 * UploadProductsProperties model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var UploadProductsProperties = require('./uploadProductsProperties.model');
var UploadProductsPropertiesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UploadProductsPropertiesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UploadProductsProperties.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UploadProductsPropertiesEvents.emit(event + ':' + doc._id, doc);
    
    UploadProductsPropertiesEvents.emit(event, doc);
  }
}

module.exports = UploadProductsPropertiesEvents;
