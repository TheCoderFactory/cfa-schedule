'use strict';

angular.module('cfaDashboard')
  .controller('DashboardSummaryCtrl', ['DashboardService',function (DashboardService) {
    var vm = this;

    vm.settings = DashboardService.settings;

    console.log(vm.settings);
  }]);