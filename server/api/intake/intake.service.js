'use strict';

var Intake = require('./intake.model.js');
var Registration = require('../registration/registration.model.js');

// Attach the intake object to the request if sent
exports.hasIntake = function (req, res, next) {
	var intakeId = req.body.intakeId || req.params.intakeId;

	Intake.findOne({_id: intakeId}, function (err, intake) {
		if (err) { return next(err); }
    if (!intake) { return res.send(401); }
    req.intake = intake;
    next();
	});
};

// Get registration of intake
exports.getRegistrations = function (req, res, next) {
	var intakeId = req.body.intakeId || req.params.intakeId;

	Registration.find({_intake: intakeId}, function (err, registrations) {
		if (err) { return next(err); }
    if (!registrations) { return res.send(401); }
		console.log('COMING FROM GET REG INTAKE SERVICE: ' + registrations);
		req.registrations = registrations;
		next()
	});
};