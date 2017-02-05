'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var ProductReviewsSchema = new Schema({
    productID: {
        type: Number,
        ref: 'Products',
        required: true
    },
    comments: {
        type: String
    },
    userID: {
        type: Number,
        ref: 'Users',
        required: true
    },
    ipAddress: {
        type: String
    },
    ratings: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });

ProductReviewsSchema.plugin(AutoIncrement.plugin, {
    model: 'ProductReviews',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('ProductReviews', ProductReviewsSchema);