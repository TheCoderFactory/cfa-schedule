'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Registration = require('./registration.model');
var errorHandler = require('../../error/error-handling');

function handleError (res, err) {
  return res.status(500).send(err);
}