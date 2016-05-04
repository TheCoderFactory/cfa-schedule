'use strict';

angular.module('cfaDashboard')
	.directive('registrationTable', ['ModalService', 'RegistrationService', function (ModalService, RegistrationService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/registration-table/registration-table.html',
			scope: {
				registrations: '=',
				unregisteredUsers: '='
			},

			link: function (scope, elem, attrs) {

				scope.unregisterAlertMessage = 'Are you sure you want unregister this user?';

				scope.unregisterAlert = function (registration) {
					ModalService.alert(scope.unregisterAlertMessage)
						.then(function () {
							scope.unregisterUser(registration);
						})
				};


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