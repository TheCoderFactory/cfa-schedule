'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');

var auth = require('../auth.service');

var router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log('passport auth');
    var error = err || info;
    if (error) {console.log(error); return res.status(401).json(error); }
    if (!user) {console.log('NO USER'); return res.status(401).json({ msg: 'login failed' });  }
    console.log("From AUTH:" + user);
    res.json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: auth.signToken(user._id)
    });
  })(req, res, next);
});

module.exports = router;
