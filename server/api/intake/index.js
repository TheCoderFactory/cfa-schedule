'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./intake.controller');
var auth = require('../../auth/auth.service');

router.get('/', controller.getIntakes);
router.get('/:id', controller.getIntake);
router.post('/create', controller.createEdit);

module.exports = router;
