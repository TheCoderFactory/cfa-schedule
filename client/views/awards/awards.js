'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/awards', {
        templateUrl: 'views/awards/awards.html',
        controller: 'AwardsCtrl',
        controllerAs: 'vm'
      });
  });
