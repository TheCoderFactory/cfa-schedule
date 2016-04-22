'use strict';

var _ = require('lodash');
var AwardDiscipline = require('./award-discipline.model');
var User = require('../user/user.model');
var Registration = require('../registration/registration.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of AwardDiscipline
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  AwardDiscipline
    .find()
    .populate({path: '_award _discipline _registration', populate: {path: '_user _intake'}})
    .exec(function (err, awardDisciplines) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(awardDisciplines);
    });  
};

/**
 * Get a single AwardDiscipline
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  AwardDiscipline.findById(req.params.id, function (err, awardDiscipline) {
    if (err) { return handleError(res, err); }
    if (!awardDiscipline) { return res.status(404).end(); }
    return res.status(200).json(awardDiscipline);
  });
};

/**
 * Creates a new AwardDiscipline in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  AwardDiscipline.create(req.body, function (err, awardDiscipline) {
    if (err) { return handleError(res, err); }
    // Add to registration array
    Registration.findById(awardDiscipline._registration, function (err, registration) {
      if (err || registration.role != 'Student') { return handleError(res, err); }
      console.log('ADid: ' + awardDiscipline._id);
      //Check that the registration is a student
      registration._awardDisciplines.push(awardDiscipline._id);
      registration.save(function (err) {
        if (err) { return handleError(res, err); }
        // populate and send back to view
        awardDiscipline
          .populate({path: '_award _discipline _registration', populate: {path: '_user _intake'}},  
            function (err, awardDiscipline) {
              if (err) { return handleError(res, err); }
              return res.status(201).json(awardDiscipline);
            });
        });
    });
  });
};

/**
 * Updates an existing AwardDiscipline in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  AwardDiscipline.findById(req.params.id, function (err, awardDiscipline) {
    if (err) { return handleError(res, err); }
    if (!awardDiscipline) { return res.status(404).end(); }
    var updated = _.merge(awardDiscipline, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(awardDiscipline);
    });
  });
};

/**
 * Deletes a AwardDiscipline from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  var awardDisciplineId = req.params.id;
  AwardDiscipline.findById(awardDisciplineId, function (err, awardDiscipline) {
    if (err) { return handleError(res, err); }
    if (!awardDiscipline) { return res.status(404).end(); }
    awardDiscipline.remove(function (err) {
      if (err) { return handleError(res, err); }
      // Remove from registration as well
      Registration.findOne({_id: awardDiscipline._registration}, function (err, registration) {
        registration._awardDisciplines.remove(awardDisciplineId);
        registration.save(function (err) {
          return res.status(204).end();
        });
      });
    });
  });
};

exports.registrationAwardDisciplines = function (req, res) { 
  AwardDiscipline
    .find({_registration: req.params.registrationId})
    .populate('_award _discipline _registration')
    .exec(function(err, registrationAwardDisciplines) {
      if (err) { return handleError(res, err); }
      return res.json(registrationAwardDisciplines);
    });
  

}