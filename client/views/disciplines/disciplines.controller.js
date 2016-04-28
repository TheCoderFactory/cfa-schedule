'use strict';

angular.module('cfaDashboard')
  .controller('DisciplinesCtrl', ['DisciplineService', 'Auth', function (DisciplineService, Auth) {

  	var vm = this;
	  vm.disciplineData = {};

    angular.extend(this, {
      name: 'DisciplinesCtrl'
    });

    vm.createDiscipline = function(){
    	DisciplineService.createDiscipline(vm.disciplineData);
    	vm.getDisciplines();
    };

    vm.onCancelClick = function(discipline) {
      discipline.isEditing = false;
    };

    vm.onEditClick = function(discipline) {
      console.log('editClick');
      discipline.isEditing = true;
    };

    vm.editDiscipline = function (discipline, disciplineData) {
      console.log('editDiscipline called');
      DisciplineService.editDiscipline(discipline, disciplineData);
      vm.disciplineData = {}; //Clear Cache
      vm.getDisciplines();
    };

    vm.deleteDiscipline = function (id) {
      DisciplineService.deleteDiscipline(id);
      vm.getDisciplines();
    };

    vm.getDisciplines = function () {
      DisciplineService.getDisciplines()
        .then(function (disciplines) {
          vm.disciplines = disciplines.data;
        })
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.getDisciplines();
  }]);
