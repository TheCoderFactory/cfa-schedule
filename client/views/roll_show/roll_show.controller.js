'use strict';

angular.module('cfaDashboard')
	.controller('RollShowCtrl', ['roll', function (roll) {
		var vm = this;

		vm.roll = roll.data;

		console.log(vm.roll)

	}]);