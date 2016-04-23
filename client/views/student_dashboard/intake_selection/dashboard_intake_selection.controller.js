'use strict';

angular.module('cfaDashboard')
  .controller('DashboardIntakeSelectionCtrl', ['$location', 'userDetails', 'allIntakes', 'DashboardService', function ($location, userDetails, allIntakes, DashboardService) {
    var vm = this;
    
    vm.settings = DashboardService.settings;

    vm.settings.userDetails = userDetails;

    vm.allIntakes = allIntakes.data;

    vm.gotoIntake = function (intakeId) {
    	$location.path('/dashboard/' + intakeId + '/summary');
    };
  }]);