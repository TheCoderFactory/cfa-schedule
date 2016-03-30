'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Term = require('./term.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new term in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Term.create(req.body, function (err, term) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      term: _.omit(term.toObject(), ['passwordHash', 'salt'])
    });
  });
};