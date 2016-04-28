'use strict';

angular.module('cfaDashboard')
	.directive('registrationAwardDetails', ['DashboardService', function (DashboardService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/registration-award-details/registration-award-details.html',
			scope: {
				awardDetails: '='
			},
			link: function (scope, elem, attrs) {
				scope.settings = DashboardService.settings;

			}
		}
}]);