'use strict';

angular.module('cfaDashboard')
	.directive('studentTable', [function () {
		return {
			restrict: 'E',
			templateUrl: 'directives/student-table/student-table.html',
			scope: {
				students: '='
			}
		};
	}]);