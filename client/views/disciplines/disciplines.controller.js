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
      vm.disciplineData = {}; //Clear Cache
      vm.getDisciplines();
    };

    vm.onCancelClick = function(discipline) {
      discipline.isEditing = false;
      vm.disciplineData = {}; //Clear Cache
    };

    vm.onEditClick = function(discipline) {
      discipline.isEditing = true;
      vm.disciplineData = discipline;
    };

    vm.editDiscipline = function (discipline, disciplineData) {
      disciplineData.isEditing = false;
      DisciplineService.editDiscipline(discipline, disciplineData);
      vm.disciplineData = {}; //Clear Cache
      vm.getDisciplines();
    }

    vm.deleteDiscipline = function (id) {
      DisciplineService.deleteDiscipline(id);
      vm.getDisciplines();
    }

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