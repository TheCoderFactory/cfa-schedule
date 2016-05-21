'use strict';

angular.module('cfaDashboard')
	.directive('rollOverlord', [function () {
		return {
			restrict: 'E',
			scope: {},
			controller: ['$rootScope', '$scope', 'RollService', function ($rootScope, $scope, RollService) {

				this.roll = {};
				this.roll.attendance = [];
				this.roll.date = moment();
				this.rolls = [];
				
				this.editRoll = function (roll) {
					this.roll = roll;
					$rootScope.$broadcast('rollEdited');
				};

				this.addRoll = function (roll) {
					this.rolls.push(roll);
				};

			}]
		}

	}])