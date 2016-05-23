'use strict';

angular.module('cfaDashboard')
	.controller('RollCtrl', ['$scope', function ($scope) {
		var vm = this;

		$scope.$on('rollEditClicked', function () {
			vm.showForm = true;
		});

		vm.toggleTakeRoll = function () {
			if(vm.showForm) {
				vm.showForm = false;
			} else {
				vm.showForm = true;
			}
		};
	}]);