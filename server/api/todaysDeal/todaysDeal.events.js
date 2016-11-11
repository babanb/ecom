/**
 * TodaysDeal model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var TodaysDeal = require('./todaysDeal.model');
var TodaysDealEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TodaysDealEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TodaysDeal.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TodaysDealEvents.emit(event + ':' + doc._id, doc);
    
    TodaysDealEvents.emit(event, doc);
  }
}

module.exports = TodaysDealEvents;
