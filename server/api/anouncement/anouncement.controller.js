'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var Anouncement = require('./anouncement.model');
var errorHandler = require('../../error/error-handling');

function handleError (res, err) {
  console.log(err);
  return res.status(500).send(err);
}

exports.create = function (req,res) {
  console.log(req.body);
  var anouncement = new Anouncement ({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type
  });

  anouncement.save(function (err, anouncement) {
    if (err) { errorHandler.handle(res, err, 404); }
    res.json(anouncement);
  });
};

exports.getAnouncements = function (req, res) {
  Anouncement.find(function (err, anouncements) {
    if (err) { errorHandler.handle(res, err, 404); }
    if (!anouncements) { errorHandler.handle(res, 'no anouncements!', 404); }
    res.json(anouncements);
  });
};

exports.update = function (req, res) {
  Anouncement.findByIdAndUpdate({_id: req.body._id}, 
    {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type 
    },
    function (err, anouncement) {
      if (err) { errorHandler.handle(res, err, 404); }
      res.json(anouncement);
    });
};

exports.delete = function (req, res) {

};
