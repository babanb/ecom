/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {
  //cors handled
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Insert routes below
  app.use('/api/productFilters', require('./api/productFilter'));
  app.use('/api/homePageSectionItems', require('./api/homePageSectionItems'));
  app.use('/api/homePageSections', require('./api/homePageSection'));
  app.use('/api/homePageSliders', require('./api/homePageSlider'));
  app.use('/api/checkout', require('./api/checkout'));
  app.use('/api/systemProperties', require('./api/systemProperty'));
  app.use('/api/address', require('./api/address'));
  app.use('/api/productsProperties', require('./api/uploadProductsProperties'));
  app.use('/api/productReviews', require('./api/productReviews'));
  app.use('/api/todaysDeal', require('./api/todaysDeal'));
  app.use('/api/paymentStatus', require('./api/paymentStatus'));
  app.use('/api/orderStatus', require('./api/orderStatus'));
  app.use('/api/paymentTypes', require('./api/paymentType'));
  app.use('/api/autocompleteSearchs', require('./api/autocompleteSearch'));
  app.use('/api/shoppingCart', require('./api/shoppingCart'));
  app.use('/api/orders', require('./api/orders'));
  app.use('/api/products', require('./api/products'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/subCategories', require('./api/subCategory'));
  app.use('/api/systemProperties', require('./api/systemProperty'));
  app.use('/api/wishLists', require('./api/wishList'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/menus', require('./api/navigationMenu'));

  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*')
   .get(errors[404]);

};
