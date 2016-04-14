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
						.then(function (registration) {
							console.log(registration.data);
							//sort by role and add to controller
							if (registration.data.role === 'Teacher') {
								scope.registeredTeachers.push(registration.data._user);
							} else {
								scope.registeredStudents.push(registration.data._user);
							}
							// purge form
							scope.formRegisterUser = {};
							//remove user from dropdown
							console.log(scope.unregisteredUsers);
							scope.unregisteredUsers = _.filter(scope.unregisteredUsers, function (user) {
								return user._id !== registration.data._user._id;
							});
							console.log(scope.unregisteredUsers);

						})
						.catch(function (err) {
							scope.error = err;
						});
						
				}
			}
		};
	}]);