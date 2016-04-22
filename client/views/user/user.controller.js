'use strict';

angular.module('cfaDashboard')
	.controller('UserCtrl', ['$location', 'userDetails', function ($location, userDetails) {
		var vm = this;
		vm.user = userDetails.data;

		vm.openIntake = function (intakeId) {
			console.log('/intakes/' + intakeId);
			$location.path('/intakes/' + intakeId);
		};
	}]);