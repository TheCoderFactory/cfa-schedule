'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Registration = require('./registration.model');
var errorHandler = require('../../error/error-handling');
var User = require('../user/user.model.js');

function handleError (res, err) {
  return res.status(500).send(err);
};

exports.create = function (req, res) {
	console.log(req.body);
	var registration = new Registration ({
		role: req.body.role,
		_intake: req.body.intakeId
	});

	registration.save(function (err, registration) {
		if (err) { return handleError(res, err); }
		
		// add registration to the user
		User.findByIdAndUpdate(req.body.userId, {
			_registrations: registration
		}, function (err, user) {
			if (err) { 
				return handleError(res, err); 
			} else {
				res.json(user);
				
			}
			
		});

	});
};

