'use strict';

angular.module('cfaDashboard')
	.service('DashboardService', ['$q', 'IntakeService', 'ScheduledItemService', 'AnouncementService', 'RegistrationService', function ($q, IntakeService, ScheduledItemService, AnouncementService, RegistrationService) {
		var service = {};
		
		service.settings = {};
		service.settings.intake = {};

		service.getDashboardData = function (intakeId) {
			var deferred = $q.defer();
			// check if a new intake dashboard has been accessed
      if(service.settings.intake._id !== intakeId){
        // get all information for dashboard here -->
        IntakeService.getIntake(intakeId)
        .then(function (intake) {
          service.settings.intake = intake.data;
          return ScheduledItemService.getScheduledItems(intakeId);
        })
        .then(function (scheduledItems) {
        	service.settings.scheduledItems = scheduledItems.data;
        	return AnouncementService.getIntakeAnouncements(intakeId);
        })
        .then(function (anouncements) {
        	service.settings.anouncements = anouncements.data;
        	return RegistrationService.getIntakeRegistrations(intakeId);
        })
        .then(function (registrations) {
        	service.settings.registrations = registrations.data;
        	return RegistrationService.getIntakePoints(intakeId);
        })
        .then(function (awardPoints) {
        	service.settings.points = awardPoints.data;
        	return deferred.resolve();
        })
        .finally(function () {
        	return deferred.resolve();
        })
        .catch(function (err) {
        	return deferred.reject(err);
        });
      } else {
      	// all ready got data, resolve promise
      	deferred.resolve();
      }
      return deferred.promise;
		};
		
		service.showDashboardLayout = function () {
			// remove container class from ng-view
			service.settings.container = false;
			// add body position class to body
			service.settings.bodyOffset = true;
			// show dashboard nav bars
			service.settings.dashboardNavs = true;
		};

		service.hideDashboardLayout = function () {
			// add container class from ng-view
			service.settings.container = true;
			// remove body position class to body
			service.settings.bodyOffset = false;
			// hide dashboard nav bars
			service.settings.dashboardNavs = false;
		};


		return service;
	}]);