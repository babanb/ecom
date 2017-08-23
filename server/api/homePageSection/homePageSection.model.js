'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);
var Schema = mongoose.Schema;

var HomePageSectionSchema = new Schema({
  fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    isAdvt: {
        type: Boolean,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });

HomePageSectionSchema.plugin(AutoIncrement.plugin, {
    model: 'HomePageSection',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('HomePageSection', HomePageSectionSchema);
