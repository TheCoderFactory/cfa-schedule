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

				this.editRollClicked = function (roll) {
					this.roll = roll;
					$rootScope.$broadcast('rollEditClicked');
					console.log('edit clicked');
				};

				this.updateRoll = function (editedRoll) {
					this.rolls = _.map(this.rolls, function (roll) {
						if(editedRoll._id === roll._id) {
							return editedRoll;
						} else {
							return roll;
						}
					});
					this.daySelectRoll();	
				};

				this.addRoll = function (roll) {
					this.rolls.push(roll);
				};

				this.daySelectRoll = function () {
					var selectedDate = moment(this.selectedDate);
					
					this.selectedRolls = _.filter(this.rolls, function (roll) {

						return moment(roll.date).isSame(selectedDate, 'day');
					});

					$rootScope.$broadcast('rollDateSelected');
					console.log(this.selectedRolls);
				};

			}]
		}

	}])