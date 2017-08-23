'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);
var Schema = mongoose.Schema;

var HomePageSectionItemsSchema = new Schema({
    name: {
        type: String
    },
    searchUrl: {
        type: String
    },
    imgUrl: {
        type: String
    },
    section: {
        type: Number,
        ref: 'HomePageSection',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    isActive: {
        type: Boolean
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });

HomePageSectionItemsSchema.plugin(AutoIncrement.plugin, {
    model: 'HomePageSectionItems',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('HomePageSectionItems', HomePageSectionItemsSchema);
