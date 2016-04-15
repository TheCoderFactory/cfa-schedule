'use strict';

var _ = require('lodash');
var StudentAward = require('./student-award.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of StudentAward
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  StudentAward.find(function (err, studentAwards) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(studentAwards);
  });
};

/**
 * Get a single StudentAward
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  StudentAward.findById(req.params.id, function (err, studentAward) {
    if (err) { return handleError(res, err); }
    if (!studentAward) { return res.status(404).end(); }
    return res.status(200).json(studentAward);
  });
};

/**
 * Creates a new StudentAward in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  StudentAward.create(req.body, function (err, studentAward) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(studentAward);
  });
};

/**
 * Updates an existing StudentAward in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  StudentAward.findById(req.params.id, function (err, studentAward) {
    if (err) { return handleError(res, err); }
    if (!studentAward) { return res.status(404).end(); }
    var updated = _.merge(studentAward, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(studentAward);
    });
  });
};

/**
 * Deletes a StudentAward from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  StudentAward.findById(req.params.id, function (err, studentAward) {
    if (err) { return handleError(res, err); }
    if (!studentAward) { return res.status(404).end(); }
    studentAward.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
