'use strict';

angular.module('cfaDashboard')
	.directive('assignAward', ['$http', '$q', 'Auth', 'AwardService', 'DisciplineService', 'RegistrationService', 'IntakeService', 'AwardDisciplineService', function ($http, $q, Auth, AwardService, DisciplineService, RegistrationService, IntakeService, AwardDisciplineService) {
			return {
				restict: 'E',
				templateUrl: 'directives/assign-award/assign-award.html',
				scope: { 
					intake: '=',
					awardDisciplines: '='

				}, 
				link: function (scope, elem, attrs) {

					scope.awardDisciplineData = {};


					// get registrations from selected intake
			    scope.getIntakeRegistrations = function (selectedIntake) {
			    	console.log(selectedIntake);
			    	var intake = scope.intake || selectedIntake;
			    	RegistrationService.getIntakeRegistrations(intake._id)
			    		.then(function (registrations) {
			    			scope.registrations = _.filter(registrations.data, function (registration) {
			    				return registration.role === 'Student';
			    			});
			    			// additionally remove reg of student logged on
			    			if(!Auth.getUser().admin) {
			    				scope.registrations = _.filter(registrations.data, function (registration) {
				    				return registration._user._id !== Auth.getUser()._id;
				    			});
			    			}
			    		})	
			    		.catch(function (err) {
			    			scope.error = err;
			    		})
			    }

					// get intakes if intake wasnt given
					if(!scope.intake) {
						IntakeService.getAllIntakes()
							.then(function (intakes) {
								scope.intakes = intakes.data;
							})
							.catch(function (err) {
								scope.error = err;
							});
					} else {
						// intake given then just get registrations
						scope.getIntakeRegistrations();
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



			    scope.createAwardDiscipline = function(){
			    	
			    	AwardDisciplineService.createAwardDiscipline(scope.awardDisciplineData)
			    		.then(function (awardDiscipline) {
			    			console.log(awardDiscipline.data);
			    			if(!scope.intake) {
			    				scope.awardDisciplines.push(awardDiscipline.data);
			    			}
			    			scope.awardDisciplineData = {};
			    		})
			    		.catch(function (err) {
			    			scope.error = err;
			    		});
			    	
			    };
				


				}
			};
		}]);