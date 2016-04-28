'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./award.controller');
var auth = require('../../auth/auth.service');


router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.adminOnly, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', auth.adminOnly, controller.destroy);


module.exports = router;
