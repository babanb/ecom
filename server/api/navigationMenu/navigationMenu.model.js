'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var NavigationMenuSchema = new Schema({
  	subCategory: { type: Schema.Types.ObjectId, ref: 'subCategory' },
    img: String,
    isActive: Boolean,
    parent: String,
    title:  {
        type: String,
        required: true
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    level:  {
        type: Number,
        required: true
    },
    sequence:  {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('NavigationMenu', NavigationMenuSchema);
