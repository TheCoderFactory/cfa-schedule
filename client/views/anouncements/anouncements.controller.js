'use strict';

angular.module('cfaDashboard')
	.controller('AnouncementsCtrl', ['AnouncementService', 'IntakeService', function (AnouncementService, IntakeService) {
		
		var vm = this;
		vm.formAnouncementData = {};
		vm.formAnouncementData._intakes = [];
		vm.anouncements = [];
		vm.showIntakesClick = false;

		vm.showIntakes = function () {
			if(!vm.intakes) {
				IntakeService.getAllIntakes()
				.then(function (intakes) {
					vm.intakes = intakes.data;
					vm.showIntakesClick = true;
				})
				.catch(function (err) {
					vm.error = err;
				});	
			} else {
				if(vm.showIntakesClick) {
					vm.showIntakesClick = false;
				} else {
					vm.showIntakesClick = true;
				}
			}
		};

		vm.addRemoveIntake = function (intakeId) {
			if (vm.formAnouncementData._intakes.indexOf(intakeId) > -1) {
				vm.formAnouncementData._intakes = _.without(vm.formAnouncementData._intakes, intakeId);
			} else {
				vm.formAnouncementData._intakes.push(intakeId);
			}

		};

		vm.submitAnouncementForm = function () {
			if(vm.formAnouncementData._id === undefined) {
				vm.createAnouncement();
			} else {
				vm.editAnouncement();
			}
		};

		vm.createAnouncement = function () {
			AnouncementService.createAnouncement(vm.formAnouncementData)
				.then(function (anouncement) {
					vm.anouncements.push(anouncement.data);
					vm.formAnouncementData = {};
				})
				.catch(function (err) {
					vm.error = err;
				});
		};

		vm.editAnouncement = function () {
			AnouncementService.editAnouncement(vm.formAnouncementData)
				.then(function (anouncement) {
					console.log(anouncement);
					vm.formAnouncementData = {};
				})
				.catch(function (err) {
					vm.error = err;
				});
		};

		vm.editAnouncementClick = function (anouncement) {
			vm.formAnouncementData = anouncement;
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

