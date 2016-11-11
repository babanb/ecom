/**
 * PaymentType model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var PaymentType = require('./paymentType.model');
var PaymentTypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PaymentTypeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PaymentType.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PaymentTypeEvents.emit(event + ':' + doc._id, doc);
    
    PaymentTypeEvents.emit(event, doc);
  }
}

module.exports = PaymentTypeEvents;
