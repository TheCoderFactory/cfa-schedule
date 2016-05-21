'use strict';

var _ = require('lodash');
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
  date: Date,
  attendancePercent: Number
});

RollSchema.statics.attendancePercent = function (attendance) {
		console.log(attendance);
		var attendedCount = _.filter(attendance, function (singleAttend) {
			return singleAttend.attended;
		}).length;

		console.log(attendance);

		var total = attendance.length;

		return (attendedCount/total) * 100;
	}

module.exports = mongoose.model('Roll', RollSchema);
