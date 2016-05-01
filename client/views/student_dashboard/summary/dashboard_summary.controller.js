'use strict';

angular.module('cfaDashboard')
.controller('DashboardSummaryCtrl', ['$interval', '$rootScope', 'DashboardService',function ($interval, $rootScope, DashboardService) {
  var vm = this;

  vm.settings = DashboardService.settings;
  
  var user = DashboardService.rankedRegistrations()[0]
  
  if (user) {vm.leader = user._user};

  // initially get current scheduled items
  vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();
  
  // update current scheduled Item every minute
  $interval(function () {
    vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();
  }, 10000)

  vm.latestAnouncement = _.sortBy(vm.settings.anouncements, 'updatedAt').reverse()[0];

  $rootScope.$on('AnouncementChanged', function (anouncement) {
    vm.latestAnouncement = _.sortBy(vm.settings.anouncements, 'updatedAt').reverse()[0];
  });

}]);
