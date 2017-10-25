'use strict';

var express = require('express');
var controller = require('./address.controller');

var router = express.Router();
/**
  * @swagger
  * /api/address:
  *   get:
  *     summary: Get Address List
  *     tags:
  *       - Address
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             _id:
  *               type: integer
  *             name:
  *               type: string
  *             userID:
  *               type: integer
  *               _id: integer
  *               name: string
  *             addressType:
  *               type: string
  *             street1:
  *               type: string
  *             street2:
  *               type: string
  *             street3:
  *               type: string
  *             street4:
  *               type: string
  *             companyName:
  *               type: string
  *             officeNumber:
  *               type: string
  *         examples:
  *           application/json: {
  *             "_id": 1,
  *             "name": "some address"
  *           }
  *       409:
  *         description: 
  */
router.get('/', controller.index);

/**
  * @swagger
  * /api/address/{Id}:
  *   get:
  *     summary: Get Address by ID
  *     tags:
  *       - Address
  *     parameters:
  *     	- name: Id
  *	    	  in: path
  *	    	  required: true
  *	    	  type: number
  *	    	  description: "Address ID"
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             _id:
  *               type: integer
  *             name:
  *               type: string
  *             userID:
  *               type: integer
  *               _id: integer
  *               name: string
  *             addressType:
  *               type: string
  *             street1:
  *               type: string
  *             street2:
  *               type: string
  *             street3:
  *               type: string
  *             street4:
  *               type: string
  *             companyName:
  *               type: string
  *             officeNumber:
  *               type: string
  *         examples:
  *           application/json: {
  *             "_id": 1,
  *             "name": "some address"
  *           }
  *       409:
  *         description: 
  */
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/getaddressByUserId/:id', controller.getAllAddress);
router.get('/getAllAddressByType/:id/:type', controller.getAllAddressByType);


module.exports = router;
