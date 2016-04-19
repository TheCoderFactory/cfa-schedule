'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./discipline.controller');
var auth = require('../../auth/auth.service');


router.get('/',  auth.isAuthenticated(), controller.index);
router.get('/:id',  auth.isAuthenticated(), controller.show);

router.post('/',  auth.isAuthenticated(), controller.create);

router.put('/:id',  auth.isAuthenticated(), controller.update);

router.delete('/:id',  auth.isAuthenticated(), controller.destroy);

module.exports = router;
