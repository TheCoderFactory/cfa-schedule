'use strict';

angular.module('cfaDashboard')
  .controller('DisciplinesCtrl', ['ModalService', 'DisciplineService', 'Auth', function (ModalService, DisciplineService, Auth) {

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
      vm.disciplineData =  shallowCopy(discipline);
    };

    vm.editDiscipline = function (discipline, disciplineData) {
      disciplineData.isEditing = false;
      DisciplineService.editDiscipline(discipline, disciplineData);
      vm.disciplineData = {}; //Clear Cache
      vm.getDisciplines();
    }

    vm.deleteDiscipline = function (id) {
      DisciplineService.deleteDiscipline(id)
        .then(function (res) {
          if(!res.data.removed) {
            ModalService.alert('Cannot delete a discipline that has already been assigned, fool!');
          }
          vm.getDisciplines();
        })
        .catch(function (err) {
          vm.error = err;
        });
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

    function shallowCopy(obj) {
      var objCopy = {};
      for(var i in obj) {
          if(obj.hasOwnProperty(i)) {
              objCopy[i] = obj[i];
          }
      }
      return objCopy;
    }

    vm.getDisciplines();
  }]);