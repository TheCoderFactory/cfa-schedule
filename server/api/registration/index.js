'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./registration.controller');
var auth = require('../../auth/auth.service');
var intakeService = require('../intake/intake.service.js');

router.post('/create', intakeService.hasIntake , controller.create);
router.get('/:intakeId', controller.intakeRegistrations);
router.get('/points/:registrationId', controller.getPoints);
router.get('/awards/:registrationId/:disciplineId', controller.getDisciplineAwards);
router.delete('/delete/:registrationId/:userId', controller.delete);

module.exports = router;
