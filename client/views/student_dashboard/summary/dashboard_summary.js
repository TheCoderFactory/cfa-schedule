'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/summary', {
        templateUrl: 'views/student_dashboard/summary/dashboard_summary.html',
        controller: 'DashboardSummaryCtrl',
        controllerAs: 'vm',
        resolve: {
        	isRegistered: ['$route', 'Auth', function ($route, Auth) {
	        		var userId = Auth.getUser()._id;
	        		var intakeId = $route.current.params.intakeId;
	        		return Auth.checkRegistration(userId, intakeId);
	        	}]
        }
     });
   });