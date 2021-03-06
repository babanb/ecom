'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        ref: 'Category',
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });

SubCategorySchema.plugin(AutoIncrement.plugin, {
    model: 'SubCategory',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('SubCategory', SubCategorySchema);