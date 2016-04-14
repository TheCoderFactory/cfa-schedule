'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationsSchema = new Schema({
  role: {type: String, required: true},
  _intake: {type: Schema.Types.ObjectId, ref: 'Intake', required: true},
});

module.exports = mongoose.model('Registration', RegistrationsSchema);