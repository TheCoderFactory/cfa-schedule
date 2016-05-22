'use strict';

angular.module('cfaDashboard')
	.controller('RollCtrl', [function () {
		var vm = this;

		vm.toggleTakeRoll = function () {
			if(vm.takeRoll) {
				vm.takeRoll = false;
			} else {
				vm.takeRoll = true;
			}
		};
	}]);