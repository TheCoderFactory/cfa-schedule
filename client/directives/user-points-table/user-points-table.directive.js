'use strict';

angular.module('cfaDashboard')
	.directive('userPointsTable', ['$location', 'AwardDisciplineService', function ($location, AwardDisciplineService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/user-points-table/user-points-table.html',
			scope: {
				registrationId: '@'
			}, 
			
			link: function (scope, elem, attrs) {

			// group disciplines
			AwardDisciplineService.getRegistrationAwardDisciplines(attrs.registrationId)
				.then(function (awardDisciplines) {
					scope.disciplineSummaries = AwardDisciplineService.summeriseDisciplines(awardDisciplines.data);
				})
				.catch(function (err) {
					scope.error = err;
				});
			}
		};
}]);