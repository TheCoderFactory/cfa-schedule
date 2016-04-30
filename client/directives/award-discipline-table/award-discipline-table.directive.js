'use strict';

angular.module('cfaDashboard')
	.directive('awardDisciplineTable', ['$http', '$q', '$location', 'AwardDisciplineService', 'IntakeService', function ($http, $q, $location, AwardDisciplineService, IntakeService) {
			return {
				restict: 'E',
				templateUrl: 'directives/award-discipline-table/award-discipline-table.html',
				scope: { 
					awardDisciplines: '='
				}, 
				link: function (scope, elem, attrs) {
					
					scope.filteredIntakes = [];

					scope.$watch('awardDisciplines', function () {
						console.log('awardDisciplines changed');
						scope.updateSelector();
					}, true);

					scope.updateSelector = function () {
						scope.intakesSelection = _.filter(scope.intakes, function (intake) {
	    				// check if intake is in any of the registraions of disciplines
	    				return _.some(scope.awardDisciplines, function (awardDiscipline) {
	    					return awardDiscipline._registration._intake._id === intake._id;
	    				});
	    			});
	    			 scope.filteredIntakes = scope.intakesSelection;
					};

					scope.deleteAwardDiscipline = function (awardDisciplineId) {
			      AwardDisciplineService.deleteAwardDiscipline(awardDisciplineId);
			      scope.awardDisciplines = _.filter(scope.awardDisciplines, function (awardDiscipline) {
			      	return awardDisciplineId !== awardDiscipline._id;
			      });
			    }

			    scope.openIntake = function (intakeId) {
			    	$location.path('/intakes/' + intakeId);
			    };

			    scope.getAwardDisciplines = function () {
			      AwardDisciplineService.getAwardDisciplines()
			        .then(function (awardDisciplines) {
			          scope.awardDisciplines = awardDisciplines.data;
			          console.log(awardDisciplines.data);
			        })
			        .catch(function (err) {
			          scope.error = err;
			        });
			    }();

			    scope.getIntakes = function () {
			    	IntakeService.getAllIntakes()
			    		.then(function (intakes) {
			    			scope.intakes = intakes.data;
			    			scope.updateSelector();
			    		})
			    		.catch(function (err) {
			          scope.error = err;
			        });
			    }();

			    scope.addRemoveIntake = function (intakeClicked) {
						if (scope.intakeIncluded(intakeClicked)) {
							scope.filteredIntakes = _.filter(scope.filteredIntakes, function (intake) {
								return intakeClicked._id !== intake._id;
							});
						} else {
							scope.filteredIntakes.push(intakeClicked);
						}
					};

					scope.intakeIncluded = function (intakeTest) {
						return _.some(scope.filteredIntakes, function (intake) {
							return intakeTest._id === intake._id;
						});
					};

				}				
			};
		}]);