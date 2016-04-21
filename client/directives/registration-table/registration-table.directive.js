'use strict';

angular.module('cfaDashboard')
	.directive('registrationTable', ['RegistrationService', function (RegistrationService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/registration-table/registration-table.html',
			scope: {
				registrations: '=',
				unregisteredUsers: '='
			},

			link: function (scope, elem, attrs) {

				scope.unregisterUser = function (registration) {
					console.log(registration);
					RegistrationService.unregisterUser(registration)
						.then(function (res) {
							var registrationId = res.data;
							// remove from registrations
							scope.registrations = _.filter(scope.registrations, function (reg) {
								return reg._id !== registrationId;
							});
							// update
							scope.unregisteredUsers.push(registration._user);
							console.log(res);
						})
						.catch(function (err) {
							scope.error = err;
						});
				}
			}
		};
	}]);