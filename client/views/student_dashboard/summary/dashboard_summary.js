'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/summary', {
        templateUrl: 'views/student_dashboard/summary/dashboard_summary.html',
        controller: 'DashboardSummaryCtrl',
        controllerAs: 'vm'
     });
   });