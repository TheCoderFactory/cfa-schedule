'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var intake = require('../intake/intake.service');

router.get('/me', auth.isAuthenticated(), controller.getMe);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/exclude/:intakeId', auth.isAuthenticated(), controller.getUsersNotInIntake);
router.get('/:intakeId', auth.isAuthenticated(), intake.getRegistrations, controller.getUsersInIntake);
router.get('/', auth.isAuthenticated(), controller.getAllUsers);


module.exports = router;
