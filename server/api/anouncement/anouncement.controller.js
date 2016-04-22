'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Anouncement = require('./anouncement.model');
var errorHandler = require('../../error/error-handling');
var util = require('util');



function handleError (res, err) {
  console.log(err);
  return res.status(500).send(err);
}

exports.create = function (req,res) {
  
  var anouncement = new Anouncement ({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    _intakes: req.body._intakes
  });

  anouncement.save(function (err, anouncement) {
    if (err) { errorHandler.handle(res, err, 404); }
    Anouncement
      .findById(anouncement._id)
      .populate('_intakes')
      .exec(function (err, anouncement) {
        if (err) { errorHandler.handle(res, err, 404); }
        res.json(anouncement);
      });
  });
};

exports.getAnouncements = function (req, res) {
  Anouncement
    .find()
    .populate('_intakes')
    .exec(function (err, anouncements) {
      console.log(anouncements);
      if (err) { errorHandler.handle(res, err, 404); }
      if (!anouncements) { errorHandler.handle(res, 'no anouncements!', 404); }
      res.json(anouncements);
    });
};

exports.update = function (req, res) {
  Anouncement.findByIdAndUpdate(req.body._id, 
    {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      _intakes: req.body._intakes
    },
    function (err, anouncement) {
      if (err) { errorHandler.handle(res, err, 404); }
      console.log(anouncement);
      res.json(anouncement);
    });
};

exports.delete = function (req, res) {
  Anouncement.remove({_id: req.params.anouncementId}, function (err) {
    if (err) { errorHandler.handle(res, err, 404); }
    res.send('Anouncement deleted!');
  });
};
