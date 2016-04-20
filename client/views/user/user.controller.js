'use strict';

angular.module('cfaDashboard')
	.controller('UserCtrl', ['$routeParams', '$location', 'Auth', 'AwardDisciplineService', function ($routeParams, $location, Auth, AwardDisciplineService) {
		var vm = this;
		console.log($routeParams);
		vm.userId = $routeParams.userId;

		Auth.getUserDetails(vm.userId)
			.then(function (user) {
				vm.user = user.data;
				console.log(vm.user);
				return AwardDisciplineService.getUserAwardDisciplines(user.data._id);
			})
			.then(function (awardDisciplines) {
				vm.awardDisciplines = awardDisciplines.data;
				console.log(awardDisciplines.data);
			})
			.catch(function (err) {
				vm.error = err;
			});

			vm.openIntake = function (intakeId) {
				console.log('/intakes/' + intakeId);
				$location.path('/intakes/' + intakeId);
			};
	}]);