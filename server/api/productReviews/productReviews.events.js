/**
 * ProductReviews model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ProductReviews = require('./productReviews.model');
var ProductReviewsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProductReviewsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ProductReviews.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProductReviewsEvents.emit(event + ':' + doc._id, doc);
    
    ProductReviewsEvents.emit(event, doc);
  }
}

module.exports = ProductReviewsEvents;
