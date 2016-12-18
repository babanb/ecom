'use strict';

var express = require('express');
var controller = require('./shoppingCart.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/updateCart/:id', controller.update);
router.post('/updateCart/', controller.updateCart);
router.post('/emptyCart/', controller.emptyCart);
router.post('/getCartItems/', controller.getCartItems);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
