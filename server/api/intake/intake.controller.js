'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Intake = require('./intake.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new intake in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Intake.create(req.body, function (err, intake) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      intake: _.omit(intake.toObject(), ['passwordHash', 'salt'])
    });
  });
};

exports.getIntake = function (req, res) {
  Intake.findById(req.intake._id, function (err, intake) {
    if (err) { return handleError(res, err); }
    if (!intake) { return res.json(401); }
    res.status(200).json(intake);
  });
};