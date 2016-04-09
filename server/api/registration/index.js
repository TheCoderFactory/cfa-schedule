'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./registrations.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.getRegistrations);

module.exports = router;
