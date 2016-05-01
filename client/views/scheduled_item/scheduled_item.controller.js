'use strict';

angular.module('cfaDashboard')
  .controller('ScheduledItemCtrl', ['ScheduledItemService', 'IntakeService', function (ScheduledItemService, IntakeService) {
    var vm = this;
    
    vm.formScheduledItem = {};
    vm.formScheduledItem._intakes = [];
    vm.scheduledItems = [];
    vm.showIntakes = false;

    
    //Get all scheduled items
    ScheduledItemService.getScheduledItems()
      .then(function (scheduledItems) {
        vm.scheduledItems = scheduledItems.data;
        console.log(scheduledItems);
      })  
      .catch(function (err) {
        vm.error = err;
      });

    // Get all intakes on load -->
    IntakeService.getAllIntakes()
      .then(function (intakes) {
        vm.intakes = intakes.data;
      })
      .catch(function (err) {
        vm.error = err;
      }); 

      vm.createScheduledItemShow = function () {
        if (vm.showCreateScheduledItem) {
          vm.showCreateScheduledItem = false;
        } else {
          vm.showCreateScheduledItem = true;
        }
      };

      vm.viewAllScheduledItems = function () {
        console.log('view all');
        vm.selectedScheduledItems = vm.scheduledItems;
      };

  }]);