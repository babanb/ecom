/**
 * ShoppingCart model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ShoppingCart = require('./shoppingCart.model');
var ShoppingCartEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ShoppingCartEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ShoppingCart.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ShoppingCartEvents.emit(event + ':' + doc._id, doc);
    
    ShoppingCartEvents.emit(event, doc);
  }
}

module.exports = ShoppingCartEvents;
