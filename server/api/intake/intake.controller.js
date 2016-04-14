'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Intake = require('./intake.model');
var errorHandler = require('../../error/error-handling');

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

  // Check if intake already exists --> either way send back the object
  if (req.body._id) {
    // if there is a id then this an update
    Intake.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      colour: req.body.colour,
      terms: req.body.terms

    }, function (err, intake) {
      if (err) 
        errorHandler.handle(res, err, 404);
      else {
        intake.edited = true;
        res.json(intake);
      }
    });
  } else {
    var intake = new Intake ({
      name: req.body.name,
      colour: req.body.colour,
      terms: req.body.terms

    });
    // if there is not an id save it
    intake.save(function (err, intake) {
      if (err) 
        errorHandler.handle(res, err, 404);
      else {
        intake.edited = false;
        res.json(intake);
      }
    });
  }

};

exports.getIntakes = function (req, res) {
  Intake.find(function (err, intakes) {
    if (err) { return handleError(res, err); }
    if (!intakes) { return res.json(401); }
    res.status(200).json(intakes);
  });
};

exports.getIntake = function (req, res) {
  Intake.findById({_id: req.params.id}, function (err, intake) {
    if (err) { return handleError(res, err); }
    if (!intake) { return res.json(401); }
    res.status(200).json(intake);
  });
};