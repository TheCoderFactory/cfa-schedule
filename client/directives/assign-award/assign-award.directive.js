'use strict';

angular.module('cfaDashboard')
	.directive('assignAward', ['$http', '$q', 'AwardService', 'DisciplineService', 'RegistrationService', 'IntakeService', 'AwardDisciplineService', function ($http, $q, AwardService, DisciplineService, RegistrationService, IntakeService, AwardDisciplineService) {
			return {
				restict: 'E',
				templateUrl: 'directives/assign-award/assign-award.html',
				scope: { 
					intake: '=',
					awardDisciplines: '='

				}, 
				link: function (scope, elem, attrs) {

					// get intakes if intake wasnt given
					if(!scope.intake) {
						IntakeService.getAllIntakes()
							.then(function (intakes) {
								scope.intakes = intakes.data;
							})
							.catch(function (err) {
								scope.error = err;
							});
					}
					
					// Get awards
					AwardService.getAwards()
			      .then(function(awards) {
							scope.awards = awards.data;
			      })
			      .catch(function (err) {
			        scope.error = err;
			      });

			    // Get disciplines
					DisciplineService.getDisciplines()
			      .then(function(disciplines) {
							scope.disciplines = disciplines.data;
			      })
			      .catch(function (err) {
			        scope.error = err;
			      });

			    // get registrations from selected intake
			    scope.getIntakeRegistrations = function (selectedIntake) {
			    	console.log(selectedIntake);
			    	var intake = intake || selectedIntake;
			    	RegistrationService.getIntakeRegistrations(intake._id)
			    		.then(function (registrations) {
			    			scope.registrations = registrations.data;
			    		})	
			    		.catch(function (err) {
			    			scope.error = err;
			    		})
			    }

			    scope.createAwardDiscipline = function(){
			    	
			    	AwardDisciplineService.createAwardDiscipline(scope.awardDisciplineData)
			    		.then(function (awardDiscipline) {
			    			scope.awardDisciplines.push(awardDiscipline.data);
			    			scope.awardDisciplineData = {};
			    		})
			    		.catch(function (err) {
			    			scope.error = err;
			    		});
			    	
			    };
				


				}
			};
		}]);