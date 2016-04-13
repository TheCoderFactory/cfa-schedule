'use strict';

angular.module('cfaDashboard')
  .controller('AwardsCtrl', ['AwardService', function (AwardService) {
	  
	  var vm = this;
	  vm.awardData = {};

    angular.extend(vm, {
      name: 'AwardsCtrl'
    });

    vm.createAward = function(){
    	console.log('Create Award being called');
      console.log(vm.awardData);
    	AwardService.createAward(vm.awardData);
    	vm.getAwards();
    };

    vm.editAward = function (award) {
      vm.awardData = award;
    }


    vm.deleteAward = function (award) {
      AwardService.deleteAward(award);
      vm.getAwards();
    }

    vm.getAwards = function () {
      AwardService.getAwards()
        .then(function (awards) {
          vm.awards = awards.data;
        })
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.getAwards();
  }]);