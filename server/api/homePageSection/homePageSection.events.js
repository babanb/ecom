/**
 * HomePageSection model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var HomePageSection = require('./homePageSection.model');
var HomePageSectionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HomePageSectionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  HomePageSection.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HomePageSectionEvents.emit(event + ':' + doc._id, doc);
    
    HomePageSectionEvents.emit(event, doc);
  }
}

module.exports = HomePageSectionEvents;
