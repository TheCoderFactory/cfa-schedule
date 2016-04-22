'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/leaderboard', {
        templateUrl: 'views/student_dashboard/leaderboard/dashboard_leaderboard.html',
        controller: 'DashboardLeaderboardCtrl',
        controllerAs: 'vm'
     });
   });