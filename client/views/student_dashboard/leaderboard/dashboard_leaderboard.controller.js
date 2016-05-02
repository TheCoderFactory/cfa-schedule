'use strict';

angular.module('cfaDashboard')
  .controller('DashboardLeaderboardCtrl', ['DashboardService', function (DashboardService) {
    var vm = this;

    vm.intake = DashboardService.settings.intake
    vm.AssignAwardShowing = false;

    vm.clearAwardDetails = function () {
    	vm.awardDetails = null;
    };

    vm.showAssignAward = function () {
      
      if (vm.AssignAwardShowing) {
        vm.AssignAwardShowing = false;
      } else {
        vm.AssignAwardShowing = true;
      }
      console.log(vm.AssignAwardShowing);
    };

  }]);