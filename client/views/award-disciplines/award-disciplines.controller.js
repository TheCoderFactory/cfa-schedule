'use strict';

angular.module('cfaDashboard')
  .controller('AwardDisciplinesCtrl', ['AwardDisciplineService', 'AwardService', 'DisciplineService', function (AwardDisciplineService, AwardService, DisciplineService, $scope) {

  	var vm = this;
	  vm.awardDisciplineData = {};
	  vm.awards = [];
	  vm.disciplines = [];

    AwardService.getAwards().then(function(res) {
    	  //console.log(res.data);
				for (var x in res.data) {
				    vm.awards.push(res.data[x]);
				}
    });

    DisciplineService.getDisciplines().then(function(res) {
    	  //console.log(res.data);
				for (var x in res.data) {
				    vm.disciplines.push(res.data[x]);
				}
    });


    angular.extend(this, {
      name: 'AwardDisciplinesCtrl'
    });

    vm.createAwardDiscipline = function(){
    	AwardDisciplineService.createAwardDiscipline(vm.awardDisciplineData);
    	vm.getAwardDisciplines();
    };

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

  }]);
