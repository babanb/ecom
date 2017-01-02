/**
 * Checkout model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Checkout = require('./checkout.model');
var CheckoutEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CheckoutEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Checkout.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CheckoutEvents.emit(event + ':' + doc._id, doc);
    
    CheckoutEvents.emit(event, doc);
  }
}

module.exports = CheckoutEvents;
