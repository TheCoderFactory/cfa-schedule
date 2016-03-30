'use strict';

angular.module('cfaDashboard')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html'
    };
  });
