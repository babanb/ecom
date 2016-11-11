'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProductReviewsSchema = new Schema({
  productID: {
      type: Schema.Types.ObjectId, ref: 'Products',
      required: true
    },
    comments: {
      type: String
    },
    userID: {
      type: Schema.Types.ObjectId, ref: 'Users',
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
    }
});

module.exports = mongoose.model('ProductReviews', ProductReviewsSchema);
