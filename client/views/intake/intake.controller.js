'use strict';

angular.module('cfaDashboard')
  .controller('IntakeCtrl', ['$location', 'IntakeService', 'Auth', function ($location, IntakeService, Auth) {

    var vm = this;
    vm.formIntakeData = {};
    vm.showDetailsFor = [];
    vm.startDatePickerIsOpen = false;
    vm.endDatePickerIsOpen = false;

    angular.extend(vm, {
      name: 'IntakeCtrl'
    });

    vm.showDetails = function (_id) {
      vm.showDetailsFor.push(_id);
      console.log(vm.showDetailsFor);
    };

    vm.hideDetails = function (_id) {
      vm.showDetailsFor = _.without(vm.showDetailsFor, _id);
      console.log(vm.showDetailsFor);
    };

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
      //edit uses the same as create, but sends the id along for the ride!
      console.log(vm.formIntakeData);
      IntakeService.createIntake(vm.formIntakeData)
        .then(function (intake) {
          console.log(intake);
          // add to array if not there i.e. created intake
          console.log(intake.data);
          console.log(vm.intakes.indexOf(intake.data));

          if (intake.edited = false){
            vm.intakes.push(intake.data);
          }
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

    vm.editIntake = function (intake) {
      vm.formIntakeData = intake;
    }

    vm.showAllIntakes();
  }]);
