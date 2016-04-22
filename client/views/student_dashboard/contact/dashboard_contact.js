'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/contact', {
        templateUrl: 'views/student_dashboard/contact/dashboard_contact.html',
        controller: 'DashboardContactCtrl',
        controllerAs: 'vm'
     });
   });