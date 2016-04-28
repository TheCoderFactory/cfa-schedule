'use strict';

var _ = require('lodash');
var AwardDiscipline = require('./award-discipline.model');
var Registration = require('../registration/registration.model');
var emtr = require('../../events.js');

exports.register = function (socket) {

  AwardDiscipline.schema.post('remove', function (AwardDiscipline) {
    socket.emit('AwardDiscipline:remove', AwardDiscipline);
  });

  emtr.on('AwardDiscipline:created', function (awardDiscipline) {
  	
  	Registration
			.findOne({_id: awardDiscipline._registration._id})
			.populate({path: ' _awardDisciplines', populate: {path: '_award _discipline'}})
			.exec(function (err, registration) {
				if(err) {console.log(err);}
				console.log('This is the registration on event: ' + registration)
				var registrationPointsDetails = {};
		  	registrationPointsDetails['newAwardDiscipline'] = awardDiscipline;
				registrationPointsDetails['newPoints'] = registration.getPoints();
				socket.emit('AwardDiscipline:save', registrationPointsDetails);
			});
  	
  });

};
