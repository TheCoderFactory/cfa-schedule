'use strict';

angular.module('cfaDashboard')
	.controller('UserCtrl', ['$location', 'userDetails', '$q', '$http', function ($location, userDetails, $q, $http) {
		var vm = this;
		vm.user = userDetails.data;
		vm.editingUser = false;

    vm.editUser = function () {
			var deferred = $q.defer();
			$http.put('/api/users/' + vm.user._id, vm.user)
				.then(function (res) {
		        deferred.resolve(res);
		      })
		      .catch(function (err) {
		        deferred.reject(err.data);
		      });
		      return deferred.promise;
    }

    vm.showEditUser = function () {
			if(vm.editingUser){
				vm.editingUser = false;
			} else {
				vm.editingUser = true;
			}
    }

		vm.openIntake = function (intakeId) {
			// console.log('/intakes/' + intakeId);
			// $location.path('/intakes/' + intakeId);
		};
	}]);