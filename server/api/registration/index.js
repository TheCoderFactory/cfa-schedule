'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./registration.controller');
var auth = require('../../auth/auth.service');
var intakeService = require('../intake/intake.service.js');

router.post('/create', auth.isAuthenticated(), intakeService.hasIntake , controller.create);


module.exports = router;
