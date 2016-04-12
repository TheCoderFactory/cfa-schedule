'use strict';

angular.module('cfaDashboard')
	.directive('registerUser', ['RegistrationService', function (RegistrationService) {
		return {
			restict: 'E',
			templateUrl: 'directives/register-user/register-user.html',
			scope: {
				intakeId: '@',
				users: '=',
				formRegisterUser: '='
			},
			
			link: function (scope, elem, attrs) {
				if (attrs.intakeId) {
					scope.showIntakesList = false;
				} else {
					scope.showIntakesList = true;
				}

				// Get all users not registered in intake, if intakeId attr, else return all users

				scope.registerUser = function () {
					scope.formRegisterUser.intakeId = attrs.intakeId;
					console.log(scope.formRegisterUser);
					
					RegistrationService.registerUser(scope.formRegisterUser)
						.then(function (user) {
							console.log(user);
						})
						.catch(function (err) {
							vm.error = err;
						})
				}
			}
		};
	}]);