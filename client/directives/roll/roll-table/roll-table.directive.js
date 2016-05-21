'use strict';

angular.module('cfaDashboard')
	.directive('rollTable', ['$location', 'RollService', function ($location, RollService) {
		return {
			retrict: 'E',
			templateUrl: '/directives/roll/roll-table/roll-table.html',
			require: '^^rollOverlord',
			scope: {},
			link: function (scope, elem, attrs, rollOverlordCtrl) {

				scope.rolls = rollOverlordCtrl.rolls;

				function init () {
					// Get all rolls
					RollService.getRolls()
						.then(function (rolls) {
							scope.rolls = rolls.data;
							rollOverlordCtrl.rolls = scope.rolls;
						})
						.catch(function (err) {
							console.log(err);
						});
				}

				scope.deleteRoll = function (roll) {
					RollService.deleteRoll(roll._id)
						.then(function (res) {
							scope.rolls = _.without(scope.rolls, roll);
						})
						.catch(function (err) {
							console.log(err);
						});
				};

				scope.updateRoll = function (roll) {
					var preEdit = {};
					angular.extend(preEdit, roll);
					rollOverlordCtrl.roll = roll;
					console.log(rollOverlordCtrl.roll);
				}

				scope.openIntake = function (intakeId) {
					$location.path('/intakes/' + intakeId);
				};

				// initialise!
				init()
			}
		};
	}])