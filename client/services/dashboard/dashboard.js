'use strict';

angular.module('cfaDashboard')
	.service('DashboardService', ['$q', 'IntakeService', 'ScheduledItemService', 'AnouncementService', 'RegistrationService', 'DisciplineService', function ($q, IntakeService, ScheduledItemService, AnouncementService, RegistrationService, DisciplineService) {
		var service = {};
		
		service.settings = {};
		service.settings.intake = {};

		service.getDashboardData = function (intakeId) {
			var deferred = $q.defer();
			// check if a new intake dashboard has been accessed
      console.log(intakeId);
      console.log(service.settings.intake._id);
      if(service.settings.intake._id !== intakeId){
        console.log('getting it all...');
        // get all information for dashboard here -->
        IntakeService.getIntake(intakeId)
        .then(function (intake) {
          service.settings.intake = intake.data;
          return ScheduledItemService.getScheduledItems(intakeId);
        })
        .then(function (scheduledItems) {
        	if(scheduledItems) {service.settings.scheduledItems = scheduledItems.data; }
        	return AnouncementService.getIntakeAnouncements(intakeId);
        })
        .then(function (anouncements) {
        	if(anouncements) { service.settings.anouncements = anouncements.data; }
        	return RegistrationService.getIntakeRegistrations(intakeId);
        })
        .then(function (registrations) {
        	if(registrations) { service.settings.registrations = registrations.data; }
        	return RegistrationService.getIntakePoints(intakeId);
        })
        .then(function (awardPoints) {
        	if(awardPoints) { service.settings.points = awardPoints.data;}
        	return DisciplineService.getDisciplines();
        })
        .then(function (disciplines) {
        	if(disciplines) { service.settings.disciplines = disciplines.data; }
        	return deferred.resolve();
        })
        .finally(function (disciplines) {
        	return deferred.resolve();
        })
        .catch(function (err) {
        	console.log(err);
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

		

		service.rankedRegistrations = function () {
			var ranked = _.sortBy(service.settings.registrations, function (registration) {
    		if(service.settings.points[registration._id].totalPoints) {
    			console.log(service.settings.points[registration._id]);
    			return -1 * service.settings.points[registration._id].totalPoints;
    		} else {
    			return 0;
    		}
    	});
    	return ranked;
		};


		return service;
	}]);