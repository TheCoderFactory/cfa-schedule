'use strict';

angular.module('cfaDashboard')
	.controller('AnouncementsCtrl', ['AnouncementService', function (AnouncementService) {
		var vm = this;
		vm.formAnouncementData = {};
		vm.anouncements = [];

		vm.submitAnouncementForm = function () {
			console.log(vm.formAnouncementData);
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
					vm.anouncements = anouncements.data;
				})
				.catch(function (err) {
					vm.error = err;
				});
		}

		// get all anouncements on load
		vm.getAllAnouncements();
	}]);

