'use strict';

angular.module('cfaDashboard')
	.directive('registerUser', ['RegistrationService', 'Auth', function (RegistrationService, Auth) {
		return {
			restict: 'E',
			templateUrl: 'directives/register-user/register-user.html',
			scope: {
				intakeId: '@',
				unregisteredUsers: '=',
				formRegisterUser: '=',
				registeredStudents: '=',
				registeredTeachers: '='

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
							console.log(user.data);
							//Add intake to user data
							user.data.intakeId = scope.intakeId;
							//sort by role
							if (user.data.role === 'Teacher') {
								scope.registeredTeachers.push(user.data);
							} else {
								scope.registeredStudents.push(user.data);
							}
						})
						.catch(function (err) {
							scope.error = err;
						});
						
				}
			}
		};
	}]);