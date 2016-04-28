'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./scheduled_item.controller');
var auth = require('../../auth/auth.service');


router.get('/:intakeId', controller.getIntakeItems);
router.get('/', controller.getAllItems);
router.post('/', auth.adminOnly, controller.create);
router.put('/', auth.adminOnly, controller.update);
router.delete('/:scheduledItemId', auth.adminOnly, controller.delete)

module.exports = router;
