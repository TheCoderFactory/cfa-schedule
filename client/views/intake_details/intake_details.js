'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/intakes/:intakeId', {
        templateUrl: 'views/intake_details/intake_details.html',
        controller: 'IntakeDetailsCtrl',
        controllerAs: 'vm'
      });
  });