'use strict';

angular.module('cfaDashboard')
	.directive('usersTable', ['$location', function ($location) {
		return {
			restrict: 'E',
			templateUrl: 'directives/users-table/users-table.html',
			scope: {
				users: '='
			},

			link: function (scope, elem, attrs) {

				scope.openIntake = function (intakeId) {
					console.log('/intakes/' + intakeId);
					$location.path('/intakes/' + intakeId);
				}
			}

			
		};
	}]);