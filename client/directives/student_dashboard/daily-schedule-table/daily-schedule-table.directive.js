'use strict';

angular.module('cfaDashboard')
.directive('dailyScheduleTable', ['$rootScope', 'DashboardService', function ($rootScope, DashboardService) {
  return {
    restrict: 'E',
    templateUrl: 'directives/student_dashboard/daily-schedule-table/daily-schedule-table.html',
    scope: {
      date: '=', 
      selectedScheduledItem: '=',
      selectedScheduledItems: '='
    },
    link: function (scope, elem, attrs) {

      $rootScope.$on('ScheduledItemChanged', function () {
        scope.selectedScheduledItems = scope.scheduledItems();
      })

      scope.$watch('date', function () {
        scope.selectedScheduledItems = scope.scheduledItems();
      });

      scope.scheduledItems = function () {

        // select items that are on selected day
        var dateItems = _.filter(DashboardService.settings.scheduledItems, function (scheduledItem) {
          var selectedDate = moment(scope.date);
          var startDate = moment(scheduledItem.start);
          var endDate = moment(scheduledItem.end);

          return selectedDate.isSameOrAfter(startDate, 'day') && selectedDate.isSameOrBefore(endDate, 'day');
        });

        // sort items by start date
        var sortedDateItems = _.sortBy(dateItems, 'start');
        return sortedDateItems;
      };

      scope.selectScheduledItem = function (scheduledItem) {
        scope.selectedScheduledItem = scheduledItem;
      };

    }

  };
}]);
