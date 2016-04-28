'use strict';

angular.module('cfaDashboard')
  .controller('DashboardAnouncementsCtrl', ['DashboardService', function (DashboardService) {
    var vm = this;

    vm.settings = DashboardService.settings;

    vm.anouncements = _.sortBy(vm.settings.anouncements, 'updatedAt');
  }]);