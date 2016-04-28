'use strict';

angular.module('cfaDashboard')
	.directive('studentTable', ['DashboardService', 'RegistrationService', function (DashboardService, RegistrationService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/student-table/student-table.html',
			scope: {},
			link: function (scope, elem, attrs) {
				scope.settings = DashboardService.settings;

				scope.$watch('scope.settings', function () {
					scope.students = _.filter(scope.settings.registrations, function (registration) {
						return registration.role === "Student";
					});
				});
				
			}
		};
	}]);