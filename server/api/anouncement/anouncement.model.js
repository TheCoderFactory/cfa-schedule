'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var AnouncementSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true},
  _intakes: [{type:Schema.Types.ObjectId, ref: 'Intake', required: false}]
});

// add timestamps
AnouncementSchema.plugin(timestamps);

module.exports = mongoose.model('Anouncement', AnouncementSchema);