/**
 * WishList model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var WishList = require('./wishList.model');
var WishListEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WishListEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  WishList.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WishListEvents.emit(event + ':' + doc._id, doc);
    
    WishListEvents.emit(event, doc);
  }
}

module.exports = WishListEvents;
