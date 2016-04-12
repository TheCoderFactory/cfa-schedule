'use strict';

angular.module('cfaDashboard')
	.directive('registerUser', [function () {
		return {
			restict: 'E',
			templateUrl: 'directives/register-user/register-user.html',
			scope: {
				intakeId: '@',
				users: '='
			},
			
			link: function (scope, elem, attrs) {
				if (attrs.intakeId) {
					scope.showIntakesList = false;
				} else {
					scope.showIntakesList = true;
				}

				// Get all users not registered in intake, if intakeId attr, else return all users

				scope.registerUser = function () {

				}
			}
		};
	}]);