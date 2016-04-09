'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./intake.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.getIntakes);
router.get('/:id', auth.isAuthenticated(), controller.getIntake);
router.post('/create', auth.isAuthenticated(), controller.create);

module.exports = router;
