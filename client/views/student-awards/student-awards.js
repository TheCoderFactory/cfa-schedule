'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/student-awards', {
        templateUrl: 'views/student-awards/student-awards.html',
        controller: 'StudentAwardsCtrl',
        controllerAs: 'vm'
      });
  });
