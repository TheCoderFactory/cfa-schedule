'use strict';

angular.module('cfaDashboard')
	.directive('rollOverlord', [function () {
		return {
			restrict: 'E',
			scope: {},
			controller: ['$scope', 'RollService', function ($scope, RollService) {

				// $scope.rolls = [];
				console.log('overlord init');

				
			}]
		}

	}])