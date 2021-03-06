/**
 * Department model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Department = require('./department.model');
var DepartmentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DepartmentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Department.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DepartmentEvents.emit(event + ':' + doc._id, doc);
    
    DepartmentEvents.emit(event, doc);
  }
}

module.exports = DepartmentEvents;
