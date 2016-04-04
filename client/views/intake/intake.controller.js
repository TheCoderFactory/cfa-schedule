'use strict';

angular.module('cfaDashboard')
  .controller('IntakeCtrl', ['$location', 'IntakeService', 'Auth', function ($location, IntakeService, Auth) {

    var vm = this;

    angular.extend(vm, {
      name: 'IntakeCtrl'
    });

    vm.showAllIntakes = function () {
      IntakeService.showAllIntakes()
        .then(function (intakes) {
          vm.intakes = intakes;
        })
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.showAllIntakes();
  }]);
