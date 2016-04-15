'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/award-discipline', {
        templateUrl: 'views/award-discipline/award-discipline.html',
        controller: 'AwardDisciplineCtrl',
        controllerAs: 'vm'
      });
  });
