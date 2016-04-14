'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/intakes/:id', {
        templateUrl: 'views/intake_details/intake_details.html',
        controller: 'IntakeDetailsCtrl',
        controllerAs: 'vm'
      });
  });