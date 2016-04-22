'use strict';

var _ = require('lodash');
var Award = require('./award.model');

function handleError (res, err) {
  console.log(res);
  return res.status(500).send(err);
}

/**
 * Get list of Award
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Award.find(function (err, awards) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(awards);
  });
};

/**
 * Get a single Award
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Award.findById(req.params.id, function (err, award) {
    if (err) { return handleError(res, err); }
    if (!award) { return res.status(404).end(); }
    return res.status(200).json(award);
  });
};

/**
 * Creates a new Award in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Award.create(req.body, function (err, award) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(award);
  });
};

/**
 * Updates an existing Award in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Award.findById(req.params.id, function (err, award) {
    if (err) { return handleError(res, err); }
    if (!award) { return res.status(404).end(); }
    var updated = _.merge(award, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(award);
    });
  });
};

/**
 * Deletes a Award from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Award.findById(req.params.id, function (err, award) {
    if (err) { return handleError(res, err); }
    if (!award) { return res.status(404).end(); }
    award.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
