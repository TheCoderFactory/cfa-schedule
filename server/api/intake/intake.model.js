'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntakeSchema = new Schema({
  name: {type: String, required: true},
  colour: {type: String, required: true},
  terms: [{name: String, start: Date, end: Date}]
});

// this method will compile all intake information into a json
IntakeSchema.methods.dashboardDetails = function () {

};

module.exports = mongoose.model('Intake', IntakeSchema);