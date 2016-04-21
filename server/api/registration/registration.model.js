'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationsSchema = new Schema({
  role: {type: String, required: true},
  _intake: {type: Schema.Types.ObjectId, ref: 'Intake', required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  _awardDisciplines: [{type: Schema.Types.ObjectId, ref: 'AwardDiscipline', required: false}]
});

module.exports = mongoose.model('Registration', RegistrationsSchema);