'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/students', {
        templateUrl: 'views/students/students.html',
        controller: 'StudentsCtrl',
        controllerAs: 'vm'
      });
  });
