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
  var intake = new Intake ({
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
    colour: req.body.colour,
    image: req.body.image,
    _term_id: []

  });

  intake.save(function (err, data) {
    if (err) throw err;

    res.json(data);
  })
};

exports.getIntakes = function (req, res) {
  Intake.find(function (err, intake) {
    if (err) { return handleError(res, err); }
    if (!intake) { return res.json(401); }
    res.status(200).json(intake);
  });
};