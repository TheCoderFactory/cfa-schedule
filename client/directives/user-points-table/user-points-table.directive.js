'use strict';

angular.module('cfaDashboard')
	.directive('userPointsTable', ['$location', 'RegistrationService', function ($location, RegistrationService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/user-points-table/user-points-table.html',
			scope: {
				registration: '='
			}, 
			
			link: function (scope, elem, attrs) {
			scope.disciplineAwards = {};
			scope.showAwardsFor = [];

			RegistrationService.getPoints(scope.registration._id)
				.then(function (registrationPoints) {
					console.log(registrationPoints.data);
					scope.disciplines = registrationPoints.data.disciplines;
					scope.totalPoints = registrationPoints.data.totalPoints;
				})
				.catch(function (err) {
					scope.error = err;
				});

				scope.getDisciplineAwards = function (registrationId, disciplineId) {
					if(!scope.disciplineAwards[disciplineId]) {
						RegistrationService.getDisciplineAwards(registrationId, disciplineId)
							.then(function (disciplineAwards) {
								scope.disciplineAwards[disciplineId] = disciplineAwards.data;
							})
							.catch(function (err) {
								scope.error = err;
							});
					} 
				}

				scope.showHideAwards = function (registrationId, disciplineId) {
					if (scope.showAwardsFor.indexOf(disciplineId) === -1) {
						scope.getDisciplineAwards(registrationId, disciplineId)
						scope.showAwardsFor.push(disciplineId);
					} else {
						scope.showAwardsFor = _.without(scope.showAwardsFor, disciplineId);
					}
				};
				
			}
		};
}]);