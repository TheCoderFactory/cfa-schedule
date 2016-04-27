'use strict';

angular.module('cfaDashboard')
  .controller('DashboardSummaryCtrl', ['$interval', 'DashboardService',function ($interval, DashboardService) {
    var vm = this;

    vm.settings = DashboardService.settings;

    vm.leader = DashboardService.rankedRegistrations()[0]._user;

    // update current scheduled Item every minute
    $interval(function () {
    	vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();
    	console.log(vm.currentScheduledItems);
    }, 10000)
    
    vm.currentScheduledItems = DashboardService.getCurrentScheduledItems();

    vm.latestAnouncement = _.sortBy(vm.settings.anouncements, 'updatedAt')[0];
    console.log(vm.settings);
  }]);