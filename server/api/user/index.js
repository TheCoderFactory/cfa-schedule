'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var intake = require('../intake/intake.service');

router.get('/me', controller.getMe);
router.post('/', auth.adminOnly, controller.create);
router.get('/exclude/:intakeId', controller.getUsersNotInIntake);
router.get('/', controller.getAllUsers);
router.get('/:userId', controller.getUser);
router.get('/checkRegistration/:userId/:intakeId', controller.checkRegistration);


module.exports = router;
