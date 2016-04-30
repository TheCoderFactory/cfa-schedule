'use strict';

angular.module('cfaDashboard')
	.controller('AnouncementsCtrl', ['$scope', '$location', 'AnouncementService', 'IntakeService', 'anouncements', function ($scope, $location, AnouncementService, IntakeService, anouncements) {
		
		var vm = this;
		vm.formAnouncementData = {};
		vm.formAnouncementData._intakes = [];
		vm.anouncements = anouncements.data;
		vm.showIntakes = false;

		// Get all intakes on load -->
		IntakeService.getAllIntakes()
			.then(function (intakes) {
				vm.intakes = intakes.data;
			})
			.catch(function (err) {
				vm.error = err;
			});	

		$scope.$watch('awardDisciplines', function () {
			console.log('awardDisciplines changed');
			vm.anouncementIntakes();
		}, true);

		// get all intakes of current anouncements
    vm.anouncementIntakes = function () {
      var intakes = [];
      _.each(vm.anouncements, function (anouncement) {
        _.each(anouncement._intakes, function (intake) {
            intakes.push(intake)
        });
      });
      vm.intakesSelection = _.uniq(intakes, '_id');
      vm.filteredIntakes = vm.intakesSelection;
    };

    // add anouncement to intake filter
    vm.addAnouncementIntakesToFilter = function (anouncementIntakes) {
    	_.each(anouncementIntakes, function (intake) {
    		if (!vm.intakesSelection[intake]) {
    			vm.intakesSelection.push(intake);
    		}
    	})
    };

		vm.resetForm = function () {
			vm.formAnouncementData = {};
			vm.formAnouncementData._intakes = [];
			vm.showIntakes = false;
		};

		vm.gotoIntake = function (intakeId) {
			$location.path('/intakes/' + intakeId);
		};

		vm.submitAnouncementForm = function () {
			if(vm.formAnouncementData._id === undefined) {
				vm.createAnouncement();
			} else {
				vm.editAnouncement();
			}
		};

		vm.createAnouncement = function () {
			//if intake is left empty, fill it with all current intakes
			if(!vm.formAnouncementData._intakes || vm.formAnouncementData._intakes.length < 1) {
				vm.formAnouncementData._intakes = vm.intakes;
			}
			console.log(vm.formAnouncementData);
			AnouncementService.createAnouncement(vm.formAnouncementData)
				.then(function (anouncement) {
					vm.anouncements.push(anouncement.data);
					vm.resetForm()
					vm.addAnouncementIntakesToFilter(anouncement.data._intakes);
				})
				.catch(function (err) {
					vm.error = err;
				});
		};

		vm.editAnouncement = function () {
			console.log('editing');
			AnouncementService.editAnouncement(vm.formAnouncementData)
				.then(function (anouncement) {
					vm.resetForm();
				})
				.catch(function (err) {
					vm.error = err;
				});
		};

		vm.editAnouncementClick = function (anouncement) {
			if(!vm.intakes) {
				IntakeService.getAllIntakes()
				.then(function (intakes) {
					vm.intakes = intakes.data;
					vm.formAnouncementData = anouncement;
					vm.showIntakes = true;
				})
				.catch(function (err) {
					vm.error = err;
				});	
			} else {
				vm.formAnouncementData = anouncement;
				vm.showIntakes = true;
			}
		};

		vm.deleteAnouncement = function (anouncement) {
			console.log(anouncement);
			AnouncementService.deleteAnouncement(anouncement)
				.then(function (msg) {
					vm.anouncements = _.without(vm.anouncements, anouncement);
					// update intake filter
					vm.anouncementIntakes();
				})
				.catch(function (err) {
					vm.error = err;
				})
		}

		vm.addRemoveIntake = function (intakeClicked) {
			if (vm.intakeIncluded(intakeClicked)) {
				vm.filteredIntakes = _.filter(vm.filteredIntakes, function (intake) {
					return intakeClicked._id !== intake._id;
				});
			} else {
				vm.filteredIntakes.push(intakeClicked);
			}
		};

		vm.intakeIncluded = function (intakeTest) {
			return _.some(vm.filteredIntakes, function (intake) {
				return intakeTest._id === intake._id;
			});
		};

		vm.anyIntakesIncluded = function (intakeTests) {
      return _.some(vm.filteredIntakes, function (intake) {
        return _.some(intakeTests, function (intakeTest) {
          return intakeTest._id === intake._id;
        })
      });
    };
		
	}]);

