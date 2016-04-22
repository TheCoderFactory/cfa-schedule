'use strict';

angular.module('cfaDashboard')
  .controller('DashboardIntakeSelectionCtrl', ['$location', 'userDetails', 'allIntakes', function ($location, userDetails, allIntakes) {
    var vm = this;
    
    vm.userDetails = userDetails;

    vm.allIntakes = allIntakes.data;

    vm.gotoIntake = function (intakeId) {
    	$location.path('/dashboard/' + intakeId + '/summary');
    };
  }]);