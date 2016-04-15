'use strict';

var config = require('../config/environment');

exports.handle = function (res, err, status) {
	console.log(err);
  res.status(status).json({err: err});
}
