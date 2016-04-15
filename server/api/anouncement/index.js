'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./anouncement.controller');
var auth = require('../../auth/auth.service');

router.get('/', auth.isAuthenticated(), controller.getAnouncements);

module.exports = router;
