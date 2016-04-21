'use strict';

angular.module('cfaDashboard')
	.controller('UserCtrl', ['$routeParams', '$location', 'Auth', 'RegistrationService', function ($routeParams, $location, Auth, RegistrationService) {
		var vm = this;
		console.log($routeParams);
		vm.userId = $routeParams.userId;

		Auth.getUserDetails(vm.userId)
			.then(function (user) {
				vm.user = user.data;
				if (vm.user._registrations) {
					console.log(vm.user._registrations);
					return RegistrationService.getPoints(vm.user._registrations[0]._id);
				}
			})
			.then(function (points) {
				console.log(points);
			}) 
			.catch(function (err) {
				vm.error = err;
			});

			vm.openIntake = function (intakeId) {
				console.log('/intakes/' + intakeId);
				$location.path('/intakes/' + intakeId);
			};
	}]);