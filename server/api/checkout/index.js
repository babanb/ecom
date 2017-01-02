'use strict';

var express = require('express');
var controller = require('./checkout.controller');

import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/canceled', controller.canceled);
router.get('/:id', controller.show);
router.post('/makePayment', controller.makePayment);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
