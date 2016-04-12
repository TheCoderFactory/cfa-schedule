'use strict';

angular.module('cfaDashboard')
  .controller('IntakeDetailsCtrl', ['$routeParams', 'IntakeService', 'Auth', 'ScheduledItemService', 'RegistrationService', function ($routeParams, IntakeService, Auth, ScheduledItemService, RegistrationService) {

    var vm = this;
    vm.formScheduledItem = {};
    vm.scheduledItems = [];
    vm.createScheduleItem = false;
    vm.formRegisterUser = {};
    
    vm.students = [
      {
        image: 'image.png',
        firstName: 'Simon',
        lastName: 'Angell',
        email: 'simon@example.com',
        totalPoints: 200
      },
      {
        image: 'image.png',
        firstName: 'Simon',
        lastName: 'Angell',
        email: 'simon@example.com',
        totalPoints: 200
      },
      {
        image: 'image.png',
        firstName: 'Simon',
        lastName: 'Angell',
        email: 'simon@example.com',
        totalPoints: 200
      },
      {
        image: 'image.png',
        firstName: 'Simon',
        lastName: 'Angell',
        email: 'simon@example.com',
        totalPoints: 200
      },
    ]

    vm.toggleCreateScheduleItem = function () {
      if (vm.createScheduleItem === true) {
        vm.createScheduleItem = false;
      }else {
        vm.createScheduleItem = true;
      }
    };

    vm.toggleRegisterUser = function () {
      if (vm.registerUser === true) {
        vm.registerUser = false;
      }else {
        vm.registerUser = true;
      }
    };

    //Get intake data
    IntakeService.getIntake($routeParams.id)
      .then(function (intake) {
        vm.intake = intake.data;
        console.log(vm.intake);
      })
      .catch(function (err) {
        vm.error = err;
      });
    

    angular.extend(vm, {
      name: 'IntakeCtrl'
    });

    //Get intakes scheduled items for directive -->pass intake Id to only get this intakes items
    ScheduledItemService.getScheduledItems($routeParams.id)
      .then(function (scheduledItems) {
        vm.scheduledItems = scheduledItems.data;
        console.log(scheduledItems);
      })  
      .catch(function (err) {
        vm.error = err;
      });

    // Get users for directive --> pass intake Id to EXCLUDE the users already in intake
    Auth.getUsers($routeParams.id)
      .then(function (users) {
        vm.users = users.data;
      })
      .catch(function (err) {
        vm.error = err;
      });
  }]);
