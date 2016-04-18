'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./anouncement.controller');
var auth = require('../../auth/auth.service');

router.post('/', auth.isAuthenticated(), controller.create);
router.get('/', auth.isAuthenticated(), controller.getAnouncements);
router.put('/', auth.isAuthenticated(), controller.update)
router.delete('/:anouncementId', auth.isAuthenticated(), controller.delete)


module.exports = router;
