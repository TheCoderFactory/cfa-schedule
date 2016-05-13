'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  _intake: {type: Schema.Types.ObjectId, ref: 'Intake', required: false},
  _registrations: [{type: Schema.Types.ObjectId, ref: 'Registration', required: false}],
});

module.exports = mongoose.model('Project', ProjectSchema);
