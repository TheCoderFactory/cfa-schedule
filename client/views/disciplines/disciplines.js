'use strict';

angular.module('cfaDashboard')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/disciplines', {
        templateUrl: 'views/disciplines/disciplines.html',
        controller: 'DisciplinesCtrl',
        controllerAs: 'vm'
      });
  }]);
