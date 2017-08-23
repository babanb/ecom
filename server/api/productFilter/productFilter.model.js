'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var ProductFilterSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    filterOption: {
        type: String,
        required: true
    },
    categoryID: {
        type: Number,
        ref: 'Category'
    },
    _id: { type: Number, default: 1, unique: true }

}, { _id: false });

ProductFilterSchema.plugin(AutoIncrement.plugin, {
    model: 'ProductFilter',
    field: '_id',
    startAt: 1
});

module.exports = mongoose.model('ProductFilter', ProductFilterSchema);
