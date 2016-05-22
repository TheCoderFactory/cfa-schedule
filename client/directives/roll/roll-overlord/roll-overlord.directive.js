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

				this.daySelectRoll = function (date) {
					var selectedDate = moment(date);
					
					this.rolls = _.filter(this.rolls, function (roll) {
						console.log(moment(roll.date));
						console.log(selectedDate);
						console.log(moment(roll.date).isSame(selectedDate, 'day'));
						
						return moment(roll.date).isSame(selectedDate, 'day');
					});
					console.log(this.rolls);
				};

			}]
		}

	}])