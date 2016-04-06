'use strict';

angular.module('cfaDashboard')
  .controller('IntakeCtrl', ['$location', 'IntakeService', 'Auth', function ($location, IntakeService, Auth) {

    var vm = this;
    vm.formIntakeData = {};
    vm.startDatePickerIsOpen = false;
    vm.endDatePickerIsOpen = false;

    angular.extend(vm, {
      name: 'IntakeCtrl'
    });

    vm.valuationDatePickerOpen = function ($event, whichDate) {
      if ($event) {
          $event.preventDefault();
          $event.stopPropagation(); // This is the magic
      }
      if(whichDate === 'start'){
        this.startDatePickerIsOpen = true;
      }else if(whichDate === 'end'){
        this.endDatePickerIsOpen = true;
      }

      };

    vm.createIntake = function () {
      console.log(vm.formIntakeData);
      IntakeService.createIntake(vm.formIntakeData)
        .then(function (intake) {
          console.log(intake);
          vm.intakes.push(intake.data);
          // purge form
          vm.formIntakeData = {};
        })  
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.showAllIntakes = function () {
      IntakeService.showAllIntakes()
        .then(function (intakes) {
          console.log(intakes);
          vm.intakes = intakes.data;
        })
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.showAllIntakes();
  }]);
