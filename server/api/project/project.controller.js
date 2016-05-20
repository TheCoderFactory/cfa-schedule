'use strict';

var _ = require('lodash');
var Project = require('./project.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Project
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Project    
  .find()
    .populate({path: '_intake _registrations', populate: {path: '_user'}})
    .exec(function (err, awardDisciplines) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(awardDisciplines);
    });
};

/**
 * Get a single Project
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if (!project) { return res.status(404).end(); }
    return res.status(200).json(project);
  });
};

/**
 * Creates a new Project in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Project.create(req.body, function (err, project) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(project);
  });
};

/**
 * Updates an existing Project in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if (!project) { return res.status(404).end(); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(project);
    });
  });
};

/**
 * Deletes a Project from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if (!project) { return res.status(404).end(); }
    project.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
