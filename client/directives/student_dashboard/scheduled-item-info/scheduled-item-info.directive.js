'use strict';

angular.module('cfaDashboard')
	.directive('scheduledItemInfo', ['DashboardService', function (DashboardService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/scheduled-item-info/scheduled-item-info.html',
			scope: {
				selectedScheduledItem: '=',
				defaultItem: '='
			},
			link: function (scope, elem, attrs) {
				
				scope.$watch('defaultItem', function () {
					scope.selectedScheduledItem = scope.defaultItem;
				});

			}

		};
	}]);