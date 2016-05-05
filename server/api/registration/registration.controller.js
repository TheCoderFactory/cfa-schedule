'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Registration = require('./registration.model');
var AwardDiscipline = require('../award-discipline/award-discipline.model');
var errorHandler = require('../../error/error-handling');
var User = require('../user/user.model.js');


function handleError (res, err) {
  console.log(err);
  return res.status(500).send(err);
};

exports.create = function (req, res) {
	
	console.log('From controller: ' + req.intake);
	console.log('From controller: ' + req.intake._id);
	
	var registration = new Registration ({
		role: req.body.role,
		_intake: req.intake._id,
		_user: req.body.userId
	});

	registration.save(function (err, registration) {
		if (err) { return handleError(res, err); }
		// add registration to the user as well
		User.findOne({ _id:req.body.userId }, function (err, user) {
			user._registrations.push(registration._id);
			user.save(function (err, user) {
				if (err) { return handleError(res, err); }
				Registration.findOne({_id: registration._id})
					.populate('_user')
					.exec(function (err, registration) {
						if (err) { return handleError(res, err); }
						res.json(registration);
					})
			});
		});
	});
};

exports.delete = function (req, res) {
	var registrationId = req.params.registrationId;
	var userId = req.params.userId;
	Registration
		.remove({_id: registrationId}, function (err) {
			if (err) { return handleError(res, err); }
			// Remove all award-disciplines for that registration
			AwardDiscipline.remove({_registration: registrationId}, function (err) {
				//Remove from registration from user model too
				User
					.findOne({_id: userId}, function (err, user) {
						user._registrations.remove(registrationId);
						user.save(function (err, user) {
							if (err) { return handleError(res, err); }
							res.send(registrationId);
						});
					});
			});
		});
};

exports.intakeRegistrations = function (req, res) {
	var intakeId = req.params.intakeId;

	Registration
		.find({_intake: intakeId})
		.populate('_user')
		.exec(function (err, registrations) {
			if (err) { handleError(res, err); }
	    if (!registrations) { return res.send(401); }
			res.json(registrations);
		});
};

exports.getPointsForMultiple = function (req, res) {
	var registrationPoints = {};
	var intakeId = req.params.intakeId;
	Registration
		.find({_intake: intakeId})
		.populate({path: ' _awardDisciplines', populate: {path: '_award _discipline'}})
		.exec(function (err, registrations) {
			if (err) { return next(err); }
	     registrations.forEach(function (registration) {
	     	registrationPoints[registration._id] = registration.getPoints();
	    });
	     return res.json(registrationPoints);
		});
		
};

exports.getPoints = function (req, res) {
	Registration
		.findById(req.params.registrationId)
		.populate({path: ' _awardDisciplines', populate: {path: '_award _discipline'}})
		.exec(function (err, registration) {
			if (err) { return handleError(res, err); }
			res.json(registration.getPoints());
		});
};

// gets a registrations awards for a particular discipline
exports.getDisciplineAwards = function (req, res) {
	console.log(req.params);
	Registration
		.findById(req.params.registrationId)
		.populate({path: ' _awardDisciplines', populate: {path: '_award _discipline'}})
		.exec(function (err, registration) {
			if (err) { return handleError(res, err); }
			res.json(registration.getDisciplineAwards(req.params.disciplineId));
		});
};

// gets a registrations awards for all discipline
exports.getAllAwards = function (req, res) {
	console.log(req.params);
	Registration
		.findById(req.params.registrationId)
		.populate({path: ' _awardDisciplines', populate: {path: '_award _discipline'}})
		.exec(function (err, registration) {
			if (err) { return handleError(res, err); }
			res.json(registration.getAllAwards());
		});
}

