'use strict';

var _ = require('lodash');

var authService = require('../../auth/auth.service');
var ScheduledItem = require('./scheduled_item.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

// Create a scheduled item, if there isnt one there, else edit
exports.create = function (req, res) {

  // Check if scheduled item already exists --> either way send back the object
  if (req.body._id) {
    // if there is a id then this an update
    ScheduledItem.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      description: req.body.colour,
      location: req.body.location,
      start:req.body.start,
      end: req.body.end,
      type: req.body.type,
      _intakeId: req.body.intakeId,
      _hostId: req.body.host_id

    }, function (err, scheduledItem) {
      if (err) 
        errorHandler.handle(res, err, 404);
      else {
        res.json(scheduledItem);
      }
    });
  } else {
    var scheduledItem = new ScheduledItem ({
      name: req.body.name,
      description: req.body.colour,
      location: req.body.location,
      start:req.body.start,
      end: req.body.end,
      type: req.body.type,
      _intakeId: req.body.intakeId,
      _hostId: req.body.host_id

    });
    // if there is not an id save it
    scheduledItem.save(function (err, scheduledItem) {
      if (err) 
        errorHandler.handle(res, err, 404);
      else {
        scheduledItem.edited = false;
        res.json(scheduledItem);
      }
    });
  }

};

/**
 * Gets a Scheduled_item from the DB.
 *
 * @param req
 * @param res
 */
exports.getItem = function (req, res) {
  Scheduled_item.create(req.body, function (err, scheduled_item) {
    if (err) { return handleError(res, err); }
    res.status(201).json({
      scheduled_item: _.omit(scheduled_item.toObject(), ['passwordHash', 'salt'])
    });
  });
};
