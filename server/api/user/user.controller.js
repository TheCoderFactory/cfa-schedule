'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var User = require('./user.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: authService.signToken(user._id)
    });
  });
};

/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */
exports.getMe = function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    res.status(200).json(user);
  });
};

exports.getUser = function (req, res) {
  User.findById(req.params.userId)
    .populate({path: '_registrations', populate: {path: '_intake'}})
    .exec(function (err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.json(401); }
      res.status(200).json(user);
    });
};


exports.getUsersNotInIntake = function (req, res) {
  console.log(req.params);
  var intakeId = req.params.intakeId;
  User
    .find()
    .populate({
      path: '_registrations',
    })
    .exec(function (err, users) {

      if (err) { return handleError(res, err); }
      console.log(users);
      users = _.filter(users, function (user) {
        // return false if has intake in
        var noIntake = _.every(user._registrations, function (reg) {
          if (reg._intake.toString() === intakeId) {
            return false;
          } else {
            return true;
          }
        });
        return noIntake;
      });

      res.status(200).json(users);
    })
};

exports.getUsersInIntake = function (req, res) {
  var intakeRegistrations = req.registrations;
  console.log('POPULATED REGS: ' + intakeRegistrations[0]);
  
};

exports.getAllUsers = function (req, res) {
  User
    .find()
    .populate({
      path: '_registrations',
      populate: {
        path: '_intake'
      }
    })
    .exec(function (err, users) {
      if (err) { return handleError(res, err); }
      res.status(200).json(users);
    });
};


