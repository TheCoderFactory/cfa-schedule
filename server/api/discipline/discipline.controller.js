'use strict';

var _ = require('lodash');
var Discipline = require('./discipline.model');

function handleError (res, err) {
  console.log(res);
  return res.status(500).send(err);
}

/**
 * Get list of Discipline
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Discipline.find(function (err, disciplines) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(disciplines);
  });
};

/**
 * Get a single Discipline
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Discipline.findById(req.params.id, function (err, discipline) {
    if (err) { return handleError(res, err); }
    if (!discipline) { return res.status(404).end(); }
    return res.status(200).json(discipline);
  });
};

/**
 * Creates a new Discipline in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Discipline.create(req.body, function (err, discipline) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(discipline);
  });
};

/**
 * Updates an existing Discipline in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Discipline.findById(req.params.id, function (err, discipline) {
    if (err) { return handleError(res, err); }
    if (!discipline) { return res.status(404).end(); }
    var updated = _.merge(discipline, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(discipline);
    });
  });
};

/**
 * Deletes a Discipline from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Discipline.findById(req.params.id, function (err, discipline) {
    if (err) { return handleError(res, err); }
    if (!discipline) { return res.status(404).end(); }
    discipline.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
