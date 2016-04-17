'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var ScheduledItem = require('./scheduled_item.model');
var errorHandler = require('../../error/error-handling');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.create = function (req, res) {

  var scheduledItem = new ScheduledItem ({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    start:req.body.start,
    end: req.body.end,
    type: req.body.type,
    _intakes: req.body._intakes,
    _hostId: req.body.hostId
  });

  scheduledItem.save(function (err, scheduledItem) {
    if (err) { errorHandler.handle(res, err, 404); }
    ScheduledItem
      .findById(scheduledItem._id)
      .populate('_intakes')
      .exec(function (err, scheduledItem) {
        if (err) { errorHandler.handle(res, err, 404); }
        res.json(scheduledItem);
      });
  });
};

// Get all scheduled items for an intake
exports.getIntakeItems = function (req, res) {
  ScheduledItem.find({_intakes: req.params.intakeId}, function (err, scheduledItems) {
    if (err) { return handleError(res, err); }
    res.status(200).json(scheduledItems);
  });
};

// Get all scheduled items
exports.getAllItems = function (req, res) {
  ScheduledItem
    .find()
    .populate('_intakes')
    .exec(function (err, scheduledItems) {
      if (err) { return handleError(res, err); }
      res.status(200).json(scheduledItems);
    });
};

exports.getItem = function (req, res) {
  Scheduled_item.create(req.body, function (err, scheduled_item) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      scheduled_item: _.omit(scheduled_item.toObject(), ['passwordHash', 'salt'])
    });
  });
};
