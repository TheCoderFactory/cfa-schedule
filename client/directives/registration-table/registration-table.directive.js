'use strict';

angular.module('cfaDashboard')
	.directive('registrationTable', [function () {
		return {
			restrict: 'E',
			templateUrl: 'directives/registration-table/registration-table.html',
			scope: {
				users: '='
			}
		};
	}]);