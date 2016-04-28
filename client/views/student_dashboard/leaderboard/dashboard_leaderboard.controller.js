'use strict';

angular.module('cfaDashboard')
  .controller('DashboardLeaderboardCtrl', [function () {
    var vm = this;

    vm.clearAwardDetails = function () {
    	vm.awardDetails = null;
    }

  }]);