'use strict';

angular.module('cfaDashboard')
.controller('DashboardSummaryCtrl', ['$interval', 'DashboardService',function ($interval, DashboardService) {
  var vm = this;

  vm.settings = DashboardService.settings;
  console.log(vm.settings);
  var user = DashboardService.rankedRegistrations()[0]
  if (user) vm.leader = user._user;

  // update current scheduled Item every minute
  $interval(function () {
    vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();
    console.log(vm.currentScheduledItems);
  }, 10000)

  vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();

  vm.latestAnouncement = _.sortBy(vm.settings.anouncements, 'updatedAt')[0];
}]);
