'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./scheduled_item.controller');
var auth = require('../../auth/auth.service');

router.get('/:id', auth.isAuthenticated(), controller.getItem);
router.post('/create', auth.isAuthenticated(), controller.create);

module.exports = router;
