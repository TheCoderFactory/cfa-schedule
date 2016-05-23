'use strict';

angular.module('cfaDashboard')
	.directive('daySelector', [function () {
		return {
			restrict: 'E',
			templateUrl: 'directives/roll/day-selector/day-selector.html',
			require: '^^rollOverlord',
			scope: {},
			link: function (scope, elem, attrs, rollOverlordCtrl) {

				scope.date = rollOverlordCtrl.date = moment();

				scope.$watch('date', function () {
					rollOverlordCtrl.selectedDate = scope.date;
					rollOverlordCtrl.daySelectRoll();
				});


			}
		};
	}])