'use strict';

var AwardDiscipline = require('./award-discipline.model');
var Registration = require('../registration/registration.model');

exports.register = function (socket) {

  AwardDiscipline.schema.post('save', function (AwardDiscipline) {
    Registration
			.findById(AwardDiscipline._registration)
			.populate({path: ' _awardDisciplines', populate: {path: '_award _discipline'}})
			.exec(function (err, registration) {
				console.log(registration.getPoints());
				var registrationPoints = {};
				registrationPoints['newAwardDiscipline'] = AwardDiscipline;
				registrationPoints['newPoints'] = registration.getPoints();
				
				socket.emit('AwardDiscipline:save', registrationPoints);
			});
    
  });

  AwardDiscipline.schema.post('remove', function (AwardDiscipline) {
    socket.emit('AwardDiscipline:remove', AwardDiscipline);
  });

};
