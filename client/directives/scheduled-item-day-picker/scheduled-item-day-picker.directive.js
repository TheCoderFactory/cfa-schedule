'use strict';

angular.module('cfaDashboard')
.directive('scheduledItemDayPicker', [function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/scheduled-item-day-picker/scheduled-item-day-picker.html',
    scope: {
      selectedScheduledItems: '=',
      date: '=',
      allScheduledItems: '='
    },
    link: function (scope, elem, attrs) {

      scope.$watch('date', function () {
        console.log('date watched');
        scope.selectedScheduledItems = scope.scheduledItems();
      });

      scope.scheduledItems = function () {

        // select items that are on selected day
        var dateItems = _.filter(scope.allScheduledItems, function (scheduledItem) {
          var selectedDate = moment(scope.date);
          var startDate = moment(scheduledItem.start);
          var endDate = moment(scheduledItem.end);

          return selectedDate.isSameOrAfter(startDate, 'day') && selectedDate.isSameOrBefore(endDate, 'day');
        });

        // sort items by start date
        var sortedDateItems = _.sortBy(dateItems, 'start');
        return sortedDateItems;
      };

    }

  };
}]);
