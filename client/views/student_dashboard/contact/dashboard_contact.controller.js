'use strict';

angular.module('cfaDashboard')
  .controller('DashboardContactCtrl', ['DashboardService', function (DashboardService) {
    var vm = this;
    vm.taUsers = [];
    vm.settings = DashboardService.settings;
    
    // get TA from registrations that are TAs
    _.each(vm.settings.registrations, function (registration) {
      if (registration.role === 'TA') {
        vm.taUsers.push(registration._user);
      }
    });
        

  }]);