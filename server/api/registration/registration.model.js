'use strict';

var util = require('util');

var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationsSchema = new Schema({
  role: {type: String, required: true, enum: ['Student', 'Teacher', 'TA']},
  _intake: {type: Schema.Types.ObjectId, ref: 'Intake', required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  _awardDisciplines: [{type: Schema.Types.ObjectId, ref: 'AwardDiscipline', required: false}]
});

RegistrationsSchema.methods.getPoints = function () {
	var totalPoints = 0;
	var awardDisciplines = this._awardDisciplines.toObject();
	var groupedAwardDisciplines = _.groupBy(awardDisciplines, 
		function (awardDiscipline) {
			return awardDiscipline._discipline._id
		});
	
	var disciplinePoints = {};

	_.forEach(groupedAwardDisciplines, function (arrayOfAwards, disciplineId) {
		var points = 0;
		// initially get all discipline details -> will all be the same
		var disciplinePoint = arrayOfAwards[0]._discipline.toObject();
		// total up points
		_.forEach(arrayOfAwards, function (awardDiscipline) {
			points += parseInt(awardDiscipline._award.value);
		});
		// set discipline points
		disciplinePoint.points = points;
		// add to total points
		totalPoints += points;
		disciplinePoints[disciplinePoint._id] = disciplinePoint;
	});

	disciplinePoints.totalPoints = totalPoints;	
	return disciplinePoints;
};

RegistrationsSchema.methods.getDisciplineAwards = function (disciplineId) {
	var awardDisciplines = this._awardDisciplines.toObject();
	var disciplineAwards = _.filter(awardDisciplines, function (awardDiscipline) {
		console.log(awardDiscipline._discipline._id + '|' + disciplineId);
		return awardDiscipline._discipline._id == disciplineId;
	});
	console.log(disciplineAwards);
	return disciplineAwards;
};

RegistrationsSchema.methods.getAllAwards = function () {
	var awardDisciplines = this._awardDisciplines.toObject();
	var disciplineAwards = _.groupBy(awardDisciplines, function (awardDiscipline) {
		return awardDiscipline._discipline._id;
	});
	console.log(disciplineAwards);
	return disciplineAwards;
};

module.exports = mongoose.model('Registration', RegistrationsSchema);