'use strict';

angular.module('cfaDashboard')
  .controller('AwardDisciplinesCtrl', ['AwardDisciplineService', 'AwardService', 'DisciplineService', 'RegistrationService', 'Auth',
    function (AwardDisciplineService, AwardService, DisciplineService, RegistrationService, $scope, Auth) {

  	var vm = this;
	  vm.awardDisciplineData = {};

    
  }]);
