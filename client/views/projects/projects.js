'use strict';

angular.module('cfa_dashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/projects', {
        templateUrl: 'views/projects/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'vm'
      });
  });
