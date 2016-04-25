'use strict';

angular.module('cfaDashboard')
	.directive('dailyScheduleTable', ['DashboardService', function (DashboardService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/daily-schedule-table/daily-schedule-table.html',
			scope: {
				date: '='
			},
			link: function (scope, elem, attrs) {

				scope.$watch('date', function () {
					scope.selectedScheduledItems = scope.scheduledItems();
				});

				scope.scheduledItems = function () {
					
					var datesItems = _.filter(DashboardService.settings.scheduledItems, function (scheduledItem) {
						var selectedDate = moment(scope.date);
						var startDate = moment(scheduledItem.start);

						return selectedDate.diff(startDate, 'hours') < 25;
					});
					return datesItems;
				};

			}

		};
	}]);