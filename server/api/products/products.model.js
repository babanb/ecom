'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var textSearch = require('mongoose-text-search');

var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    active: Boolean,
   	newOld: String,
	description: { type: String, required: true },
    externalProductId: String,
    model: String,
    make: String,
    productSiteLaunchDate: Date,
    merchantReleaseDate: Date,
    restockDate: Date,
    quantity: { type: Number, required: true },
    saleFromDate: Date,
    saleEndDate: Date,
    maxShipQty: Number,
    itemPackageQty: Number,
    numberOfItems: Number,
    isGiftwrapped: Boolean,
    isDiscontinuedByManufacturer: Boolean,
    isGiftMessaged: String,
    shippingWeight: String,
    shippingWeightUnitOfMeasure: String,
    weightUnitOfMeasure: String,
    length: String,
    width: String,
    height: String,
    point1: String,
    point2: String,
    point3: String,
    point4: String,
    point5: String,
    s3: { type: String, required: true },
    s4: { type: String},
    s5: { type: String},
    p3: { type: String},
    p4: { type: String},
    s6: { type: String},
    otherImageUrl: String,
    otherImageUrl1: String,
    otherImageUrl2: String,
    otherImageUrl3: String,
    otherImageUrl4: String,
    otherImageUrl5: String,
    otherImageUrl6: String,
    otherImageUrl7: String,
    otherImageUrl8: String,
    color: String,
    size: String,
    sizeMap: String,
    colorMap: String,
    discount: String,
    finalDiscount: String,
    spcialOffer: String,
    offer1: String,
    offer4: String,
    offerAmt: String,
    offerPrice: String,
    discountOnDiscount: String,
    brand: { type: String, required: true },
    listPrice: { type: Number, required: true },
    mainImageUrl: { type: String, required: true },
    name: { type: String, required: true },
    p1: { type: String, required: true },
    s1: { type: String, required: true },
    s2: { type: String, required: true },
    p2: { type: String, required: true },
    salePrice: { type: Number, required: true },
    sku: { type: String, required: true },
    dept: { type: String, required: true },
    cat: { type: String, required: true },
    vendorID: { type: Number, required: true },
    instock: String,
    subCat: { type: String, required: true },
    Features: Object,
    _id: {type:Number,  default: 1, unique:true},
}, { _id: false });


ProductsSchema.plugin(textSearch);
ProductsSchema.index({ name: 'text', subCat: 'text', sku: 'text', dept: 'text', cat: 'text', brand: 'text', s1: 'text', s2: 'text', p1: 'text', p2: 'text' });

module.exports = mongoose.model('Products', ProductsSchema);
ProductsSchema.plugin(AutoIncrement.plugin, 'Products');