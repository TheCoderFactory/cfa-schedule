'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Anouncement = require('./anouncement.model');
var errorHandler = require('../../error/error-handling');

function handleError (res, err) {
  console.log(err);
  return res.status(500).send(err);
}

exports.getAnouncements = function (req, res) {

}
};