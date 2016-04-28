'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./award-discipline.controller');
var auth = require('../../auth/auth.service');


router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/registration/:registrationId', controller.registrationAwardDisciplines);
router.post('/', controller.create);
router.put('/:id', auth.adminOnly, controller.update);
router.delete('/:id', auth.adminOnly, controller.destroy);


module.exports = router;
