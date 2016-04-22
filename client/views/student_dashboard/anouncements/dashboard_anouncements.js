'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/anouncements', {
        templateUrl: 'views/student_dashboard/anouncements/dashboard_anouncements.html',
        controller: 'DashboardAnouncementsCtrl',
        controllerAs: 'vm'
     });
   });