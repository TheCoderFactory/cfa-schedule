'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/projects', {
        templateUrl: 'views/projects/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'vm'
      });
  });
