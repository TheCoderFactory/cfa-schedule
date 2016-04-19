'use strict';

angular.module('cfaDashboard')
  .controller('AwardDisciplinesCtrl', ['AwardDisciplineService', 'AwardService', 'DisciplineService', 'RegistrationService', 'Auth',
    function (AwardDisciplineService, AwardService, DisciplineService, RegistrationService, $scope, Auth) {

  	var vm = this;
	  vm.awardDisciplineData = {};
	  vm.awards = [];
	  vm.disciplines = [];
    //vm.registrations = [];

    // RegistrationService.getIntakeRegistrations().then(function(res) {
    //   vm.registrations = res.data;
    // });


    
    DisciplineService.getDisciplines().then(function(res) {
      vm.disciplines = res.data;
    });


    angular.extend(this, {
      name: 'AwardDisciplinesCtrl'
    });

    vm.deleteAwardDiscipline = function (id) {
      AwardDisciplineService.deleteAwardDiscipline(id);
      vm.getAwardDisciplines();
    }

    vm.getAwardDisciplines = function () {
      AwardDisciplineService.getAwardDisciplines()
        .then(function (awardDisciplines) {
          vm.awardDisciplines = awardDisciplines.data;
        })
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.getAwardDisciplines();
  }]);
