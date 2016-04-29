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

					scope.deleteAwardDiscipline = function (awardDisciplineId) {
			      AwardDisciplineService.deleteAwardDiscipline(awardDisciplineId);
			      scope.awardDisciplines = _.filter(scope.awardDisciplines, function (awardDiscipline) {
			      	return awardDisciplineId !== awardDiscipline._id;
			      });
			    }

			    scope.openIntake = function (intakeId) {
			    	$location.path('/intakes/' + intakeId);
			    };

			    scope.getIntakes = function () {
			    	IntakeService.getAllIntakes()
			    		.then(function (intakes) {
			    			scope.intakes = intakes.data;
			    			scope.filteredIntakes = scope.intakes;
			    		})
			    		.catch(function (err) {
			          scope.error = err;
			        });
			    }();

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