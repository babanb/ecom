'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    _id: { type: Number, default: 1, unique: true },
    name: {
        type: String,
        required: true
    },
    department: {
        type: Number,
        ref: 'Department',
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, { _id: false });

CategorySchema.plugin(AutoIncrement.plugin, {
    model: 'Category',
    field: '_id',
    startAt: 100
});
module.exports = mongoose.model('Category', CategorySchema);