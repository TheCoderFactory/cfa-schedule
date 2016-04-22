'use strict';

angular.module('cfaDashboard')
  .controller('DashboardIntakeSelectionCtrl', ['userDetails', function (userDetails) {
    var vm = this;
    console.log(vm.userDetails);
    vm.userDetails = userDetails;

  }]);