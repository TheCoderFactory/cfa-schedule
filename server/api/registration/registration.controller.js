'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Registration = require('./registration.model');
var errorHandler = require('../../error/error-handling');

function handleError (res, err) {
  return res.status(500).send(err);
};

exports.create = function (req, res) {
};

exports.getUsersNotInIntake = function (req, res) {
  Registration.find({ _intake: { '$ne': req.params.intakeId } }, function (err, users) {
  	if (err) { return handleError(res, err); }
    res.status(200).json(users);
  });
};

exports.getAllUsers = function (req, res) {
  Registration.find(function (err, users) {
    if (err) { return handleError(res, err); }
    res.status(200).json(users);
  });
};