'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./registration.controller');
var auth = require('../../auth/auth.service');

router.get('/:intakeId', auth.isAuthenticated(), controller.getUsersNotInIntake);
router.get('/', auth.isAuthenticated(), controller.getAllUsers);

module.exports = router;
