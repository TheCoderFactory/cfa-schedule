'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./scheduled_item.controller');
var auth = require('../../auth/auth.service');


router.get('/:intakeId', auth.isAuthenticated(), controller.getIntakeItems);
router.get('/', auth.isAuthenticated(), controller.getAllItems);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/', auth.isAuthenticated(), controller.update);
router.delete('/:scheduledItemId', auth.isAuthenticated(), controller.delete)

module.exports = router;
