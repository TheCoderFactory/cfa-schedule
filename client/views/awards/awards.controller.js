'use strict';

angular.module('cfaDashboard')
  .controller('AwardsCtrl', ['AwardService', function (AwardService) {
	  
	  var vm = this;
	  vm.awardData = {};

    angular.extend(vm, {
      name: 'AwardsCtrl'
    });

    vm.createAward = function(){
    	AwardService.createAward(vm.awardData);
    	vm.getAwards();
    };

    vm.onCancelClick = function(award) {
      award.isEditing = false;
    };

    vm.onEditClick = function(award) {
      console.log('editClick');
      award.isEditing = true;
    };

    vm.editAward = function (award, awardData) {
      console.log('editAward being called: ' + award);
      AwardService.editAward(award, awardData);
      vm.awardData = {}; //Clear Cache
      vm.getAwards();
    }

    vm.deleteAward = function (id) {
      AwardService.deleteAward(id);
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