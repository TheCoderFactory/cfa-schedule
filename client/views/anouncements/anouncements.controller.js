'use strict';

angular.module('cfaDashboard')
	.controller('AnouncementsCtrl', ['$location', 'AnouncementService', 'IntakeService', function ($location, AnouncementService, IntakeService) {
		
		var vm = this;
		vm.formAnouncementData = {};
		vm.anouncements = [];
		vm.showIntakesClick = false;

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
			AnouncementService.createAnouncement(vm.formAnouncementData)
				.then(function (anouncement) {
					vm.anouncements.push(anouncement.data);
					vm.formAnouncementData = {};
					vm.showIntakesClick = false;

				})
				.catch(function (err) {
					vm.error = err;
				});
		};

		vm.editAnouncement = function () {
			AnouncementService.editAnouncement(vm.formAnouncementData)
				.then(function (anouncement) {
					vm.formAnouncementData = {};
					vm.showIntakesClick = false;

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
					vm.showIntakesClick = true;
				})
				.catch(function (err) {
					scope.error = err;
				});	
			} else {
				vm.formAnouncementData = anouncement;
				vm.showIntakesClick = true;
			}
		};

		vm.deleteAnouncement = function (anouncement) {
			console.log(anouncement);
			AnouncementService.deleteAnouncement(anouncement)
				.then(function (msg) {
					vm.anouncements = _.without(vm.anouncements, anouncement);
					console.log(msg);
				})
				.catch(function (err) {
					vm.error = err;
				})
		}

		vm.getAllAnouncements = function () {
			AnouncementService.getAllAnouncements()
				.then(function (anouncements) {
					console.log(anouncements);
					vm.anouncements = anouncements.data;
				})
				.catch(function (err) {
					vm.error = err;
				});
		}

		// get all anouncements on load
		vm.getAllAnouncements();
	}]);

