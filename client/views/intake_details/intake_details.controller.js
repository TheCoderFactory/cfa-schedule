'use strict';

angular.module('cfaDashboard')
  .controller('IntakeDetailsCtrl', ['$location', '$routeParams', 'IntakeService', 'Auth', function ($location, $routeParams, IntakeService, Auth) {

    var vm = this;
    vm.formScheduledItem = {};

    IntakeService.getIntake($routeParams.id)
      .then(function (intake) {
        vm.intake = intake.data;
      })
      .catch(function (err) {
        vm.error = err;
      });
    

    angular.extend(vm, {
      name: 'IntakeCtrl'
    });

    
  }]);
