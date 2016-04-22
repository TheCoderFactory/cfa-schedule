'use strict';

angular.module('cfaDashboard')
  .directive('backAction', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/back-action/back-action.html',
      link: function (scope, element) {
      }
    };
  });
