/**
 * HomePageSlider model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var HomePageSlider = require('./homePageSlider.model');
var HomePageSliderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HomePageSliderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  HomePageSlider.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HomePageSliderEvents.emit(event + ':' + doc._id, doc);
    
    HomePageSliderEvents.emit(event, doc);
  }
}

module.exports = HomePageSliderEvents;
