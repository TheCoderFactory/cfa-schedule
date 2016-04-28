'use strict';

angular.module('cfaDashboard')
.controller('DashboardSummaryCtrl', ['$interval', '$rootScope', 'DashboardService',function ($interval, $rootScope, DashboardService) {
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

  vm.latestAnouncement = _.sortBy(vm.settings.anouncements, 'updatedAt').reverse()[0];

  $rootScope.$on('AnouncementChanged', function (anouncement) {
    vm.latestAnouncement = _.sortBy(vm.settings.anouncements, 'updatedAt').reverse()[0];
  });

}]);
