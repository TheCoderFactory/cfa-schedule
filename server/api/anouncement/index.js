'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./anouncement.controller');
var auth = require('../../auth/auth.service');

router.post('/', controller.create);
router.get('/', controller.getAnouncements);
router.put('/', controller.update)
router.delete('/:anouncementId', controller.delete)


module.exports = router;
