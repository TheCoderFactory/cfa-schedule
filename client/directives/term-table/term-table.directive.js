'use strict';

angular.module('cfaDashboard')
	.directive('termTable', [function () {
		return {
			restrict: 'E',
			templateUrl: 'directives/term-table/term-table.html',
			scope: {
				terms: '='
			}
		};
	}]);