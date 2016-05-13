'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var intake = require('../intake/intake.service');

router.get('/me', controller.getMe);
router.post('/', auth.isAuthenticated(), controller.create);
router.get('/exclude/:intakeId', auth.isAuthenticated(), controller.getUsersNotInIntake);
router.get('/', auth.isAuthenticated(), controller.getAllUsers);
router.get('/:userId', controller.getUser);
router.get('/checkRegistration/:userId/:intakeId', auth.isAuthenticated(), controller.checkRegistration);
router.put('/:id', auth.isAuthenticated(), controller.update);

module.exports = router;
