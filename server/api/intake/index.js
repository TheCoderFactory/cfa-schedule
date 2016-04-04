'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./intake.controller');
var auth = require('../../auth/auth.service');

router.get('/intake', auth.isAuthenticated(), controller.create);
router.post('/create-intake', controller.create);

module.exports = router;
