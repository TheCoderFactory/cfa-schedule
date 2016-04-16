'use strict';

angular.module('cfaDashboard')
  .controller('IntakeCtrl', ['$location', 'IntakeService', 'Auth', function ($location, IntakeService, Auth) {

    var vm = this;
    vm.formIntakeData = {};
    vm.formIntakeData.terms = [];
    vm.showDetailsFor = [];
    vm.startDatePickerIsOpen = false;
    vm.endDatePickerIsOpen = false;
    vm.term = {};

    angular.extend(vm, {
      name: 'IntakeCtrl'
    });

    vm.formValidation = function (data) {
      //put input validation here
    };

    vm.addTerm = function () {
      console.log(vm.formValidation(vm.term));
      vm.formIntakeData.terms.push({
        name: vm.term.name,
        start: vm.term.start,
        end: vm.term.end
      });
      //purge term fields
      vm.term = {};
    };

    vm.removeTerm = function ($event, term) {
      vm.formIntakeData.terms = _.without(vm.formIntakeData.terms, term);
      $event.stopPropagation();
    };

    vm.editTerm = function (term) {
      console.log(term);
    };

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
          var _id = intake.data._id;
          // add to array if not there i.e. created intake
          // fogure out cleaner way to do this --> check if intake is in array
          var edited = _.filter(vm.intakes, function (intake) { 
            if (intake._id === _id) {
              return intake;
            }
          }).length;
          
          if (edited < 1){
            vm.intakes.push(intake.data);
            console.log(vm.intakes);
          }
          // purge form
          vm.formIntakeData = {};
        })  
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.getAllIntakes = function () {
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
