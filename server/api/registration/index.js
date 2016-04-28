'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./registration.controller');
var auth = require('../../auth/auth.service');
var intakeService = require('../intake/intake.service.js');

router.post('/create', auth.adminOnly, intakeService.hasIntake , controller.create);
router.get('/:intakeId', controller.intakeRegistrations);
router.get('/points/:registrationId', controller.getPoints);
router.get('/intakePoints/:intakeId', controller.getPointsForMultiple);
router.get('/awards/:registrationId/:disciplineId', controller.getDisciplineAwards);
router.get('/awards/:registrationId', controller.getAllAwards);
router.delete('/delete/:registrationId/:userId', auth.adminOnly, controller.delete);

module.exports = router;
