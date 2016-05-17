'use strict';

angular.module('cfaDashboard')
	.controller('UserCtrl', ['$location', 'userDetails', '$q', '$http', 'Auth', function ($location, userDetails, $q, $http, Auth) {
		var vm = this;
		vm.user = userDetails.data;
		vm.editingUser = false;

    vm.editUser = function () {
			Auth.editUser(vm.user)
				.then(function (res) {
					console.log(res);
					vm.editingUser = false;
				})
				.catch(function (err) {
					vm.error = err;
				})
    }

    vm.showEditUser = function () {
			if(vm.editingUser){
				vm.editingUser = false;
			} else {
				vm.editingUser = true;
			}
    }

		vm.openIntake = function (intakeId) {
			console.log('/intakes/' + intakeId);
			$location.path('/intakes/' + intakeId);
		};
	}]);