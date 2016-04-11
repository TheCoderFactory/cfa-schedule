'use strict';

angular.module('cfaDashboard')
  .controller('IntakeDetailsCtrl', ['$routeParams', 'IntakeService', 'Auth', 'ScheduledItemService', function ($routeParams, IntakeService, Auth, ScheduledItemService) {

    var vm = this;
    vm.formScheduledItem = {};
    vm.scheduledItems = [];

    //Get intake data
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

    //Get intakes scheduled items -->pass Id to only get this intakes items
    console.log($routeParams);
    ScheduledItemService.getScheduledItems($routeParams.id)
      .then(function (scheduledItems) {
        vm.scheduledItems = scheduledItems.data;
        console.log(scheduledItems);
      })  
      .catch(function (err) {
        vm.error = err;
      });

    
  }]);
