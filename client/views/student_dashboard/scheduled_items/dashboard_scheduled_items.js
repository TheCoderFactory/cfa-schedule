'use strict';

angular.module('cfaDashboard')
  .config(function ($routeProvider) {
  $routeProvider
     .when('/dashboard/:intakeId/scheduledItems', {
        templateUrl: 'views/student_dashboard/scheduled_items/dashboard_scheduled_items.html',
        controller: 'DashboardScheduledItemsCtrl',
        controllerAs: 'vm'
     });
   });