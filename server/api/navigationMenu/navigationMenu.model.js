'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var NavigationMenuSchema = new Schema({
  	subCategory: { type: Number, ref: 'subCategory' },
    img: String,
    isActive: Boolean,
    parent: String,
    title:  {
        type: String,
        required: true
    },
    category: { type: Number, ref: 'Category' },
    department: { type: Number, ref: 'Department' },
    level:  {
        type: Number,
        required: true
    },
    sequence:  {
        type: Number,
        required: true
    },
    _id: {type:Number,  default: 1, unique:true}
}, { _id: false });


module.exports = mongoose.model('NavigationMenu', NavigationMenuSchema);
NavigationMenuSchema.plugin(AutoIncrement.plugin, 'NavigationMenu');