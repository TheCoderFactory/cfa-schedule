'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./term.controller');
var auth = require('../../auth/auth.service');

router.post('/create-term', auth.isAuthenticated(), controller.create);

module.exports = router;
