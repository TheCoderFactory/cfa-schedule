'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/intakes', {
        templateUrl: 'views/intake/intake.html',
        controller: 'IntakeCtrl',
        controllerAs: 'vm'
      });
  });