'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/disciplines', {
        templateUrl: 'views/disciplines/disciplines.html',
        controller: 'DisciplinesCtrl',
        controllerAs: 'vm'
      });
  });
