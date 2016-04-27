'use strict';

angular.module('cfaDashboard')
  .controller('DashboardSummaryCtrl', ['DashboardService',function (DashboardService) {
    var vm = this;

    vm.settings = DashboardService.settings;

    vm.leader = DashboardService.rankedRegistrations()[0]._user;

    vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();

    vm.latestAnouncement = _.sortBy(vm.settings.anouncements, 'updatedAt')[0];
    console.log(vm.settings);
  }]);