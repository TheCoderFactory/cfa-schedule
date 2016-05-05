'use strict';

var _ = require('lodash');
var AwardDiscipline = require('./award-discipline.model');
var Registration = require('../registration/registration.model');
var emtr = require('../../events.js');

exports.register = function (socket) {

  emtr.on('AwardDiscipline:changed', function (awardDiscipline, addedAwardDiscipline) {
  	console.log('remove/added ' + addedAwardDiscipline + ': ' + awardDiscipline);
  	Registration
			.findOne({_id: awardDiscipline._registration._id})
			.populate({path: ' _awardDisciplines', populate: {path: '_award _discipline'}})
			.exec(function (err, registration) {
				if(err) {console.log(err);}
				var registrationPointsDetails = {};
        registrationPointsDetails['new'] = addedAwardDiscipline;
        registrationPointsDetails['awardDiscipline'] = awardDiscipline;
				registrationPointsDetails['newPoints'] = registration.getPoints();
				socket.emit('AwardDiscipline:changed', registrationPointsDetails);
			});
  	
  });

};
