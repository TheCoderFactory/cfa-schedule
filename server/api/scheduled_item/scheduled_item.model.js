'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduledItemSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  type: {type: String, required: true},
  location: {type: String, required: true},
  _host_id: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
  _intake_id: [{type: mongoose.Schema.Types.ObjectId, ref:'Intake'}]
});