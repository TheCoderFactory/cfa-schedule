'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntakeSchema = new Schema({
  name: {type: String, required: true},
  colour: {type: String, required: true},
  terms: [{name: String, start: Date, end: Date}]
});



module.exports = mongoose.model('Intake', IntakeSchema);