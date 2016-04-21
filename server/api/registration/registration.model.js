'use strict';

var util = require('util');

var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationsSchema = new Schema({
  role: {type: String, required: true},
  _intake: {type: Schema.Types.ObjectId, ref: 'Intake', required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  _awardDisciplines: [{type: Schema.Types.ObjectId, ref: 'AwardDiscipline', required: false}]
});

RegistrationsSchema.methods.getPoints = function () {
	var awardDisciplines = this._awardDisciplines.toObject();
	var groupedAwardDisciplines = _.groupBy(awardDisciplines, 
		function (awardDiscipline) {
			return awardDiscipline._discipline._id
		});
	var disciplinePoints = _.map(groupedAwardDisciplines, function (arrayOfAwards, disciplineId) {
		var points = 0;
		// initially get all discipline details -> will all be the same
		var disciplinePoint = arrayOfAwards[0]._discipline.toObject();
		// total up points
		_.forEach(arrayOfAwards, function (awardDiscipline) {
					console.log(awardDiscipline._award);
			points += parseInt(awardDiscipline._award.value);
		});
		// set discipline points
		disciplinePoint.points = points;
		return disciplinePoint;
	});
	return disciplinePoints;
};

module.exports = mongoose.model('Registration', RegistrationsSchema);