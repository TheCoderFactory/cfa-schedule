'use strict';

var _ = require('lodash');
var Student = require('./student.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Student
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Student.find(function (err, students) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(students);
  });
};

/**
 * Get a single Student
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (err) { return handleError(res, err); }
    if (!student) { return res.status(404).end(); }
    return res.status(200).json(student);
  });
};

/**
 * Creates a new Student in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Student.create(req.body, function (err, student) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(student);
  });
};

/**
 * Updates an existing Student in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Student.findById(req.params.id, function (err, student) {
    if (err) { return handleError(res, err); }
    if (!student) { return res.status(404).end(); }
    var updated = _.merge(student, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(student);
    });
  });
};

/**
 * Deletes a Student from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (err) { return handleError(res, err); }
    if (!student) { return res.status(404).end(); }
    student.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
