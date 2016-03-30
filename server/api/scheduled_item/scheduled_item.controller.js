'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Scheduled_item = require('./scheduled_item.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new Scheduled_item in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Scheduled_item.create(req.body, function (err, scheduled_item) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      scheduled_item: _.omit(scheduled_item.toObject(), ['passwordHash', 'salt'])
    });
  });
};