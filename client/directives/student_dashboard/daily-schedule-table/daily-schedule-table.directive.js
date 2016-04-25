'use strict';

angular.module('cfaDashboard')
	.directive('dailyScheduleTable', ['DashboardService', function (DashboardService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/daily-schedule-table/daily-schedule-table.html',
			scope: {
				date: '=', 
				selectedScheduledItem: '=',
				selectedScheduledItems: '='
			},
			link: function (scope, elem, attrs) {
				
				scope.$watch('date', function () {
					scope.selectedScheduledItems = scope.scheduledItems();
				});

				scope.scheduledItems = function () {
					
					// select items that are on selected day
					var dateItems = _.filter(DashboardService.settings.scheduledItems, function (scheduledItem) {
						var selectedDate = moment(scope.date);
						var startDate = moment(scheduledItem.start);

						return selectedDate.diff(startDate, 'hours') < 25;
					});

					// sort items by start date
					var sortedDateItems = _.sortBy(dateItems, 'start');
					return sortedDateItems;
				};

				scope.selectScheduledItem = function (scheduledItem) {
					
					console.log(scheduledItem);
					scope.selectedScheduledItem = scheduledItem;
				};

			}

		};
	}]);