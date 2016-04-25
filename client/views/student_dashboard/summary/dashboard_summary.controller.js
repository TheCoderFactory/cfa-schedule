'use strict';

angular.module('cfaDashboard')
  .controller('DashboardSummaryCtrl', ['DashboardService',function (DashboardService) {
    var vm = this;

    vm.settings = DashboardService.settings;

    vm.leader = DashboardService.rankedRegistrations()[0]._user;

    vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();

    console.log(vm.settings);
  }]);