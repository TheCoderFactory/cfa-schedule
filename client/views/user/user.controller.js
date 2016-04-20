'use strict';

angular.module('cfaDashboard')
	.controller('UserCtrl', ['$routeParams', '$location', 'Auth', function ($routeParams, $location, Auth) {
		var vm = this;
		console.log($routeParams);
		vm.userId = $routeParams.userId;

		Auth.getUserDetails(vm.userId)
			.then(function (user) {
				vm.user = user.data;
				console.log(vm.user);
			}) 
			.catch(function (err) {
				vm.error = err;
			});

			vm.openIntake = function (intakeId) {
				console.log('/intakes/' + intakeId);
				$location.path('/intakes/' + intakeId);
			};
	}]);