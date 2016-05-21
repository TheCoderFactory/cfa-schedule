'use strict';


var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Roll = require('./roll.model');
var errorHandler = require('../../error/error-handling');

exports.index = function (req, res) {
	Roll
		.find()
		.populate('attendance._registration _intake')
		.exec(function (err, rolls) {
			if (err) { return errorHandler(res, err, 500); }
			if (!rolls) { return errorHandler(res, err, 404); }

			res.json(rolls);
		});
}


exports.create = function (req, res) {

	var roll = new Roll ({
		_intake: req.body._intake,
		attendance: req.body.attendance,
		date: req.body.date
	});

	roll.attendancePercent = Roll.attendancePercent(roll.attendance);
	console.log(roll.attendancePercent);

	roll.save(function (err, roll) {
		if(err) { return errorHandler(res, err, 500); }
		 // populate and send back
		 Roll
		 	.findOne({_id: roll._id})
		 	.populate('attendance._registration _intake')
		 	.exec(function (err, roll) {
		 		if (err) { return errorHandler(res, err, 500); }
		 		res.json(roll);
		 	});
	});
};

exports.update = function (req, res) {

	Roll.findOne({_id: req.params.id}, function (err, roll) {
		if(err) { return errorHandler(res, err, 500); }
		if(!roll) { return errorHandler(res, err, 404); }		
		// updated values
		roll.attendance = req.body.attendance;
		roll.date = req.body.date;
		roll.attendancePercent = Roll.attendancePercent(roll.attendance);
		// save new document
		roll.save(function (err, roll) {
			if(err) { return errorHandler(res, err, 500); }
			// populate and send back
			Roll
			 	.findOne({_id: roll._id})
			 	.populate('attendance._registration _intake')
			 	.exec(function (err, roll) {
			 		if (err) { return errorHandler(res, err, 500); }
			 		res.json(roll);
			 	});
		});
	});
};

exports.delete = function (req, res) {

	Roll
		.remove({_id: req.params.id}, function (err) {
			if(err) { return errorHandler(res, err, 500); }
			res.send('roll deleted');
		})
};


