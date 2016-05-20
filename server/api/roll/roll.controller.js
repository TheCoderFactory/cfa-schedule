'use strict';


var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Roll = require('./roll.model');
var errorHandler = require('../../error/error-handling');

exports.create = function (req, res) {

	var roll = new Roll ({
		_intake: req.body._intake,
		attendance: req.body.attendance,
		date: req.body.date
	});

	roll.save(function (err, roll) {
		if(err) { return errorHandler(res, err, 500); }

		res.json(roll);
	
	});

};

exports.update = function (req, res) {

	Roll.findOne({_id: req.params.id}, function (err, roll) {
		if(err) { return errorHandler(res, err, 500); }
		if(!roll) { return errorHandler(res, err, 404); }		
		roll.attendance = req.body.attendance,
		roll.date = req.body.date
	})
}