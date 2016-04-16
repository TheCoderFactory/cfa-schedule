'use strict';

angular.module('cfaDashboard')
  .controller('ScheduledItemCtrl', ['ScheduledItemService', function (ScheduledItemService) {
    var vm = this;
    
    vm.formScheduledItem = {};
    vm.scheduledItems = [];

    //Get all scheduled items
    ScheduledItemService.getScheduledItems()
      .then(function (scheduledItems) {
        vm.scheduledItems = scheduledItems.data;
        console.log(scheduledItems);
      })  
      .catch(function (err) {
        vm.error = err;
      });

  }]);