'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'views/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      });
  });
