'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RollSchema = new Schema({
  _intake: {type: Schema.Types.ObjectId, ref: 'Intake', required: true},
  attendance: [
  	{
  		_registration: {type: Schema.Types.ObjectId, ref: 'Registration'},
  		attended: Boolean
  	} 	
  ],
  date: Date
});

module.exports = mongoose.model('Roll', RollSchema);
