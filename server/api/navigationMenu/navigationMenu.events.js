/**
 * NavigationMenu model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var NavigationMenu = require('./navigationMenu.model');
var NavigationMenuEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NavigationMenuEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  NavigationMenu.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    NavigationMenuEvents.emit(event + ':' + doc._id, doc);
    
    NavigationMenuEvents.emit(event, doc);
  }
}

module.exports = NavigationMenuEvents;
