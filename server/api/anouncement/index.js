'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./anouncement.controller');
var auth = require('../../auth/auth.service');

router.post('/', auth.adminOnly, controller.create);
router.get('/', controller.getAnouncements);
router.get('/:intakeId', controller.getIntakeAnouncements);
router.put('/', auth.adminOnly, controller.update)
router.delete('/:anouncementId', auth.adminOnly, controller.delete)


module.exports = router;
