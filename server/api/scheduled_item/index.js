'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./scheduled_item.controller');
var auth = require('../../auth/auth.service');

router.get('/some-item', auth.isAuthenticated(), controller.create);
router.post('/create-item', auth.isAuthenticated(), controller.create);

module.exports = router;
