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
    host: req.body.host
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

exports.update = function (req, res) {
  ScheduledItem.findByIdAndUpdate(req.body._id, 
    {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      start:req.body.start,
      end: req.body.end,
      type: req.body.type,
      _intakes: req.body._intakes,
      _hostId: req.body.hostId
    },
    function (err, scheduledItem) {
      if (err) { errorHandler.handle(res, err, 404); }
      console.log(scheduledItem);
      res.json(scheduledItem);
    });
}

// Get all scheduled items for an intake
exports.getIntakeItems = function (req, res) {
  ScheduledItem
    .find({_intakes: req.params.intakeId})
    .populate('_intakes')
    .exec(function (err, scheduledItems) {
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

exports.delete = function (req, res) {
  ScheduledItem.remove({_id: req.params.scheduledItemId}, function (err) {
    if (err) { errorHandler.handle(res, err, 404); }
    res.send('Scheduled Item deleted!');
  });
};

