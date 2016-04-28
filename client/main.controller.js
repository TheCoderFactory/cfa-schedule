'use strict';

angular.module('cfaDashboard')
  .controller('MainCtrl', ['$scope', '$location', 'DashboardService',  function ($scope, $location, DashboardService) {

  	$scope.settings = DashboardService.settings
    
  }]);