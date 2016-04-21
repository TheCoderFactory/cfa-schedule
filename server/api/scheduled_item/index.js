'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./scheduled_item.controller');
var auth = require('../../auth/auth.service');


router.get('/:intakeId', controller.getIntakeItems);
router.get('/', controller.getAllItems);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:scheduledItemId', controller.delete)

module.exports = router;
