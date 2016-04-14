'use strict';

angular.module('cfaDashboard')
  .controller('IntakeDetailsCtrl', ['$routeParams', 'IntakeService', 'Auth', 'ScheduledItemService', 'RegistrationService', function ($routeParams, IntakeService, Auth, ScheduledItemService, RegistrationService) {

    var vm = this;
    vm.formScheduledItem = {};
    vm.scheduledItems = [];
    vm.createScheduleItem = false;
    vm.formRegisterUser = {};
    
    vm.registeredStudents = [];
    vm.registeredTeachers = [];


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

    //Get registered students and teachers for intake
    RegistrationService.getIntakeRegistrations($routeParams.id)
      .then(function (registrations) {
        var registrations = registrations.data;
        console.log(registrations);
        // sort registrations into teachers and students
        _.each(registrations, function (registration) {
          if (registration.role === 'Teacher') {
            vm.registeredTeachers.push(registration._user);
          } else {
            vm.registeredStudents.push(registration._user);
          }
        });
      })
      .catch(function (err) {
        vm.error = err;
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

    // Get users for directive --> return only users that are not already registered
    Auth.getUnregisteredUsers($routeParams.id)
      .then(function (users) {
        vm.unregisteredUsers = users.data;
      })
      .catch(function (err) {
        vm.error = err;
      });
  }]);
