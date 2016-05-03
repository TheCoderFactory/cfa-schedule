'use strict';

angular.module('cfaDashboard')
	.directive('registrationTable', ['$uibModal', 'RegistrationService', function ($uibModal, RegistrationService) {
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
					
					scope.removeRegistration = registration;

					var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: '../../modals/small_alert.html',
			      controller: 'smallAlertCtrl',
			      size: 'sm',
			      resolve: {
			        message: function () {
			          return scope.unregisterAlertMessage;
			        }
			      }
			    });

					// if result resolved unregister user
			    modalInstance.result.then(function (selectedItem) {
			      scope.unregisterUser(scope.removeRegistration);
			    })
			    .catch(function () {
			    	console.log('unregister canceled');
			    });
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