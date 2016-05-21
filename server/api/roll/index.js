'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./roll.controller');
var auth = require('../../auth/auth.service');

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
// router.get('/:id', controller.show);
router.get('/', controller.index);

module.exports = router;
