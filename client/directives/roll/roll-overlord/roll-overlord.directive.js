'use strict';

angular.module('cfaDashboard')
	.directive('rollOverlord', [function () {
		return {
			restrict: 'E',
			scope: {},
			controller: ['$scope', 'RollService', function ($scope, RollService) {

				this.roll = {};
				this.roll.attendance = [];
				this.roll.date = moment();
				$scope.rolls = [];
				$scope.roll = this.roll;
				
				
			}]
		}

	}])