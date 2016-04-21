'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/award-disciplines', {
        templateUrl: 'views/award-disciplines/award-disciplines.html',
        controller: 'AwardDisciplinesCtrl',
        controllerAs: 'vm'
      });
  });
