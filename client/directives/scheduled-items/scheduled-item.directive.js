'use strict';

angular.module('cfaDashboard')
  .directive('scheduledItems', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/scheduled-items/scheduled-items.html',
      scope: {
      	scheduledItems: '='
      }
    };
  });
