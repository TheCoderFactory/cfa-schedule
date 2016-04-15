'use strict';

angular.module('cfaDashboard')
	.controller('AnouncementsCtrl', ['AnouncementService', function (AnouncementService) {
		var vm = this;
		vm.formAnouncementData = {};
		console.log('anouncements ctrl init');

		vm.createAnouncement = function () {
			AnouncementService.createAnouncement(vm.formAnouncementData)
				.then(function (anouncement) {
					console.log(anouncement);
				})
				.catch(function (err) {
					vm.error = err;
				});
		};
	}]);