'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/leaderboard', {
        templateUrl: 'views/student_dashboard/leaderboard/dashboard_leaderboard.html',
        controller: 'DashboardLeaderboardCtrl',
        controllerAs: 'vm',
        resolve: {
        	isRegistered: ['$route', 'Auth', function ($route, Auth) {
        		var userId = Auth.getUser()._id;
        		var intakeId = $route.current.params.intakeId;
        		return Auth.checkRegistration(userId, intakeId);
        	}],
        	dashboardData: ['$route', 'DashboardService', function ($route, DashboardService) {
        		var intakeId = $route.current.params.intakeId;
        		return DashboardService.getDashboardData(intakeId);
        	}]
        }
     });
   });