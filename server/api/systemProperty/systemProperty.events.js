/**
 * SystemProperty model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var SystemProperty = require('./systemProperty.model');
var SystemPropertyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SystemPropertyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SystemProperty.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SystemPropertyEvents.emit(event + ':' + doc._id, doc);
    
    SystemPropertyEvents.emit(event, doc);
  }
}

module.exports = SystemPropertyEvents;
