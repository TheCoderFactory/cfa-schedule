'use strict';

angular.module('cfaDashboard')
  .controller('DashboardIntakeSelectionCtrl', ['$location', 'userDetails', function ($location, userDetails) {
    var vm = this;
    
    vm.userDetails = userDetails;

    vm.gotoIntake = function (intakeId) {
    	$location.path('/dashboard/' + intakeId + '/summary');
    };
  }]);