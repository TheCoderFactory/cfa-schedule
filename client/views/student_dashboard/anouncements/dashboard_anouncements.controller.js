'use strict';

angular.module('cfaDashboard')
  .controller('DashboardAnouncementsCtrl', ['$rootScope', 'DashboardService', function ($rootScope, DashboardService) {
    var vm = this;

    vm.settings = DashboardService.settings;

    vm.anouncements = _.sortBy(vm.settings.anouncements, 'updatedAt').reverse();

    $rootScope.$on('AnouncementChanged', function (anouncement) {
      vm.settings = DashboardService.settings;
      vm.anouncements = _.sortBy(vm.settings.anouncements, 'updatedAt').reverse();
    });
  }]);