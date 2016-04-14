'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Registration = require('./registration.model');
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
		_intake: req.intake._id
	});
	console.log('THIS IS THE REG BEFORE SAVE: ' + registration);

	registration.save(function (err, registration) {
		if (err) { return handleError(res, err); }
		console.log(registration);		
		// add registration to the user
		User.findOne({ _id:req.body.userId }, function (err, user) {
			user._registrations.push(registration._id);
			user.save(function (err, user) {
				if (err) { return handleError(res, err); }
				res.json(user);
			});
		});

	});
};

