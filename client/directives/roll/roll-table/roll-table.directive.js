'use strict';

angular.module('cfaDashboard')
	.directive('rollTable', ['$rootScope', '$location', 'RollService', function ($rootScope, $location, RollService) {
		return {
			retrict: 'E',
			templateUrl: '/directives/roll/roll-table/roll-table.html',
			require: '^^rollOverlord',
			scope: {},
			link: function (scope, elem, attrs, rollOverlordCtrl) {

				scope.rolls = rollOverlordCtrl.rolls;

				scope.$watch('rolls', function () {
					rollOverlordCtrl.rolls = scope.rolls;
				});

				$rootScope.$on('rollDateSelected', function () {
					console.log('roll Date Selected');
					scope.selectedRolls = rollOverlordCtrl.selectedRolls;
				});

				function init () {
					// Get all rolls
					RollService.getRolls()
						.then(function (rolls) {
							scope.rolls = rolls.data;
							updateList();
						})
						.catch(function (err) {
							console.log(err);
						});
				};

				function updateList () {
					rollOverlordCtrl.rolls = scope.rolls;
					rollOverlordCtrl.daySelectRoll();
				};

				scope.deleteRoll = function (roll) {
					RollService.deleteRoll(roll._id)
						.then(function (res) {
							scope.rolls = _.without(scope.rolls, roll);
							updateList();
						})
						.catch(function (err) {
							console.log(err);
						});
				};

				scope.updateRoll = function (roll) {
					var editRoll = {};
					angular.extend(editRoll, roll);
					rollOverlordCtrl.editRollClicked(editRoll);
				}

				scope.openIntake = function (intakeId) {
					$location.path('/intakes/' + intakeId);
				};

				// initialise!
				init()
			}
		};
	}])