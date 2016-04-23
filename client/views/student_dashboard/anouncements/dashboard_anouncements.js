'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/anouncements', {
        templateUrl: 'views/student_dashboard/anouncements/dashboard_anouncements.html',
        controller: 'DashboardAnouncementsCtrl',
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