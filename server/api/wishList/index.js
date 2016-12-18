'use strict';

var express = require('express');
var controller = require('./wishList.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/updateList/:id', controller.update);
router.post('/updateList/', controller.updateList);
router.post('/getListItems/', controller.getListItems);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
